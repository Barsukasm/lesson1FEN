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


let currentCart;

Cart.prototype.contains = function (product) {
    return this._products.some((element) => {
       if (element.picURL == product.picURL && element.SN == product.SN && element.PN == product.PN && element.Price == product.Price){
           return true;
       }
       return false;
    });
};

const addToChart = (event) => {
    const card = event.currentTarget.parentElement.parentElement;
    console.log('Parent element: ', card);
    const element = new Object();
    element.picURL = card.querySelector('img').getAttribute('src');
    element.SN = card.querySelector('.card__sup').innerText;
    element.PN = card.querySelector('.card__prod').innerText;
    element.Price = card.querySelector('.card__price').innerText;
    if (currentCart == undefined){
        currentCart = new Cart(user);
    }
    if (!currentCart.contains(element)){
        currentCart.add(element);
    }
};

export const addCartListeners = () => {
    let moreButtons;

    if (document.querySelectorAll('.c-clothing__more').length>0){
        moreButtons = document.querySelectorAll('.c-clothing__more');
    } else if (document.querySelectorAll('.home__more').length>0) {
        moreButtons = document.querySelectorAll('.home__more');
    }

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
            msg.push(`
            Item pic: ${product.picURL}\n
            Item pic: ${product.SN}\n
            Item pic: ${product.PN}\n
            Item pic: ${product.Price}\n
            `);
        });
        window.alert(`${msg.join('\n==========================\n')} \nSum: ${currentCart.sum()}`);
    }
};


const cartButton = document.querySelector('.o-car');

cartButton.addEventListener("click", printCart);

