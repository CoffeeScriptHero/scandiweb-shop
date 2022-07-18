import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";
import { getProduct } from "../../services/requests";
import { withParams } from "../../services/routerHooks";
import { setCategory } from "../../store/reducers/category.slice";
import { connect } from "react-redux";
import "./product.scss";
import Icon from "../../components/Icon/Icon";
import Attributes from "../../components/Attributes/Attributes";

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

  attributesHandler = (e) => {
    const targetClassList = Array.from(e.target.classList);
    if (targetClassList.includes("attribute")) {
      e.target.parentNode
        .querySelector(`.attribute-active`)
        .classList.remove("attribute-active");
      e.target.classList.add("attribute-active");

      this.setState((prevState) => ({
        attributes: {
          ...prevState.attributes,
          [e.target.dataset.name]: e.target.dataset.value,
        },
      }));
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

    const { currency } = this.props;
    const { brand, name, gallery, prices, attributes, description, inStock } =
      this.state.product;
    const price = prices.filter((p) => p.currency.symbol === currency)[0]
      .amount;

    const descriptionElement = document.createElement("div");
    descriptionElement.innerHTML = description;

    const imagesList = gallery.map((img, i) => (
      <div key={i} className="aside-image-wrapper">
        <img
          className={`product-aside-image ${i === 0 ? "active-image" : ""}`}
          src={img}
          alt="aside product image"
        />
      </div>
    ));

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
          {!!Object.keys(attributes).length && (
            <Attributes
              attributes={attributes}
              onClick={this.attributesHandler}
            />
          )}
          <h6 className="product-price-title">Price:</h6>
          <span className="product-price">
            {currency} {price}
          </span>
          <button className="product-cart-button">Add to cart</button>
          <div className="product-description">
            {descriptionElement.textContent}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency.currency,
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
