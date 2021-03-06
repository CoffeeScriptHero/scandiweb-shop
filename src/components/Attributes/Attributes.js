import React, { PureComponent } from "react";
import "./attributes.scss";

class Attributes extends PureComponent {
  render() {
    const {
      attributes,
      selectedAttrs = null,
      onClick = null,
      inMinicart = false,
      overflowAttrs = false,
    } = this.props;

    const sizeClass = inMinicart
      ? "attribute__size-small"
      : "attribute__size-big";

    const attributesList = attributes.map((a) => {
      return (
        <div
          className={`attribute ${sizeClass}`}
          key={a.name}
          onClick={onClick}
        >
          <h6 className={`attribute__title ${sizeClass}`}>{a.name}:</h6>
          <div className="attribute__content">
            {a.items.map((i, index) => (
              <div
                key={index}
                data-name={a.name}
                data-type={a.type}
                data-value={i.value}
                className={`attribute__item 
                ${sizeClass}
                  ${
                    a.type === "text"
                      ? "attribute__item_type_text"
                      : "attribute__item_type_swatch"
                  } 
                  ${
                    inMinicart && a.type === "text" && i.value.length > 3
                      ? "attribute__size-bigger"
                      : ""
                  }
                  ${
                    !selectedAttrs && index === 0
                      ? "attribute__state-active"
                      : ""
                  }
                  ${
                    selectedAttrs && selectedAttrs[a.name] === i.value
                      ? "attribute__state-active"
                      : ""
                  } 
                  `}
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

    return (
      <div
        className={`attributes ${
          overflowAttrs ? "attributes__type-cart" : ""
        } ${inMinicart ? "attributes__type-minicart" : ""}`}
      >
        {attributesList}
      </div>
    );
  }
}

export default Attributes;
