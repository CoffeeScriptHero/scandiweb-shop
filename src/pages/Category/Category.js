import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";
import "./category.scss";
import {
  fetchProducts,
  setCategory,
} from "../../store/reducers/category.slice";
import { fetchCategories } from "../../store/reducers/category.slice";
import { connect } from "react-redux";
import { withParams } from "../../services/routerHooks";
import Products from "../../components/Products/Products";

class Category extends Component {
  state = {
    isLoading: true,
    categoryExist: true,
    products: [],
  };

  componentDidUpdate(prevProps) {
    const path = this.props.params["*"];
    const { fetchProducts, categories, setCategory } = this.props;

    if (prevProps.category !== path) {
      setCategory(path);
      if (!categories.includes(path)) {
        this.setState({ isLoading: false, categoryExist: false });
      } else if (this.state.isLoading) {
        fetchProducts(path).then((res) => {
          this.setData(res.data.category.products);
        });
      } else {
        this.setState({ isLoading: true });
      }
    }
  }

  setData = (data) => {
    this.setState({
      isLoading: false,
      categoryExist: true,
      products: data,
    });
  };

  render() {
    const { category, currency } = this.props;

    if (this.state.isLoading) return <Loader />;
    if (!this.state.categoryExist && !this.state.isLoading) {
      return <p>Not found!</p>;
    }

    return (
      <div className="catalog">
        <h2 className="catalog-title">{category}</h2>
        <Products products={this.state.products} currency={currency} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.category.categories,
    category: state.category.category,
    currency: state.currency.currency,
  };
};

const mapDispatchToProps = {
  fetchProducts,
  fetchCategories,
  setCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Category));
