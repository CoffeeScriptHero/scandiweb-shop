import React, { Component } from "react";
import { Link } from "react-router-dom";
import Attributes from "../Attributes/Attributes";
import Icon from "../Icon/Icon";
import "./cart-product.scss";

class CartProduct extends Component {
  state = {
    buttonDisabled: this.props.quantity === 1 ? true : false,
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

  render() {
    const {
      currency,
      selectedAttrs,
      quantity,
      inMinicart = false,
      inCart = true,
      linkHandler = null,
    } = this.props;
    const { id, name, prices, gallery, brand, attributes } = this.props.product;

    const price = prices.filter((p) => p.currency.symbol === currency)[0]
      .amount;

    return (
      <article className={`cart-item ${inCart ? "cart-item__size--big" : ""}`}>
        <div className="cart-item__info">
          <h3 className="cart-item__info-brand">{brand}</h3>
          <h3 className="cart-item__info-name">{name}</h3>
          <span className="cart-item__info-price">
            {currency}
            {price}
          </span>
          <Attributes
            selectedAttrs={selectedAttrs}
            attributes={attributes}
            inMinicart={inMinicart}
            onClick={this.attributesHandler}
            inCart={inCart}
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
              width={`${inCart ? "25" : "18"}`}
              height={`${inCart ? "22" : "13"}`}
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
              width={`${inCart ? "26" : "10"}`}
            />
          </button>
        </div>
        <div className="cart-item__image-wrapper">
          <Link to={`/p/${id}`} onClick={linkHandler}>
            <img
              className="cart-item__image"
              src={gallery[0]}
              alt="product image"
            />
          </Link>
        </div>
      </article>
    );
  }
}

export default CartProduct;
