export const isObject = (object) => {
  return object != null && typeof object === "object";
};

export const deepEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
};

export const countTotalPrice = (products, currency, cart) => {
  return products.reduce((prev, cur, i) => {
    const itemPrice =
      cur.prices.find((p) => p.currency.symbol === currency).amount *
      cart[i].quantity;
    return Math.round((prev + itemPrice) * 100) / 100;
  }, 0);
};

export const countItemPrice = (prices, currency, quantity) => {
  return (
    Math.round(
      prices.filter((p) => p.currency.symbol === currency)[0].amount *
        quantity *
        100
    ) / 100
  );
};
