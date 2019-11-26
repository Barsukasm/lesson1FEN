import {Cart} from "./cart.js";
import {toCheckOut,paymentTemplate, renderPayment} from './paymentRenderer.js';
import {getShippingPrice} from "./requestData.js";
import {CARTURL, PAYTURL} from "./URLWatch.js";

const cartTemplate = document.querySelector('.cart-wrapper-template'),
    user = "user-placeholder";




export const renderCart = (wrapperTemplate) => {
    const curCart = JSON.parse(localStorage.getItem('cart'));
    if (curCart!=null) Object.setPrototypeOf(curCart, Cart.prototype);

    const renderRow = (row, product) => {
        const deleteItem = row.querySelector('.o-remove-item'),
            rowImage = row.querySelector('.o-detail-image'),
            rowPN = row.querySelector('.o-product'),
            rowSN =  row.querySelector('.o-supplier'),
            rowPrice = row.querySelector('.o-price'),
            rowQTY = row.querySelector('.o-qty__input'),
            rowSum = row.querySelector('.o-sum'), 
            price = parseFloat(product.Price.split(',').join("").slice(1));
        if (rowImage!=null) rowImage.setAttribute("src",`assets/${product.picURL}`);
        if (rowPN!=null) rowPN.innerText = product.SN;
        if (rowSN!=null) rowSN.innerText = product.PN;
        if (rowPrice!=null) rowPrice.innerText = product.Price;
        if (rowQTY!=null) {
            rowQTY.value = product.amount;
            rowQTY.addEventListener('input', event => {
                curCart.setAmount(product.id,rowQTY.value);
                smallCartUpdate();
            });
        }
        if (rowSum!=null) rowSum.innerText = product.amount*price;
        if (deleteItem!=null) deleteItem.addEventListener('click', (event) => {
            curCart.remove(product.id);
            renderCart(wrapperTemplate);
            smallCartUpdate();
        });
    };

    if (wrapperTemplate!="mini"){
        const outerWrapper = document.querySelector('.outer-wrapper');

        if(outerWrapper.querySelector('.wrapper')!=null){
            outerWrapper.removeChild(outerWrapper.querySelector('.wrapper'));
        }

        if(outerWrapper.querySelector('.wrapper-pay')!=null){
            outerWrapper.removeChild(outerWrapper.querySelector('.wrapper-pay'));
        }

        if (outerWrapper.querySelector('.wrapper-cart') == null){
            outerWrapper.appendChild(document.importNode(wrapperTemplate.content,true));
        } else {
            outerWrapper.removeChild(outerWrapper.querySelector('.wrapper-cart'));
            outerWrapper.appendChild(document.importNode(wrapperTemplate.content,true));
        }

        const rowTemplate = document.querySelector('.cart-row-template');

        const cartTable = document.querySelector('.c-cart-table');
        if (curCart!=null&&curCart.totalAmount()>0){
            curCart._products.forEach((product)=>{
                cartTable.appendChild(document.importNode(rowTemplate.content,true));
                const rows = cartTable.querySelectorAll('tr');
                const row = rows[rows.length-1];
                renderRow(row, product);
            });
        }
        
        document.querySelector('.o-checkout-button').addEventListener('click', toCheckOut);
        const subtotal = document.querySelectorAll('.c-resulting-sum')[0].querySelector('.o-subtotal__sum');
        const shipping = document.querySelectorAll('.c-resulting-sum')[1].querySelector('.o-subtotal__sum');
        subtotal.innerText = `$${(curCart!=null)?curCart.sum():0}`;
        shipping.innerText = `$${getShippingPrice()}`;
        document.querySelector('.o-total-amount__sum').innerText = `$${(curCart!=null)?curCart.fullPrice(getShippingPrice()):0}`;
    } else if (wrapperTemplate == "mini") {
        const rowTemplate = document.querySelector('.template-cart-mini');
        const cartTable = document.querySelector('.c-cart-table');
        if (curCart!=null){
            curCart._products.forEach((product)=>{
                cartTable.appendChild(document.importNode(rowTemplate.content,true));
                const rows = cartTable.querySelectorAll('tr');
                const row = rows[rows.length-1];
                renderRow(row, product);
            });
            const payButton = document.querySelector('.o-pay-button');
            payButton.innerText = `Pay $${curCart.fullPrice(getShippingPrice())}`;
        }
    }

    
};

export const cartUpdate = (event) => {
    if (event.key == 'cart'){
        switch (location.href) {
            case CARTURL: {
                renderCart(cartTemplate);
                break;
            }
            case PAYTURL: {
                renderPayment(paymentTemplate);
                break;
            }
            default: {break;}
        }
        smallCartUpdate();
    }
};

export const smallCartUpdate = () =>{
    const curCart = JSON.parse(localStorage.getItem('cart'));
    const cartButton = document.querySelector('.o-car');
    if (curCart!=null) {
        Object.setPrototypeOf(curCart, Cart.prototype);
        if (cartButton.querySelector('.o-popup')==null){
            const popup = document.createElement('div');
            popup.classList.add('o-popup');
            if(curCart.totalAmount()>0){
                popup.innerText = curCart.totalAmount();
                cartButton.appendChild(popup);
            }
        } else{
            const popup = cartButton.querySelector('.o-popup');
            if(curCart.totalAmount()>0){
                popup.innerText = curCart.totalAmount();
            } else {
                cartButton.removeChild(popup);
            }
        }
    } else {
        const popup = cartButton.querySelector('.o-popup');
        if (popup!=null){
            cartButton.removeChild(popup);
        }
    }
};

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
        let currentCart;
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
        smallCartUpdate();
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