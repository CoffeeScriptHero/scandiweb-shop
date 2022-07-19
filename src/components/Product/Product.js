import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import "./product.scss";

class Product extends Component {
  state = { addedToCart: false };
  btnRef = createRef();

  // addToCart = () => {

  // }

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
          <Link to={`/p/${id}`}>
            <img
              className={`card-img ${inStock ? "" : "img-opacity"}`}
              src={gallery[0]}
              alt={name}
            />
          </Link>
          {inStock && (
            <div
              className="card-purchase-btn"
              ref={this.btnRef}
              onClick={this.addToCart}
            >
              <Icon
                type={this.state.addedToCart ? "checkmark" : "cart"}
                fill="white"
                width="24px"
                height="24px"
              />
            </div>
          )}
        </div>
        <Link
          to={`/p/${id}`}
          className={`card-name-link ${inStock ? "" : "out-of-stock"}`}
        >
          {brand} {name}
        </Link>
        <span className={`card-price ${inStock ? "" : "out-of-stock"}`}>
          {currency} {price}
        </span>
      </div>
    );
  }
}

export default Product;
