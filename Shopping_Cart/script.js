const addLoading = () => {
  loading.style.display = 'flex';
};

const removeLoading = () => {
  loading.style.display = 'none';
};

const countCartItems = () => {
  countDiv.style.display = 'flex';
  count.forEach((element) => {
    element.style.display = 'flex';
    element.innerHTML = cartItems.children.length;
  });
}

const createProductImageElement = (imageSource) => {
  const imageHD = imageSource.replace(/I.jpg/g, 'W.jpg');
  const img = $$('img');
  img.className = 'item__image';
  img.src = imageHD;
  return img;
};

const createCustomElement = (element, className, innerText, sku) => {
  const e = $$(element);
  e.className = className;
  e.innerText = innerText;
  e.id = sku;
  return e;
};

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
  const num = parts.join(",");
  return num;
  }

const getPrices = () => {
  const items = cartItems.childNodes;
  const array = [];
  items.forEach((item) => {
    const price = item.innerHTML.split('$');
    array.push(Number(price[1].replace('</span></div>', '')));
  });
  return array.reduce((a, b) => a + b, 0);
};

const setPrice = () => {
  total.innerHTML = `Subtotal: $${numberWithCommas(getPrices().toFixed(2))}`;
  localStorage.setItem('cartPrice', total.innerHTML);
};

const cartItemClickListener = (event) => {
  const evento = event.target;
  evento.parentElement.parentElement.remove();
  saveCartItems(cartItems.innerHTML);
  countCartItems();
  setPrice();
};

const append = (element, ...args) => {
  args.forEach((item) => {
    element.appendChild(item);
  });
};

const createImg = (element, image) => {
  const img = $$(element);
  const hd = image.replace(/I.jpg/g, 'W.jpg');
  img.className = 'img-cart-item';
  img.src = hd;
  return img;
};

const createTitle = (element, name) => {
  const title = $$(element);
  title.innerHTML = name;
  title.className = 'cart-item-title';
  return title;
};

const createItemPrice = (element, price) => {
  const salePrice = $$(element);
  const pricecont = $$('div');
  pricecont.className = 'price-wrap';
  salePrice.className = 'cart-item-price';
  salePrice.innerHTML = `R$${price}`;
  pricecont.appendChild(salePrice);
  return pricecont;
};

const createXButton = (element, ty, val) => {
  const button = $$(element);
  button.type = ty;
  button.value = val;
  button.className = 'button-x';
  button.addEventListener('click', cartItemClickListener);
  return button;
};

const createCustomCartItem = (element, name, image, price) => {
  const e = $$(element);
  const div = $$('div');
  div.className = 'img-button-wrap';
  e.className = 'cart__item';
  append(div, createImg('img', image), createTitle('span', name), createXButton('input', 'button', 'X'));
  append(e, div, createItemPrice('span', price));
  return e;
};

const createCartItemElement = ({ name, salePrice, image }) =>
createCustomCartItem('li', name, image, salePrice);

const selectProduct = async (sku) => {
  const items = await fetchItem(sku);
  const { title: name, price: salePrice, thumbnail: image } = items;
  saveCartItems(cartItems.innerHTML);
  return createCartItemElement({ sku, name, salePrice, image });
};

const createProductItemElement = ({ sku, name, image, salePrice }) => {
  const section = $$('section');
  const productsec = $('.items');
  section.className = 'item';

  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', `$${salePrice}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!', sku));
  productsec.appendChild(section);
  const btnAdd = $(`#${sku}`);
  btnAdd.addEventListener('click', async () => {
    cartItems.appendChild(await selectProduct(sku));
    setPrice();
    countCartItems();
    saveCartItems(cartItems.innerHTML);
  });
  return section;
};

function addevent() {
  const cartItem = $$$('.button-x');
  cartItem
  .forEach((e) => {
    e.addEventListener('click', cartItemClickListener);
  });
}

const getSavedCart = () => {
  const cartPrice = $('.total-price');
  const saved = getSavedCartItems();
  cartItems.innerHTML = saved;
  cartPrice.innerHTML = localStorage.getItem('cartPrice');
};

cartArea.addEventListener('click', () => {
  if (cartAll.style.display !== 'flex') {
    items.style.display = 'none';
    containerSec.style.justifyContent = 'space-between';
    cartAll.style.display = 'flex';
    return;
  }
  if (cartAll.style.display !== 'none') {
    items.style.display = 'flex';
    cartAll.style.display = 'none';
  }
});

const allProducts = (param) => {
  // for (let i = 0; i <= 5; i += 1) {
    fetchProducts(param)
      .then((res) => {
        res.results.forEach((product) => createProductItemElement({
          sku: product.id, name: product.title, image: product.thumbnail, salePrice: product.price,
        }));
    });
  // }
  addevent();
};

clearCart.addEventListener('click', () => {
  const items = $('.cart__items');
  total.innerHTML = `$${0}`;
  items.innerHTML = '';
  localStorage.setItem('cartPrice', total.innerHTML);
  countCartItems();
  saveCartItems(cartItems.innerHTML);
});

const sideBarevent = () => {
  btnsideBAr.addEventListener('click', () => {
  if (sideBar.style.display !== 'flex' && loading.style.display === 'none') {
    sideBar.style.display = 'flex';
    sideBar.style.animation = `${1}s barefectap`;
    countDiv.style.display = 'none';
    return;
  }
  if (sideBar.style.display !== 'none') {
    sideBar.style.animation = `${1.2}s barefectdis`;
    setTimeout(() => {
      sideBar.style.display = 'none';
    }, 1000);
    countDiv.style.display = 'flex';
  }
});
};

const seacrhProduct = () => {
  allProducts('consoles');
  search.addEventListener('click', () => {
    console.log(inputProd.value);
    if (inputProd.value === '') {
      allProducts();
    }
    items.style.display = 'none';
    items.innerHTML = '';
    sideBar.style.display = 'none';
    cartAll.style.display = 'none';
    addLoading();
    setTimeout(() => {
      items.style.display = 'flex';
      sideBar.style.display = 'none';
      removeLoading();
      allProducts(inputProd.value);
      inputProd.value = '';
    }, 3000);
  });
};

window.onload = () => {
  setTimeout(() => {
    removeLoading();
    allProducts(inputProd.value);
    getSavedCart();
    seacrhProduct();
    sideBarevent();
    countCartItems();
    searchCont.style.display = 'flex';
  }, 2000);
};
