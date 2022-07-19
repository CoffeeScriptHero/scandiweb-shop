import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./header.scss";
import { withParams } from "../../services/routerHooks";
import logo from "../../assets/images/logo.png";
import Icon from "../Icon/Icon";
import { fetchCategories } from "../../store/reducers/category.slice";
import {
  fetchCurrencies,
  changeCurrency,
} from "../../store/reducers/currency.slice";
import Select from "../Select/Select";
import Minicart from "../Minicart/Minicart";

class Header extends Component {
  state = {
    showMinicart: false,
  };

  toggleMinicart = () => {
    this.setState(({ showMinicart }) => ({ showMinicart: !showMinicart }));
  };

  closeMinicart = () => this.setState({ showMinicart: false });

  handleClick = (e) => {
    if (e.target.tagName === "A") {
      const activeLink = document.querySelector(".category-active-link");
      if (activeLink) activeLink.classList.remove("category-active-link");
      e.target.classList.add("category-active-link");
    }
  };

  optionHandler = (value) => {
    this.props.changeCurrency(value);
    localStorage.setItem("currency", value);
  };

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchCurrencies();
  }

  render() {
    const { category, cart } = this.props;
    const categoriesList = this.props.categories.map((c, i) => {
      return (
        <Link
          to={`/${c}`}
          key={i}
          className={`category-name-link ${
            c === category ? "category-active-link" : ""
          }`}
        >
          {c}
        </Link>
      );
    });

    const currenciesList = this.props.currencies.map((c) => ({
      value: c.symbol,
      content: `${c.symbol} ${c.label}`,
    }));

    return (
      <header className="header">
        <div className="header-content">
          <div className="categories-wrapper" onClick={this.handleClick}>
            {!!categoriesList.length && categoriesList}
          </div>
          <div className="main-logo-wrapper">
            <img className="main-logo" src={logo} alt="scandiweb shop logo" />
          </div>
          <div className="purchasing-wrapper">
            <Select
              options={!!currenciesList.length ? currenciesList : []}
              handleClick={this.optionHandler}
            />
            <div className="header-cart-icon">
              <Icon type="cart" onClick={this.toggleMinicart} />
              {this.state.showMinicart && (
                <Minicart cart={cart} closeMinicart={this.closeMinicart} />
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currencies: state.currency.currencies,
    categories: state.category.categories,
    category: state.category.category,
    cart: state.cart,
  };
};

const mapDispatchToProps = {
  fetchCategories,
  fetchCurrencies,
  changeCurrency,
};

export default connect(mapStateToProps, mapDispatchToProps)(withParams(Header));
