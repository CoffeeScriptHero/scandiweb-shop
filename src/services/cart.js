export const addToCart = (id, attributes, cart, productSave, productRemove) => {
  const productInCart = cart.find((p) => p.id === id);

  if (!productInCart) {
    const defaultAttributes = {};

    attributes.forEach((a) => {
      defaultAttributes[a.name] = a.items[0].value;
    });

    const productObj = {
      id,
      ...defaultAttributes,
    };

    productSave(productObj);
  } else {
    productRemove(id);
  }
};
