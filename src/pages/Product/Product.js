import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";
import { getProduct } from "../../services/requests";
import { withParams } from "../../services/routerHooks";
import { setCategory } from "../../store/reducers/category.slice";
import { connect } from "react-redux";
import "./product.scss";
import Icon from "../../components/Icon/Icon";

class Product extends Component {
  state = {
    isLoading: true,
    product: null,
    imageToShow: null,
  };

  imagesHandler = (e) => {
    if (e.target.tagName === "IMG") {
      document.querySelector(".active-image").classList.remove("active-image");
      e.target.classList.add("active-image");
      this.setState({ imageToShow: e.target.src });
    }
  };

  arrowHandler = (e) => {
    const isTopArrow = document.querySelector(".arrow-top").contains(e.target);
    const content = document.querySelector(".product-aside-images");
    const image = content.children[0];
    const imageHeight = parseInt(window.getComputedStyle(image).height);
    const imageMargin = parseInt(window.getComputedStyle(image).marginBottom);
    const scrollNumber = imageHeight + imageMargin;

    if (isTopArrow) {
      content.scrollTo({
        top: content.scrollTop - scrollNumber,
        behavior: "smooth",
      });
    } else if (content.scrollTopMax - content.scrollTop >= scrollNumber) {
      content.scrollTo({
        top: content.scrollTop + scrollNumber,
        behavior: "smooth",
      });
    }
  };

  componentDidMount() {
    const { categories, setCategory } = this.props;
    const id = this.props.params.id;
    getProduct(id).then((res) => {
      const product = res.data.product;

      if (!categories.length) {
        // highlights category in header if we followed the link of the product (not opened it from category page)
        setCategory(product.category ? product.category : null);
      }

      this.setState({
        isLoading: false,
        product: product,
        imageToShow: product ? product.gallery[0] : null,
      });
    });
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    if (!this.state.isLoading && !this.state.product) return <p>Not found</p>;

    const { brand, name, gallery, attributes, desciption, inStock } =
      this.state.product;

    return (
      <div className="product-page">
        <div className="aside-wrapper">
          {gallery.length > 4 && (
            <div
              className="aside-scroll-arrow arrow-top"
              onClick={this.arrowHandler}
            >
              <Icon type="scrollarrow" />
            </div>
          )}
          <aside className="product-aside-images" onClick={this.imagesHandler}>
            {gallery.map((img, i) => (
              <div key={i} className={`aside-image-wrapper`}>
                <img
                  className={`product-aside-image ${
                    i === 0 ? "active-image" : ""
                  }
                  `}
                  src={img}
                  alt="aside product image"
                />
              </div>
            ))}
          </aside>
          {gallery.length > 4 && (
            <div
              className="aside-scroll-arrow arrow-bottom"
              onClick={this.arrowHandler}
            >
              <Icon type="scrollarrow" />
            </div>
          )}
        </div>
        <div className="main-image-wrapper">
          <img
            className="product-main-image"
            src={this.state.imageToShow}
            alt="main product image"
          />
        </div>
        <div className="product-info-wrapper">
          <h1 className="product-title">{brand}</h1>
          <h2 className="product-name">{name}</h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.category.categories,
  };
};

const mapDispatchToProps = {
  setCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Product));
