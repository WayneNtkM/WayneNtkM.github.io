const category = $('.category');
const categoryContainer = $('.category-container');
const categoryAll = $('.category-all');
const categoryItems = $$$('.category-items');
const categorySpan = $$$('.category-span');

category.addEventListener('click', () => {
  if (categoryContainer.style.display !== 'flex') {
  categoryContainer.style.display = 'flex';
  return;
  }
  if (categoryContainer.style.display !== 'none') {
    categoryContainer.style.display = 'none';
  }
});

categorySpan.forEach((el) => {
  el.addEventListener('click', () => {
    console.log(el.value);
    allProducts(el.value);
  })
})
