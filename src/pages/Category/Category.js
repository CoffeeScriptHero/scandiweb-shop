import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";
import { withParams } from "../../services/routerHooks";
import { client } from "../../index";
import "./category.scss";

class Category extends Component {
  state = {
    path: this.props.params["*"],
    isLoading: true,
  };

  componentDidMount() {
    // client.query({})
  }

  render() {
    if (this.state.isLoading) return <Loader />;

    return (
      <div className="page">
        <Loader />
      </div>
    );
  }
}

export default withParams(Category);
