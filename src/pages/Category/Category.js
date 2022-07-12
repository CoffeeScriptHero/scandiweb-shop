import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";
import "./category.scss";
import {
  fetchProducts,
  setCurrentCategory,
} from "../../store/reducers/category.slice";
import { fetchCategories } from "../../store/reducers/category.slice";
import { connect } from "react-redux";
import { withParams } from "../../services/routerHooks";

class Category extends Component {
  state = {
    isLoading: true,
    categoryExist: true,
    products: [],
  };

  // componentDidMount() {
  //   const { fetchProducts, categories, path, setCurrentCategory } = this.props;

  //   if (categories.includes(path)) {
  //     setCurrentCategory(path);
  //     fetchProducts(path).then((res) => {
  //       this.setData(res.data.category.products);
  //     });
  //   } else {
  //     this.setState({ isLoading: false, categoryExist: false });
  //   }
  // }

  componentDidUpdate(prevProps) {
    const path = this.props.params["*"];
    const { fetchProducts, categories, setCurrentCategory } = this.props;

    if (prevProps.currentCategory !== path) {
      setCurrentCategory(path);
      if (this.state.isLoading) {
        fetchProducts(path).then((res) => {
          this.setData(res.data.category.products);
        });
      } else {
        this.setState({ isLoading: true });
      }
    }
  }

  setData = (data) => {
    this.setState({ products: data, isLoading: !this.state.isLoading });
  };

  render() {
    if (this.state.isLoading) return <Loader />;
    if (!this.state.categoryExist && !this.state.isLoading) {
      return <p>Not found!</p>;
    }

    return (
      <div className="page">
        {this.state.products.map((p) => (
          <p key={p.id}>
            {p.id} {p.name}
          </p>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.category.categories,
    currentCategory: state.category.currentCategory,
  };
};

const mapDispatchToProps = {
  fetchProducts,
  fetchCategories,
  setCurrentCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Category));
