import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";
import "./category.scss";
import { productSave, removeById } from "../../store/reducers/cart.slice";
import { setCategory } from "../../store/reducers/category.slice";
import { getProducts } from "../../services/requests";
import { connect } from "react-redux";
import { withParams } from "../../services/routerHooks";
import Products from "../../components/Products/Products";

class Category extends Component {
  state = {
    isLoading: true,
    categoryExist: false,
    products: [],
  };

  setData = (data) => {
    this.setState({
      isLoading: false,
      categoryExist: true,
      products: data,
    });
  };

  fetchData = () => {
    const path = this.props.params["*"];
    getProducts(path).then((res) => {
      if (res.data.category) {
        this.setData(res.data.category.products);
      } else {
        this.setState({ isLoading: false, categoryExist: false });
      }
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const path = this.props.params["*"];
    const { setCategory } = this.props;

    if (prevProps.category !== path) {
      setCategory(path);
      this.fetchData();
    }
  }

  render() {
    const { category, currency, productSave, removeById } = this.props;

    if (this.state.isLoading) return <Loader />;
    if (!this.state.categoryExist) {
      return <p>Not found!</p>;
    }

    return (
      <div className="category">
        <h2 className="category__title">{category}</h2>
        <Products
          products={this.state.products}
          currency={currency}
          productSave={productSave}
          removeById={removeById}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category.category,
    currency: state.currency.currency,
  };
};

const mapDispatchToProps = {
  setCategory,
  productSave,
  removeById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Category));
