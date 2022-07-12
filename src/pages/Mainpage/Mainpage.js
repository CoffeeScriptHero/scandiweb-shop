import React, { Component } from "react";
import { withParams } from "../../services/routerHooks";
import Category from "../Category/Category";
import { connect } from "react-redux";
import Loader from "../../components/Loader/Loader";

class Mainpage extends Component {
  render() {
    const { categories } = this.props;
    const path = this.props.params["*"];

    return (
      <div>
        {!!categories.length && (
          <Category categories={categories} path={path} />
        )}
        {!!!categories.length && <Loader />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.category.categories,
  };
};

export default connect(mapStateToProps)(withParams(Mainpage));
