class Cart {
    constructor(user){
        this._user = user;
        this._products = [];
    };  
};

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
        acc = acc + price;
    },0);
};

const addToChart = (event) => {
    const card = event.target.parentElement.parentElement;
    const element = new Object();
    element.picURL = card.querySelector('img').getAttribute('src');
    element.SN = card.querySelector('')
    element.PN
    element.Price
};

const moreButtons = document.querySelectorAll('.c-clothing__more')

if (document.querySelectorAll('.c-clothing__more').length>0){
    const moreButtons = document.querySelectorAll('.c-clothing__more');
} else if (document.querySelectorAll('.home__more').length>0) {
    const moreButtons = document.querySelectorAll('.home__more');
};

moreButtons.forEach((element)=>{

});