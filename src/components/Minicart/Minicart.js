import React, { Component, createRef } from "react";
import "./minicart.scss";
import { connect } from "react-redux";
import { productRemove } from "../../store/reducers/cart.slice";
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
    }
  }

  render() {
    const { cart, currency, closeMinicart } = this.props;
    const { isLoading, products } = this.state;

    const productsList = products.map((p, i) => (
      <MinicartProduct
        key={i}
        selectedAttrs={cart[i].attributes}
        amount={cart[i].amount}
        product={p}
        currency={currency}
      />
    ));

    return (
      <div className="minicart" onClick={this.closeHandler}>
        <div className="minicart__content" ref={this.contentRef}>
          {isLoading && <MinicartLoader />}
          {!cart.length && !isLoading && (
            <p className="minicart__content-empty-text">Cart is empty. Yet.</p>
          )}
          {!!cart.length && !isLoading && (
            <div className="minicart__content-items">
              <h2 className="minicart__content-title">
                My Bag,{" "}
                <span className="minicart__content-title-number">
                  {cart.length} items
                </span>
              </h2>
              {productsList}
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
    cart: state.cart,
    currency: state.currency.currency,
  };
};

const mapDispatchToProps = {
  productRemove,
};

export default connect(mapStateToProps, mapDispatchToProps)(Minicart);
