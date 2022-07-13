import React, { Component, createRef } from "react";
import Product from "../Product/Product";
import "./products.scss";

class Products extends Component {
  // constructor(props) {
  //   super(props);
  //   this.productsRef = createRef();
  //   this.state = { addedToCart: false };
  // }

  // componentDidMount() {
  //   this.productsRef.current.addEventListener("click", (e) => {
  //     if (e.target.tagName === "SVG") {
  //       this.setState((prevState) => ({ addedToCart: !prevState.addedToCart }));
  //     }
  //   });
  // }

  render() {
    const { products, currency } = this.props;

    const productsList = products.map((p, i) => (
      <Product
        key={p.id}
        id={p.id}
        name={p.name}
        brand={p.brand}
        // addedToCart={this.state.addedToCart}
        inStock={p.inStock}
        description={p.description}
        gallery={p.gallery}
        prices={p.prices}
        currency={currency}
      />
    ));

    return (
      <section className="products" ref={this.productsRef}>
        {productsList}
      </section>
    );
  }
}

export default Products;
