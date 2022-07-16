import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";
import "./category.scss";
import { setCategory } from "../../store/reducers/category.slice";
import { getProducts } from "../../services/requests";
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

  // componentDidMount() {
  //   if (this.props.category) {
  //     this.props.setCategory(null);
  //   }
  // }

  componentDidUpdate(prevProps) {
    const path = this.props.params["*"];
    const { categories, setCategory } = this.props;
    console.log(prevProps.category, path);
    if (prevProps.category !== path) {
      setCategory(path);
      if (!categories.includes(path)) {
        this.setState({ isLoading: false, categoryExist: false });
      } else if (this.state.isLoading) {
        getProducts(path).then((res) => {
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
    console.log(this.props, "\n", this.state);
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
  fetchCategories,
  setCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Category));
