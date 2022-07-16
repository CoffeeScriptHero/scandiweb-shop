import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";
import { getProduct } from "../../services/requests";
import { withParams } from "../../services/routerHooks";
import "./product.scss";

class Product extends Component {
  state = {
    isLoading: true,
    product: null,
    imageToShow: null,
  };

  imagesHandler = (e) => {
    if (e.target.tagName === "IMG") {
      document.querySelector(".active-image").classList.remove("active-image");
      e.target.classList.add("active-image");
      this.setState({ imageToShow: e.target.src });
    }
  };

  componentDidMount() {
    const id = this.props.params.id;
    getProduct(id).then((res) =>
      this.setState({
        isLoading: false,
        product: res.data.product,
        imageToShow: res.data.product ? res.data.product.gallery[0] : null,
      })
    );
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    if (!this.state.isLoading && !this.state.product) return <p>Not found</p>;

    const { brand, name, gallery, attributes, desciption, inStock } =
      this.state.product;

    return (
      <div className="product-page">
        <aside className="product-aside-images" onClick={this.imagesHandler}>
          {gallery.map((img, i) => (
            <div
              key={i}
              className={`aside-image-wrapper 
            ${i === 0 ? "active-image" : ""}`}
            >
              <img
                className="product-aside-image"
                src={img}
                alt="aside product image"
              />
            </div>
          ))}
        </aside>
        <div className="main-image-wrapper">
          <img
            className="product-main-image"
            src={this.state.imageToShow}
            alt="main product image"
          />
        </div>
        <div className="product-info-wrapper">
          <h1 className="product-title">{brand}</h1>
          <h2 className="product-name">{name}</h2>
        </div>
      </div>
    );
  }
}

export default withParams(Product);
