import React, { Component } from "react";
import Attributes from "../Attributes/Attributes";
import Icon from "../Icon/Icon";
import "./minicart-product.scss";

class MinicartProduct extends Component {
  state = {
    buttonDisabled: this.props.quantity === 1 ? true : false,
  };

  buttonsHandler = (e) => {
    const targetClassList = Array.from(e.target.classList);
    const { quantity, product, selectedAttrs, changeQuantity } = this.props;

    if (targetClassList.includes("minicart__item-quantity-button")) {
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
    const { currency, selectedAttrs, quantity } = this.props;
    const { id, name, prices, gallery, brand, attributes } = this.props.product;

    const price = prices.filter((p) => p.currency.symbol === currency)[0]
      .amount;

    return (
      <article className="minicart__item">
        <div className="minicart__item-info-wrapper">
          <h3 className="minicart__item-brand">{brand}</h3>
          <h3 className="minicart__item-name">{name}</h3>
          <span className="minicart__item-price">
            {currency}
            {price}
          </span>
          <Attributes
            selectedAttrs={selectedAttrs}
            attributes={attributes}
            smallSize={true}
            onClick={this.attributesHandler}
          />
        </div>
        <div
          className="minicart__item-quantity-adjustment"
          onClick={this.buttonsHandler}
        >
          <button
            data-type="increment"
            className="minicart__item-quantity-button"
          >
            <Icon type="plus" disabledClick={true} width="18" height="13" />
          </button>
          <span className="minicart__item-quantity-number">{quantity}</span>
          <button
            data-type="decrement"
            disabled={this.state.buttonDisabled}
            className={`minicart__item-quantity-button ${
              this.state.buttonDisabled
                ? "minicart__item-quantity-button-disabled"
                : ""
            }`}
          >
            <Icon type="minus" disabledClick={true} width="10" />
          </button>
        </div>
        <div className="minicart__item-image-wrapper">
          <img
            className="minicart__item-image"
            src={gallery[0]}
            alt="product image"
          />
        </div>
      </article>
    );
  }
}

export default MinicartProduct;
