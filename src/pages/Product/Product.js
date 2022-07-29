import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";
import { getProduct } from "../../services/requests";
import { withParams } from "../../services/routerHooks";
import { productSave, productRemove } from "../../store/reducers/cart.slice";
import { setCategory } from "../../store/reducers/category.slice";
import { connect } from "react-redux";
import "./product.scss";
import Icon from "../../components/Icon/Icon";
import Attributes from "../../components/Attributes/Attributes";
import { deepEqual } from "../../services/helpers";
import NotFound from "../NotFound/NotFound";

class Product extends Component {
  state = {
    isLoading: true,
    product: null,
    imageToShow: null,
    attributes: {},
  };

  imagesHandler = (e) => {
    if (e.target.tagName === "IMG") {
      const activeClass = "product-page__aside-img--active";
      document.querySelector(`.${activeClass}`).classList.remove(activeClass);
      e.target.classList.add(activeClass);
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
    const isTopArrow = document
      .querySelector(".product-page__aside-scroll-arrow-top")
      .contains(e.target);
    const content = document.querySelector(".product-page__aside-images");
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

      if (!product) {
        this.setState({ isLoading: false, product });
        return;
      }

      if (!categories.length) {
        // highlights category in header if we followed the link of the product (not opened it from category page)
        setCategory(product.category);
      }

      product.attributes.forEach((a) => {
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
      quantity: 1,
    };

    inCart ? productRemove(product) : productSave(product);
  };

  componentDidUpdate(prevProps) {
    const description = document.querySelector(
      ".product-page__info-description"
    );

    if (description) description.innerHTML = this.state.product.description;

    if (prevProps.params.id !== this.props.params.id) {
      this.setPageParameters();
    }
  }

  componentDidMount() {
    this.setPageParameters();
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    if (!this.state.isLoading && !this.state.product) return <NotFound />;

    const { cart, currency } = this.props;
    const { id, brand, name, gallery, prices, attributes, inStock } =
      this.state.product;

    const selectedAttributes = this.state.attributes;

    const price = prices.filter((p) => p.currency.symbol === currency)[0]
      .amount;

    const inCart = cart.filter(
      (p) => p.id === id && deepEqual(p.attributes, selectedAttributes)
    ).length;

    const imagesList = gallery.map((img, i) => (
      <div key={i} className="product-page__aside-img-wrapper">
        <img
          className={`product-page__aside-img ${
            i === 0 ? "product-page__aside-img--active" : ""
          }`}
          src={img}
          alt="aside product"
        />
      </div>
    ));

    return (
      <div className="product-page">
        <div className="product-page__aside">
          {gallery.length > 4 && (
            <div
              className="
                product-page__aside-scroll-arrow
                product-page__aside-scroll-arrow-top"
              onClick={this.arrowHandler}
            >
              <Icon type="scrollarrow" />
            </div>
          )}
          <aside
            className="product-page__aside-images"
            onClick={this.imagesHandler}
          >
            {imagesList}
          </aside>
          {gallery.length > 4 && (
            <div
              className="
                product-page__aside-scroll-arrow product-page__aside-scroll-arrow-bottom"
              onClick={this.arrowHandler}
            >
              <Icon type="scrollarrow" />
            </div>
          )}
        </div>
        <div className="product-page__img-wrapper">
          <img
            className="product-page__img"
            src={this.state.imageToShow}
            alt="main product"
          />
        </div>
        <div className="product-page__info">
          <h1 className="product-page__info-title">{brand}</h1>
          <h2 className="product-page__info-name">{name}</h2>
          {!!Object.keys(attributes).length && (
            <Attributes
              attributes={attributes}
              onClick={this.attributesHandler}
            />
          )}
          <h6 className="product-page__info-price-title">Price:</h6>
          <span className="product-page__info-price">
            {currency} {price}
          </span>
          {inStock && (
            <button
              className="purchase-button product-page__info-purchase-btn"
              ref={this.btnRef}
              onClick={this.purchaseHandler.bind(this, inCart)}
            >
              {inCart ? "Remove from cart" : "Add to cart"}
            </button>
          )}
          {!inStock && (
            <p className="product-page__info-out-of-stock">Out of stock</p>
          )}
          <div className="product-page__info-description"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currency: state.currency.currency,
    categories: state.category.categories,
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
