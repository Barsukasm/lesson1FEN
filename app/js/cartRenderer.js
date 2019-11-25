import {Cart} from "./cart.js";
import {toCheckOut} from './paymentRenderer.js';

export const renderCart = (wrapperTemplate) => {
    const curCart = JSON.parse(localStorage.getItem('cart'));
    Object.setPrototypeOf(curCart, Cart.prototype);

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
            rowQTY.addEventListener('change', event => curCart.setAmount(product.id,rowQTY.value));
        }
        if (rowSum!=null) rowSum.innerText = product.amount*price;
        if (deleteItem!=null) deleteItem.addEventListener('click', (event) => {
            curCart.remove(product.id);
            renderCart(wrapperTemplate);
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
        if (curCart!=null){
            curCart._products.forEach((product)=>{
                cartTable.appendChild(document.importNode(rowTemplate.content,true));
                const rows = cartTable.querySelectorAll('tr');
                const row = rows[rows.length-1];
                console.log('Product: ', product, 'Row: ', row);
                renderRow(row, product);
            });
        }
        
        document.querySelector('.o-checkout-button').addEventListener('click', toCheckOut);
        document.querySelector('.o-total-amount__sum').innerText = `$${curCart.sum()}`;
    } else if (wrapperTemplate == "mini") {
        const rowTemplate = document.querySelector('.template-cart-mini');
        const cartTable = document.querySelector('.c-cart-table');
        if (curCart!=null){
            curCart._products.forEach((product)=>{
                cartTable.appendChild(document.importNode(rowTemplate.content,true));
                const rows = cartTable.querySelectorAll('tr');
                const row = rows[rows.length-1];
                console.log('Product: ', product, 'Row: ', row);
                renderRow(row, product);
            });
            const payButton = document.querySelector('.o-pay-button');
            payButton.innerText = `Pay $${curCart.sum()}`;
        }
    }

    
};
