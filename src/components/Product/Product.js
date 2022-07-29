import React, { Component } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import "./product.scss";
import { getProduct } from "../../services/requests";

class Product extends Component {
  localCart = JSON.parse(localStorage.getItem("cart"));
  state = {
    addedToCart: this.localCart
      ? this.localCart.find((p) => p.id === this.props.id)
      : false,
  };

  cartBtnHandler = () => {
    this.setState(({ addedToCart }) => ({ addedToCart: !addedToCart }));

    const inCart = this.state.addedToCart;

    if (!inCart) {
      getProduct(this.props.id).then((res) => {
        const defaultAttrs = {};
        const attrs = res.data.product.attributes;

        attrs.forEach((a) => {
          defaultAttrs[a.name] = a.items[0].value;
        });

        this.props.productSave({
          id: this.props.id,
          attributes: defaultAttrs,
          quantity: 1,
        });
      });
    } else {
      this.props.removeById(this.props.id);
    }
  };

  render() {
    const { id, name, brand, inStock, gallery, prices, currency } = this.props;

    const price = prices.filter((p) => p.currency.symbol === currency)[0]
      .amount;

    return (
      <article className="product">
        <div
          className={`product__img-wrapper ${
            inStock ? "" : "product__img-out-of-stock-text"
          }`}
        >
          <Link to={`/p/${id}`}>
            <img
              className={`product__img ${
                inStock ? "" : "product__img--opacity"
              }`}
              src={gallery[0]}
              alt={name}
            />
          </Link>
          {inStock && (
            <div
              className="product__img-purchase-btn"
              onClick={this.cartBtnHandler}
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
          className={`product__name-link ${
            inStock ? "" : "product__text-out-of-stock"
          }`}
        >
          {brand} {name}
        </Link>
        <span
          className={`product__price ${
            inStock ? "" : "product__text-out-of-stock"
          }`}
        >
          {currency} {price}
        </span>
      </article>
    );
  }
}

export default Product;
