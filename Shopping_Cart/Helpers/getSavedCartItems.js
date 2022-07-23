const getSavedCartItems = () => {
  const item = localStorage.getItem('cartItems');
  return item;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
