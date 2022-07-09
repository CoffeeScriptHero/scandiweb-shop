import React, { Component } from "react";
import * as Icons from "../../assets/icons";
import "./icon.scss";

export default class Icon extends Component {
  render() {
    const { type, onClick, ...rest } = this.props;
    const iconJsx = Icons[type];
    if (!iconJsx) return null;
    return (
      <span className={`icon`} onClick={onClick}>
        {iconJsx({ ...rest })}
      </span>
    );
  }
}
