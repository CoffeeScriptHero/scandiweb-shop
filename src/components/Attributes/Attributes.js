import React, { Component } from "react";
import "./attributes.scss";

class Attributes extends Component {
  render() {
    const { attributes, onClick } = this.props;

    const attributesList = attributes.map((a) => {
      return (
        <div className="attribute-wrapper" key={a.id} onClick={onClick}>
          <h6 className="attribute-title">{a.name}</h6>
          <div className="attribute-content">
            {a.items.map((i, index) => (
              <div
                key={i.id}
                data-name={a.name}
                data-value={i.value}
                className={`attribute 
                  ${a.type === "text" ? "text-attribute" : "swatch-attribute"} 
                  ${index === 0 ? "attribute-active" : ""}`}
                style={{
                  backgroundColor: a.type === "swatch" ? i.value : "",
                }}
              >
                {a.type === "text" ? i.displayValue : ""}
              </div>
            ))}
          </div>
        </div>
      );
    });

    return <div>{attributesList}</div>;
  }
}

export default Attributes;
