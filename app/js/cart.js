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

Cart.prototype.fullPrice = function(ship){
    return this.sum() + ship;
};

Cart.prototype.incrementAmount = function (index) {
    this._products[index].amount += 1;
    localStorage.setItem('cart',JSON.stringify(this));
};

Cart.prototype.contains = function (productId) {
    return this._products.findIndex((element)=>{
        return element.id == productId;
    });
};

Cart.prototype.setAmount = function (id, amount) {
    this._products.forEach(element => {
        if (element.id==id){
            element.amount = amount;
        }
    });
    localStorage.setItem('cart',JSON.stringify(this));
};

Cart.prototype.totalAmount = function () {
    return this._products.reduce((acc,cur)=>{
        return  acc + parseInt(cur.amount);
    },0);
};