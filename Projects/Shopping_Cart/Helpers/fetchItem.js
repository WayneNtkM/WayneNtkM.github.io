const fetchItem = async (param) => {
  try {
    const url = `https://api.mercadolibre.com/items/${param}`;
    const output = await fetch(url);
    const data = await output.json();
    return data;
  } catch (error) {
    return 'You must provide an url.';
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
