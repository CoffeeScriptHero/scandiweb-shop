import React, { Component, createRef } from "react";
import "./minicart.scss";

class Minicart extends Component {
  contentRef = createRef(null);

  closeHandler = (e) => {
    const modalContent = this.contentRef.current;

    if (!modalContent.contains(e.target) && e.target !== modalContent) {
      this.props.closeMinicart();
    }
  };

  render() {
    const { cart, closeMinicart } = this.props;

    return (
      <div className="minicart_wrapper" onClick={this.closeHandler}>
        <div className="minicart_content" ref={this.contentRef}>
          {!cart.length && (
            <p className="empty_minicart_text">Cart is empty. Yet.</p>
          )}
          <div className="minicart_buttons_wrapper">
            <button className="minicart_button minicart_bag_button">
              VIEW BAG
            </button>
            <button
              className="minicart_button minicart_close_button"
              onClick={closeMinicart}
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Minicart;
