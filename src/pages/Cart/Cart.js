import React, { Component } from "react";
import { getProduct } from "../../services/requests";
import { connect } from "react-redux";
import CartProduct from "../../components/СartProduct/CartProduct";
import { changeQuantity } from "../../store/reducers/cart.slice";
import Loader from "../../components/Loader/Loader";
import "./cart.scss";

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
  }

  render() {
    if (this.state.isLoading) return <Loader />;

    const { cart, currency, changeQuantity } = this.props;

    const productsList = this.state.products.map((p, i) => (
      <CartProduct
        key={i}
        product={p}
        changeQuantity={changeQuantity}
        selectedAttrs={cart[i].attributes}
        quantity={cart[i].quantity}
        inMinicart={false}
        currency={currency}
      />
    ));

    return (
      <div className="cart">
        <h1 className="cart__title">Cart</h1>
        <div className="cart__products">{productsList}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { cart: state.cart.cart, currency: state.currency.currency };
};

const mapDispatchToProps = {
  changeQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
