import React, { Component, createRef } from "react";
import Icon from "../Icon/Icon";
import "./product.scss";

class Product extends Component {
  state = { addedToCart: false };
  btnRef = createRef();

  componentDidMount() {
    if (this.btnRef.current) {
      this.btnRef.current.addEventListener("click", () => {
        this.setState(({ addedToCart }) => ({ addedToCart: !addedToCart }));
        // some redux logic, adding this product to cart
      });
    }
  }

  render() {
    const { id, name, brand, inStock, gallery, prices, currency } = this.props;

    const price = prices.filter((p) => p.currency.symbol === currency)[0]
      .amount;

    return (
      <div className="product-card">
        <div
          className={`card-img-wrapper ${
            inStock ? "" : "img-out-of-stock-text"
          }`}
        >
          <img
            className={`card-img ${inStock ? "" : "img-opacity"}`}
            src={gallery[0]}
            alt={name}
          />
          {inStock && (
            <div className="card-purchase-btn" ref={this.btnRef}>
              <Icon
                type={this.state.addedToCart ? "checkmark" : "cart"}
                fill="white"
                width="24px"
                height="24px"
              />
            </div>
          )}
        </div>
        <h3 className={`card-name ${inStock ? "" : "out-of-stock"}`}>
          {brand} {name}
        </h3>
        <span className={`card-price ${inStock ? "" : "out-of-stock"}`}>
          {currency} {price}
        </span>
      </div>
    );
  }
}

export default Product;
