import React, { Component } from "react";
import Attributes from "../Attributes/Attributes";
import Icon from "../Icon/Icon";
import "./minicart-product.scss";

class MinicartProduct extends Component {
  render() {
    const { currency, selectedAttrs, amount } = this.props;
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
            onClick={() => {}}
          />
        </div>
        <div className="minicart__item-amount-adjustment">
          <button className="minicart__item-amount-button minicart__item-amount-button-plus">
            <Icon type="plus" width="18" height="13" />
          </button>
          <span className="minicart__item-amount-number">4</span>
          <button className="minicart__item-amount-button minicart__item-amount-button-minus">
            <Icon type="minus" width="10" />
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
