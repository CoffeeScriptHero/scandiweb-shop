import React, { Component } from "react";
import { getProduct } from "../../services/requests";
import { connect } from "react-redux";
import CartProduct from "../../components/СartProduct/CartProduct";
import { setCategory } from "../../store/reducers/category.slice";
import { changeQuantity } from "../../store/reducers/cart.slice";
import Loader from "../../components/Loader/Loader";
import "./cart.scss";
import { countTotalPrice } from "../../services/helpers";
import cartSvg from "../../assets/images/cart-dummy.svg";

class Cart extends Component {
  state = {
    products: [],
    isLoading: true,
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
    this.fetchProducts();
    this.props.setCategory(null);
  }

  render() {
    const { products, isLoading } = this.state;

    if (isLoading) return <Loader />;

    const { cart, currency, changeQuantity } = this.props;

    const productsList = products.map((p, i) => (
      <CartProduct
        key={i}
        product={p}
        changeQuantity={changeQuantity}
        selectedAttrs={cart[i].attributes}
        quantity={cart[i].quantity}
        currency={currency}
      />
    ));

    const totalQuantity = cart.reduce((prev, cur) => prev + cur.quantity, 0);
    const totalPrice = countTotalPrice(products, currency, cart);
    const taxNumber = 21;
    const tax = Math.round((totalPrice / 100) * taxNumber * 100) / 100;

    return (
      <div className="cart">
        <h1 className="cart__title">Cart</h1>
        {!isLoading && !products.length && (
          <div className="cart__empty">
            <img className="cart__empty-img" src={cartSvg} />
            <h1 className="cart__empty-title">Cart is empty</h1>
            <span className="cart__empty-text">
              But it's never too late to change that :)
            </span>
          </div>
        )}
        {!isLoading && !!products.length && (
          <div className="cart__main-content">
            <div className="cart__products">{productsList}</div>
            <div className="cart__order-info">
              <div className="cart__order-info-wrapper">
                <span className="cart__order-info-text">Tax 21%:</span>
                <span className="cart__order-info-text">Quantity:</span>
                <span className="cart__order-info-text"> Total:</span>
              </div>
              <div className="cart__order-info-wrapper">
                <span className="cart__order-info-value">
                  {currency}
                  {tax}
                </span>
                <span className="cart__order-info-value">{totalQuantity}</span>
                {/* tax can be separated from the total price */}
                <span className="cart__order-info-value">
                  {currency}
                  {totalPrice}
                </span>
              </div>
            </div>
            <button className="purchase-button cart__purchase-button">
              Order
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { cart: state.cart, currency: state.currency.currency };
};

const mapDispatchToProps = {
  setCategory,
  changeQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
