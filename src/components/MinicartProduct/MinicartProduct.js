import React, { Component } from "react";
import Attributes from "../Attributes/Attributes";
import "./minicart-product.scss";

class MinicartProduct extends Component {
  render() {
    const { currency } = this.props;
    const { id, name, prices, brand, attributes } = this.props.product;

    const price = prices.filter((p) => p.currency.symbol === currency)[0]
      .amount;

    return (
      <article className="minicart__item">
        <h3 className="minicart__item-brand">{brand}</h3>
        <h3 className="minicart__item-name">{name}</h3>
        <span className="minicart__item-price">
          {currency}
          {price}
        </span>
        <Attributes
          attributes={attributes}
          smallSize={true}
          onClick={() => {}}
        />
      </article>
    );
  }
}

export default MinicartProduct;
