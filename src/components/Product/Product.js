import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import { addToCart } from "../../services/cart";
import "./product.scss";

class Product extends Component {
  storageCart = JSON.parse(localStorage.getItem("cart"));
  state = {
    addedToCart: this.storageCart
      ? this.storageCart.find((p) => p.id === this.props.id)
      : false,
  };
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
    const {
      attributes,
      cart,
      productSave,
      productRemove,
      id,
      name,
      brand,
      inStock,
      gallery,
      prices,
      currency,
    } = this.props;

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
              onClick={addToCart.bind(
                this,
                id,
                attributes,
                cart,
                productSave,
                productRemove
              )}
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
