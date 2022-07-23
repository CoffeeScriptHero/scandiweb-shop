import React, { Component } from "react";
import "./attributes.scss";

class Attributes extends Component {
  render() {
    const { attributes, onClick } = this.props;

    const attributesList = attributes.map((a) => {
      return (
        <div className="attribute_wrapper" key={a.id} onClick={onClick}>
          <h6 className="attribute_title">{a.name}</h6>
          <div className="attribute_content">
            {a.items.map((i, index) => (
              <div
                key={i.id}
                data-name={a.name}
                data-value={i.value}
                className={`attribute 
                  ${a.type === "text" ? "text_attribute" : "swatch_attribute"} 
                  ${index === 0 ? "attribute_active" : ""}`}
                style={{
                  backgroundColor: a.type === "swatch" ? i.value : "",
                }}
              >
                {a.type === "text" ? i.value : ""}
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
