class Product {
    constructor (title, imageURL, desc, price) {
        this.title = title;
        this.imageURL = imageURL;
        this.description = desc;
        this.price = price;
    }
}

class ElementAttribute {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

class Component {

    constructor(renderHookId, shouldRender = true) {
        this.hookId = renderHookId;
        if(shouldRender) {
            this.render();
        }
    }

    render() {}

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);
        if(cssClasses) {
            rootElement.className = cssClasses;
        }
        if(attributes && attributes.length > 0) {
            for(const attribute of attributes) {
                rootElement.setAttribute(attribute.name, attribute.value);
            }
        }

        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    }
}

class ShoppingCart extends Component {
    items = [];

    orderProducts = () => {
        console.log('ordering');
        console.log(this.items);
    }

    render() {
        const cartEl = this.createRootElement('section', 'cart')
        cartEl.innerHTML = `
            <h2>Total: INR.${0}</h2>
            <button>Order Now</button>
        `;
    const orderButton = cartEl.querySelector('button');
    orderButton.addEventListener('click', this.orderProducts);
    this.totalOutput = cartEl.querySelector('h2');
    }

    set cartItems(itemValues) {
        this.items = itemValues;
        this.totalOutput.innerHTML = `<h2>Total: INR.${this.totalAmount.toFixed(2)}</h2>`;
    }

    get totalAmount() {
        const sum = this.items.reduce(
            (prevValue, curItem) => prevValue + curItem.price, 0);
        return sum;
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    constructor(renderHookId) {
        super(renderHookId, false);
        // this.orderProducts;
        this.render();
    }
}

class ProductItem extends Component {
    constructor (product, renderHookId) {
        super(renderHookId, false);
        this.product = product;
        this.render();
    }

    addToCart() {
        App.addProductToCart(this.product);
    }

    render() {
        const prodEl = this.createRootElement('li', 'product-item');
            prodEl.innerHTML = `
                <div>
                    <img src = "${this.product.imageURL}" alt = "${this.product.title}">
                    <div class = "product-item__content">
                        <h2>${this.product.title}</h2>
                        <h3>INR.${this.product.price}</h3>
                        <p>${this.product.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
        const addToCartBtn = prodEl.querySelector('button');
        addToCartBtn.addEventListener('click', this.addToCart.bind(this));
    }
}

class ProductList extends Component {
    #products = [];

    constructor(renderHookId) {
        super(renderHookId,false);
        this.render();
        this.fetchProducts();
    }

    fetchProducts() {
        this.#products  = [
            new Product('A Pillow', 'https://a-pillow.com/pillow.img', 'A soft pillow', 19.99)
        ];
        this.renderProducts();
    }

    renderProducts() {
        for (const prod of this.#products) {
            const productItem = new ProductItem(prod, 'prod-list');
        }
    }

    render() {
        this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')]);
        if(this.#products && this.#products.length > 0) {
            this.renderProducts();
        }
    }
}

class Shop {

    constructor() {
        this.render();
    }

    render() {
        this.cart = new ShoppingCart('app');
        const prodList = new ProductList('app');
    }
}

class App {
    static init() {
        const shop = new Shop();
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product)
    }
}

App.init();