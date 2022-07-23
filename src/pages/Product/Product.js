import React, { Component, createRef } from "react";
import Loader from "../../components/Loader/Loader";
import { getProduct } from "../../services/requests";
import { withParams } from "../../services/routerHooks";
import { productSave, productRemove } from "../../store/reducers/cart.slice";
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
      document.querySelector(".active_image").classList.remove("active_image");
      e.target.classList.add("active_image");
      this.setState({ imageToShow: e.target.src });
    }
  };

  attributesHandler = (e) => {
    const targetClassList = Array.from(e.target.classList);
    const activeClass = "attribute__state-active";

    if (targetClassList.includes("attribute__item")) {
      e.target.parentNode
        .querySelector(`.${activeClass}`)
        .classList.remove(activeClass);
      e.target.classList.add(activeClass);

      this.setState((prevState) => ({
        attributes: {
          ...prevState.attributes,
          [e.target.dataset.name]: e.target.dataset.value,
        },
      }));
    }
  };

  arrowHandler = (e) => {
    const isTopArrow = document.querySelector(".arrow_top").contains(e.target);
    const content = document.querySelector(".product_aside_images");
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

  setPageParameters = () => {
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
  };

  purchaseHandler = (inCart) => {
    const { productRemove, productSave } = this.props;
    const product = {
      id: this.state.product.id,
      attributes: this.state.attributes,
      amount: 1,
    };

    inCart ? productRemove(product) : productSave(product);
  };

  componentDidMount() {
    this.setPageParameters();
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    if (!this.state.isLoading && !this.state.product) return <p>Not found</p>;

    const { currency, cart } = this.props;
    const {
      id,
      brand,
      name,
      gallery,
      prices,
      attributes,
      description,
      inStock,
    } = this.state.product;

    const selectedAttributes = this.state.attributes;

    const price = prices.filter((p) => p.currency.symbol === currency)[0]
      .amount;

    const descriptionElement = document.createElement("div");
    descriptionElement.innerHTML = description;

    const productInCart = cart.find((p) => {
      if (p.id === id) {
        for (let a in p.attributes) {
          if (p.attributes[a] !== selectedAttributes[a]) return false;
        }
        return true;
      }
    });

    const imagesList = gallery.map((img, i) => (
      <div key={i} className="aside_image_wrapper">
        <img
          className={`product_aside_image ${i === 0 ? "active_image" : ""}`}
          src={img}
          alt="aside product image"
        />
      </div>
    ));

    return (
      <div className="product_page">
        <div className="aside_wrapper">
          {gallery.length > 4 && (
            <div
              className="aside_scroll_arrow arrow_top"
              onClick={this.arrowHandler}
            >
              <Icon type="scrollarrow" />
            </div>
          )}
          <aside className="product_aside_images" onClick={this.imagesHandler}>
            {imagesList}
          </aside>
          {gallery.length > 4 && (
            <div
              className="aside_scroll_arrow arrow_bottom"
              onClick={this.arrowHandler}
            >
              <Icon type="scrollarrow" />
            </div>
          )}
        </div>
        <div className="main_image_wrapper">
          <img
            className="product_main_image"
            src={this.state.imageToShow}
            alt="main product image"
          />
        </div>
        <div className="product_info_wrapper">
          <h1 className="product_title">{brand}</h1>
          <h2 className="product_name">{name}</h2>
          {!!Object.keys(attributes).length && (
            <Attributes
              attributes={attributes}
              onClick={this.attributesHandler}
            />
          )}
          <h6 className="product_price_title">Price:</h6>
          <span className="product_price">
            {currency} {price}
          </span>
          {inStock && (
            <button
              className="product_cart_button"
              ref={this.btnRef}
              onClick={this.purchaseHandler.bind(this, productInCart)}
            >
              {productInCart ? "Remove from cart" : "Add to cart"}
            </button>
          )}
          {!inStock && <p className="no_product_text">Out of stock</p>}
          <div className="product_description">
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
    cart: state.cart,
  };
};

const mapDispatchToProps = {
  setCategory,
  productSave,
  productRemove,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Product));
