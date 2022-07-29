import React, { Component } from "react";
import { Link } from "react-router-dom";
import { countItemPrice } from "../../services/helpers";
import Attributes from "../Attributes/Attributes";
import Icon from "../Icon/Icon";
import "./cart-product.scss";

class CartProduct extends Component {
  state = {
    buttonDisabled: this.props.quantity === 1 ? true : false,
    imageIndex: 0,
  };

  buttonsHandler = (e) => {
    const targetClassList = Array.from(e.target.classList);
    const { quantity, product, selectedAttrs, changeQuantity } = this.props;

    if (targetClassList.includes("cart-item__quantity-adjustment-button")) {
      const payload = {
        id: product.id,
        attributes: selectedAttrs,
        type: e.target.dataset.type,
      };

      if (e.target.dataset.type === "increment") {
        changeQuantity(payload);
        this.setState({ buttonDisabled: false });
      } else {
        if (quantity - 1 === 1) this.setState({ buttonDisabled: true });
        changeQuantity(payload);
      }
    }
  };

  imageSwitcher = (e) => {
    const { gallery } = this.props.product;
    const targetClassList = Array.from(e.target.classList);
    if (targetClassList.includes("cart-button")) {
      const rightButton = targetClassList.includes("cart-button-right");
      if (rightButton) {
        if (this.state.imageIndex === gallery.length - 1) {
          // if right button and last image shown
          this.setState({ imageIndex: 0 });
          return;
        }
      } else {
        if (this.state.imageIndex === 0) {
          // if left button and first image shown
          this.setState({ imageIndex: gallery.length - 1 });
          return;
        }
      }
      this.setState(({ imageIndex }) => ({
        imageIndex: imageIndex + (rightButton ? 1 : -1),
      }));
    }
  };

  render() {
    const {
      currency,
      selectedAttrs,
      quantity,
      inMinicart = false,
      linkHandler = null,
    } = this.props;
    const { id, name, prices, gallery, brand, attributes } = this.props.product;

    const price = countItemPrice(prices, currency, quantity);

    return (
      <article
        className={`cart-item ${inMinicart ? "" : "cart-item__size--big"}`}
      >
        <div className="cart-item__info">
          <h3 className="cart-item__info-brand">{brand}</h3>
          <Link
            to={`/p/${id}`}
            className="cart-item__info-name"
            onClick={linkHandler}
          >
            {name}
          </Link>
          <span className="cart-item__info-price">
            {currency}
            {price}
          </span>
          <Attributes
            selectedAttrs={selectedAttrs}
            attributes={attributes}
            inMinicart={inMinicart}
            onClick={this.attributesHandler}
            overflowAttrs={inMinicart ? false : true}
          />
        </div>
        <div
          className="cart-item__quantity-adjustment"
          onClick={this.buttonsHandler}
        >
          <button
            data-type="increment"
            className="cart-item__quantity-adjustment-button"
          >
            <Icon
              type="plus"
              disabledClick={true}
              width={`${inMinicart ? "18" : "25"}`}
              height={`${inMinicart ? "13" : "22"}`}
            />
          </button>
          <span className="cart-item__quantity-adjustment-number">
            {quantity}
          </span>
          <button
            data-type="decrement"
            disabled={this.state.buttonDisabled}
            className={`cart-item__quantity-adjustment-button ${
              this.state.buttonDisabled
                ? "cart-item__quantity-adjustment-button--disabled"
                : ""
            }`}
          >
            <Icon
              type="minus"
              disabledClick={true}
              width={`${inMinicart ? "10" : "26"}`}
            />
          </button>
        </div>
        <div className="cart-item__image-wrapper" onClick={this.imageSwitcher}>
          <Link to={`/p/${id}`} onClick={linkHandler}>
            <img
              className="cart-item__image"
              src={gallery[this.state.imageIndex]}
              alt="product"
            />
          </Link>
          {!inMinicart && gallery.length > 1 && (
            <button className="cart-button cart-button-left">
              <Icon
                disabledClick={true}
                flippedX={true}
                type="cartarrow"
                width="15"
                height="10"
              />
            </button>
          )}
          {!inMinicart && gallery.length > 1 && (
            <button className="cart-button cart-button-right">
              <Icon
                disabledClick={true}
                type="cartarrow"
                width="15"
                height="10"
              />
            </button>
          )}
        </div>
      </article>
    );
  }
}

export default CartProduct;
