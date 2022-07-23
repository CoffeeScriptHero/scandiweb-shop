import React, { Component } from "react";
import "./loader.scss";

export default class Loader extends Component {
  render() {
    return (
      <div className="centering_wrapper">
        <div className="lds_grid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
