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
    attributes: {},
  };

  imagesHandler = (e) => {
    if (e.target.tagName === "IMG") {
      document.querySelector(".active-image").classList.remove("active-image");
      e.target.classList.add("active-image");
      this.setState({ imageToShow: e.target.src });
    }
  };

  attributeHandler = (e) => {
    const targetClassList = Array.from(e.target.classList);
    if (targetClassList.includes("attribute")) {
      e.target.parentNode
        .querySelector(`.attribute-active`)
        .classList.remove("attribute-active");
      e.target.classList.add("attribute-active");
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

      const attrs = res.data.product.attributes;

      console.log(attrs);

      attrs.forEach((a) => {
        this.setState((prevState) => ({
          attributes: {
            ...prevState.attributes,
            [a.name]: a.items[0].value,
          },
        }));
      });

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

    console.log(this.state);

    // console.log(attributes);

    const imagesList = gallery.map((img, i) => (
      <div key={i} className="aside-image-wrapper">
        <img
          className={`product-aside-image ${i === 0 ? "active-image" : ""}`}
          src={img}
          alt="aside product image"
        />
      </div>
    ));

    const attributesList = attributes.map((a) => {
      return (
        <div
          className="attribute-wrapper"
          key={a.id}
          onClick={this.attributeHandler}
        >
          <h6 className="attribute-title">{a.name}</h6>
          <div className="attribute-content">
            {a.items.map((i, index) => (
              <div
                key={i.id}
                // data-name={i.name}
                className={`attribute 
                ${a.type === "text" ? "text-attribute" : "swatch-attribute"} 
                ${index === 0 ? "attribute-active" : ""}`}
                style={{
                  backgroundColor: a.type === "swatch" ? i.value : "",
                }}
              >
                {a.type === "text" ? i.displayValue : ""}
              </div>
            ))}
          </div>
        </div>
      );
    });

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
            {imagesList}
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
          {!!attributesList.length && (
            <div className="attributes-wrapper">{attributesList}</div>
          )}
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
