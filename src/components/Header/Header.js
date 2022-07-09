import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./header.scss";
import logo from "../../assets/images/logo.png";
import Icon from "../Icon/Icon";
import { fetchCategories, fetchCurrencies } from "./headerSlice";

class Header extends Component {
  state = {
    value: "$",
  };

  handleClick = (e) => {
    if (e.target.tagName === "A") {
      const activeLink = document.querySelector(".category-active-link");
      if (activeLink) activeLink.classList.remove("category-active-link");
      e.target.classList.add("category-active-link");
    }
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchCurrencies();
  }

  render() {
    const categoriesList = this.props.categories.map((c, i) => (
      <Link
        to={c}
        key={i}
        className={`category-name-link ${i ? "" : "category-active-link"}`}
      >
        {c}
      </Link>
    ));

    const currenciesList = this.props.currencies.map((c, i) => (
      <option className="currency-option" key={i} value={c.symbol}>
        {/* {c.symbol} {c.label} */}
        {this.state.value === c.symbol ? c.symbol : `${c.symbol} ${c.label}`}
      </option>
    ));

    return (
      <header className="header">
        <div className="categories-wrapper" onClick={this.handleClick}>
          {!!categoriesList.length && categoriesList}
        </div>
        <div className="logo-wrapper">
          <img className="logo" src={logo} alt="scandiweb shop logo" />
        </div>
        <div className="purchasing-wrapper">
          <select
            className="currencies-select"
            value={this.state.value}
            onChange={this.handleChange}
          >
            {!!currenciesList && currenciesList}
          </select>
          <Icon type="cart" />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.header.categories,
    currencies: state.header.currencies,
  };
};

const mapDispatchToProps = {
  fetchCategories,
  fetchCurrencies,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
