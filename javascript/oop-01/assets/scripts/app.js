class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageURL = image;
    this.description = desc;
    this.price = price;
  }
}

class ElementAttribute {
  constructor (attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHoodId, shouldRender = true) {
    this.hookId = renderHoodId;
    if (shouldRender) {
      this.render();
    }
  }

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }

    console.log(`attr: ${attributes ? true : false} `)

    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);      
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component{
  items = [];

  constructor(renderHoodId) {
    super(renderHoodId, false);
    this.render();
  }

  set cartItems(value) {
    this.items = value;
    this.totalOutput.textContent = `\$${this.totalAmount.toFixed(2)}`;
  }

  get totalAmount() {
    return this.items.reduce((prevValue, curItem) => prevValue + curItem.price, 0);
  }
  
  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  orderProducts = () => {
    console.log('Ordering...');
    console.log(this.items);
  }
  
  render() {
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    const orderButton = cartEl.querySelector('button');
    orderButton.addEventListener('click', this.orderProducts);
    this.totalOutput = cartEl.querySelector('h2');
  }
}

class ProductItem extends Component{
  constructor(product, renderHoodId) {
    super(renderHoodId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    console.log("Adding Items to cart...", this.product);
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement("li", "product-item");
    prodEl.innerHTML = `
            <div>
                <img src = "${this.product.imageURL}" alt = "${this.product.title}">
                <div class = "product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>\$${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to Card</button>
                </div>
            </div>
        `;
    const addCartButton = prodEl.querySelector('button');
    prodEl.addEventListener('click',this.addToCart.bind(this));
  }
}

class ProductList extends Component{
  #products = [];
  constructor(renderHoodId) {
    super(renderHoodId, false);
    this.render();
    this.#fetchProducts();
  }

  #fetchProducts() {
    this.#products = [
      new Product(
        "A Ball",
        "https://www.google.com/search?q=ball+img&rlz=1C1RXQR_enIN975IN975&tbm=isch&source=iu&ictx=1&vet=1&fir=BgdicDnp0R-NgM%252CqdAVZE_1xoo0yM%252C_%253BW44q2yzDlv_KaM%252Cz8Ek9U9Vk2c2BM%252C_%253BTwqN8rTQ_2eITM%252CLyIVxcy8yTw-ZM%252C_%253BqTydefhVibtEqM%252C9ffDilZpHPR94M%252C_%253Bvv4LZ1FcmdB8FM%252CLyIVxcy8yTw-ZM%252C_%253BBtuPn1eqE0PMrM%252Ce2r_yJNMEUwHoM%252C_%253Bf2vcQZdkinK_PM%252CLXY1HwUSfQ5hdM%252C_%253Bm1Ir2YxO_nPDtM%252Ce2r_yJNMEUwHoM%252C_%253B4soA590n9MrKwM%252CfFE-bmc5qxyPGM%252C_%253BLjsfI6S6gYIVIM%252C26rgVc2P8EEHMM%252C_%253BUg9wRUekcxkX9M%252Ce2r_yJNMEUwHoM%252C_%253B8jdgeRfa4mdm8M%252CRhcTuTx_kRv5yM%252C_%253BLl6xB1s2xV0AMM%252C26rgVc2P8EEHMM%252C_%253BLOcIf_0sizlTjM%252CRhcTuTx_kRv5yM%252C_%253BLP2QlVhvQPSl8M%252CYIBRBaWscZLkuM%252C_&usg=AI4_-kSGcQZo5ER11BYw0OyLlkDVLFBqWw&sa=X&ved=2ahUKEwjxhJ2RsZb3AhUYFLcAHQEYCnkQ9QF6BAgcEAE#imgrc=W44q2yzDlv_KaM",
        "A small ball",
        12.22
      ),
      new Product(
        "A cup",
        "https://www.google.com/search?q=ball+img&rlz=1C1RXQR_enIN975IN975&tbm=isch&source=iu&ictx=1&vet=1&fir=BgdicDnp0R-NgM%252CqdAVZE_1xoo0yM%252C_%253BW44q2yzDlv_KaM%252Cz8Ek9U9Vk2c2BM%252C_%253BTwqN8rTQ_2eITM%252CLyIVxcy8yTw-ZM%252C_%253BqTydefhVibtEqM%252C9ffDilZpHPR94M%252C_%253Bvv4LZ1FcmdB8FM%252CLyIVxcy8yTw-ZM%252C_%253BBtuPn1eqE0PMrM%252Ce2r_yJNMEUwHoM%252C_%253Bf2vcQZdkinK_PM%252CLXY1HwUSfQ5hdM%252C_%253Bm1Ir2YxO_nPDtM%252Ce2r_yJNMEUwHoM%252C_%253B4soA590n9MrKwM%252CfFE-bmc5qxyPGM%252C_%253BLjsfI6S6gYIVIM%252C26rgVc2P8EEHMM%252C_%253BUg9wRUekcxkX9M%252Ce2r_yJNMEUwHoM%252C_%253B8jdgeRfa4mdm8M%252CRhcTuTx_kRv5yM%252C_%253BLl6xB1s2xV0AMM%252C26rgVc2P8EEHMM%252C_%253BLOcIf_0sizlTjM%252CRhcTuTx_kRv5yM%252C_%253BLP2QlVhvQPSl8M%252CYIBRBaWscZLkuM%252C_&usg=AI4_-kSGcQZo5ER11BYw0OyLlkDVLFBqWw&sa=X&ved=2ahUKEwjxhJ2RsZb3AhUYFLcAHQEYCnkQ9QF6BAgcEAE#imgrc=W44q2yzDlv_KaM",
        "A bueatiful cup",
        13.77
      ),
    ];
    this.renderProducts();
  }

  renderProducts() {
    if (this.#products && this.#products.length > 0) {
      for (const prod of this.#products) {
        new ProductItem(prod, 'prod-list');
      }
    }
  }
  
  render() {
    this.createRootElement("ul",'product-list', [new ElementAttribute('id', 'prod-list')]);
    
  }
}

class Shop {
  constructor() {
    this.render();
  }
  render() {
    this.cart = new ShoppingCart('app');
    new ProductList('app');
  }
}

class App {
  static cart;
  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();