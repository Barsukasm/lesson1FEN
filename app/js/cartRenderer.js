import {Cart} from "./cart.js";

export const renderCart = (wrapperTemplate) => {
    const outerWrapper = document.querySelector('.outer-wrapper');

    if (outerWrapper.querySelector('.wrapper') == null){
        outerWrapper.appendChild(document.importNode(wrapperTemplate.content,true));
    } else {
        outerWrapper.removeChild(outerWrapper.querySelector('.wrapper'));
        outerWrapper.appendChild(document.importNode(wrapperTemplate.content,true));
    }

    const curCart = JSON.parse(localStorage.getItem('cart'));
    Object.setPrototypeOf(curCart, Cart.prototype);

    const renderRow = (row, product) => {

    };

    const rowTemplate = document.querySelector('.cart-row-template');

    const cartTable = document.querySelector('.cart');
    curCart._products.forEach((product)=>{
        const row = cartTable.appendChild(document.importNode(rowTemplate.content,true));
        renderRow(row, product);
    });
};
