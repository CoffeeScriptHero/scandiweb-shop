import React, { Component, createRef, PureComponent } from "react";
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

    const inCart = !this.state.addedToCart;

    if (inCart) {
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
      <div className="product_card">
        <div
          className={`card_img_wrapper ${
            inStock ? "" : "img_out_of_stock_text"
          }`}
        >
          <Link to={`/p/${id}`}>
            <img
              className={`card_img ${inStock ? "" : "img_opacity"}`}
              src={gallery[0]}
              alt={name}
            />
          </Link>
          {inStock && (
            <div className="card_purchase_btn" onClick={this.cartBtnHandler}>
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
          className={`card_name_link ${inStock ? "" : "out_of_stock"}`}
        >
          {brand} {name}
        </Link>
        <span className={`card_price ${inStock ? "" : "out_of_stock"}`}>
          {currency} {price}
        </span>
      </div>
    );
  }
}

export default Product;
