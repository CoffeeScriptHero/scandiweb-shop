import React, { Component, createRef } from "react";
import "./minicart.scss";
import { connect } from "react-redux";
import { changeQuantity } from "../../store/reducers/cart.slice";
import { getProduct } from "../../services/requests";
import MinicartLoader from "../MinicartLoader/MinicartLoader";
import MinicartProduct from "../MinicartProduct/MinicartProduct";

class Minicart extends Component {
  state = {
    products: [],
    isLoading: true,
  };
  contentRef = createRef(null);

  closeHandler = (e) => {
    const modalContent = this.contentRef.current;

    if (!modalContent.contains(e.target) && e.target !== modalContent) {
      this.props.closeMinicart();
    }
  };

  fetchProducts = async () => {
    const { cart } = this.props;
    for (let i = 0; i < this.props.cart.length; i++) {
      const product = (await getProduct(cart[i].id)).data.product;
      this.setState(({ products }) => ({
        products: [...products, product],
      }));
    }
    this.setState({ isLoading: false });
  };

  componentDidMount() {
    if (this.props.cart.length) {
      this.fetchProducts();
    } else {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { cart, currency, closeMinicart, changeQuantity } = this.props;
    const { isLoading, products } = this.state;

    const totalPrice = products.reduce((prev, cur, i) => {
      const itemPrice =
        cur.prices.find((p) => p.currency.symbol === currency).amount *
        cart[i].quantity;
      return Math.round((prev + itemPrice) * 100) / 100;
    }, 0);

    const totalQuantity = cart.reduce((prev, cur) => prev + cur.quantity, 0);

    const productsList = products.map((p, i) => (
      <MinicartProduct
        key={i}
        selectedAttrs={cart[i].attributes}
        changeQuantity={changeQuantity}
        quantity={cart[i].quantity}
        closeMinicart={closeMinicart}
        product={p}
        currency={currency}
      />
    ));

    return (
      <div className="minicart" onClick={this.closeHandler}>
        <div
          className={`minicart__content ${
            !cart.length && !isLoading ? "minicart__content-centered" : ""
          }`}
          ref={this.contentRef}
        >
          {isLoading && <MinicartLoader />}
          {!cart.length && !isLoading && (
            <p className="minicart__content-empty-text">Cart is empty. Yet.</p>
          )}
          {!!cart.length && !isLoading && (
            <h2 className="minicart__content-title">
              My Bag,{" "}
              <span className="minicart__content-title-number">
                {totalQuantity} {totalQuantity > 1 ? "items" : "item"}
              </span>
            </h2>
          )}
          {!!cart.length && !isLoading && (
            <div className="minicart__content-items">{productsList}</div>
          )}
          {!!cart.length && !isLoading && (
            <div className="minicart__total">
              <span className="minicart__total-text">Total</span>
              <span className="minicart__total-price">
                {currency}
                {totalPrice}
              </span>
            </div>
          )}
          <div className="minicart__content-buttons">
            <button className="minicart__content-button minicart__content-button_dark">
              VIEW BAG
            </button>
            <button
              className="minicart__content-button minicart__content-button_green"
              onClick={closeMinicart}
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    currency: state.currency.currency,
  };
};

const mapDispatchToProps = {
  changeQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Minicart);
