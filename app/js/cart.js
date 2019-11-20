class Cart {
    constructor(user){
        this._user = user;
        this._products = [];
    };  
}

const user = "user-placeholder";

Cart.prototype.add = function (product) {
    this._products.push(product);
};

Cart.prototype.get = function () {
    return this._products;
};

Cart.prototype.sum = function () {
    return this._products.reduce((acc,cur)=>{
        const priceString = cur.Price;
        const price = parseFloat(priceString.split(',').join("").slice(1));
        return acc + price;
    },0);
};

Cart.prototype.incrimentAmount = function (index) {
    this._products[index].amount += 1;
}

let currentCart;

Cart.prototype.contains = function (productId) {
    return this._products.findIndex((element)=>{
        if (element.id == productId) {
            return true;
        } else {
            return false;
        }
    });
};



export const addCartListeners = (products) => {
    const moreButtons = document.querySelectorAll('.home__more');
    console.log('Products: ', products);

    const addToChart = (event) => {
        const element = new Object();
        element.id = event.currentTarget.dataset.id;
        const product = products.find((elem)=>{
            if (elem.id ==  element.id) {
                return true;
            } else {
                return false;
            }
        });
        console.log('Product: ', product);
        element.picURL = product.picURL;
        element.SN = product.SN;
        element.PN = product.PN;
        element.Price = product.Price;
        element.amount = 1;
        if (currentCart == undefined){
            currentCart = new Cart(user);
        }
        const checkIfCont = currentCart.contains(element.id);
        if (checkIfCont == -1){
            currentCart.add(element);
        } else {
            currentCart.incrimentAmount(checkIfCont);
        }
    };

    moreButtons.forEach((element)=>{
        element.addEventListener('click', addToChart);
    });
};

const printCart = (event) => {
    event.preventDefault();
    if (currentCart == undefined){
        window.alert('Cart is empty');
    } else {
        const msg = [];
        currentCart.get().forEach((product)=>{
            console.log('form alert msg', product);
            msg.push(`
            Item pic: ${product.picURL}\n
            Supplier’s Name: ${product.SN}\n
            Product Name: ${product.PN}\n
            Price: ${product.Price}\n
            Amount: ${product.amount}\n
            Id: ${product.id}
            `);
        });
        console.log('Msg string: ', msg.join('\n==========================\n'), '\nSum: ', currentCart.sum());
    }
};


const cartButton = document.querySelector('.o-car');

cartButton.addEventListener("click", printCart);

