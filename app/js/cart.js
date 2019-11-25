import {renderCart} from './cartRenderer.js';
import {SHIPURL, PAYTURL} from "./URLWatch.js";
const cartTemplate = document.querySelector('.cart-wrapper-template'),
    user = "user-placeholder";
let currentCart;

export class Cart {
    constructor(user){
        this._user = user;
        this._products = [];
        localStorage.setItem('cart', JSON.stringify(this));
    };  
}

Cart.prototype.add = function (product) {
    this._products.push(product);
    localStorage.setItem('cart',JSON.stringify(this));
};

Cart.prototype.remove = function(id){
    this._products = this._products.filter(product => product.id != id);
    localStorage.setItem('cart',JSON.stringify(this));
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

Cart.prototype.incrementAmount = function (index) {
    this._products[index].amount += 1;
    localStorage.setItem('cart',JSON.stringify(this));
};

Cart.prototype.contains = function (productId) {
    return this._products.findIndex((element)=>{
        if (element.id == productId) {
            return true;
        } else {
            return false;
        }
    });
};

Cart.prototype.setAmount = function (id, amount) {
    this._products.forEach(element => {
        if (element.id==id){
            element.amount = amount;
        }
    });
    localStorage.setItem('cart',JSON.stringify(this));
}

export const addCartListeners = (products) => {
    const moreButtons = document.querySelectorAll('.home__more');

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
        element.picURL = product.picURL;
        element.SN = product.SN;
        element.PN = product.PN;
        element.Price = product.Price;
        element.amount = 1;
        if (currentCart == undefined){
            currentCart = JSON.parse(localStorage.getItem('cart'));
            if (currentCart==null) {
                currentCart = new Cart(user);
            } else {
                Object.setPrototypeOf(currentCart, Cart.prototype);
            }
        }
        const checkIfCont = currentCart.contains(element.id);
        if (checkIfCont == -1){
            currentCart.add(element);
        } else {
            currentCart.incrementAmount(checkIfCont);
        }
    };

    moreButtons.forEach((element)=>{
        element.addEventListener('click', addToChart);
    });
};



export const printCart = (event) => {
    event.preventDefault();
    history.pushState(null,null,`/#Cart`);
    renderCart(cartTemplate);
};



export const cartUpdate = (event) => {
    if (event.key == 'cart'){
        currentCart = JSON.parse(localStorage.getItem('cart'));
        Object.setPrototypeOf(currentCart, Cart.prototype);
    }
    const cartButton = document.querySelector('.o-car');
    if (cartButton.querySelector('.o-popup')==null){
        const popup = document.createElement('div');
        popup.classList.add('o-popup');
        if(currentCart.sum()>0){
            popup.innerText = currentCart.sum();
            cartButton.appendChild(popup);
        }
    } else{
        if(currentCart.sum()>0){
            cartButton.appendChild(popup);
        }
    }
};



