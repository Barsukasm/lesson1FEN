import {renderCart} from './cartRenderer.js';

export const shippingTemplate = document.querySelector('.template-shipping'), 
    paymentTemplate = document.querySelector('.template-payment');

export const renderPayment = (wrapperTemplate) => {
    const outerWrapper = document.querySelector('.outer-wrapper');

    if(outerWrapper.querySelector('.wrapper')!=null){
        outerWrapper.removeChild(outerWrapper.querySelector('.wrapper'));
    }

    if(outerWrapper.querySelector('.wrapper-cart')!=null){
        outerWrapper.removeChild(outerWrapper.querySelector('.wrapper-cart'));
    }

    if (outerWrapper.querySelector('.wrapper-pay') == null){
        outerWrapper.appendChild(document.importNode(wrapperTemplate.content,true));
    } else {
        outerWrapper.removeChild(outerWrapper.querySelector('.wrapper-pay'));
        outerWrapper.appendChild(document.importNode(wrapperTemplate.content,true));
    }

    document.querySelectorAll('.oper')[0].setAttribute('href',`${location.origin}/#Shipping`);
    document.querySelectorAll('.oper')[1].setAttribute('href',`${location.origin}/#Payment`);

    if (location.href == `${location.origin}/#Shipping`){
        //save data inserted by user
    }

    if (location.href == `${location.origin}/#Payment`){
        renderCart('mini');
    }
    
};

export const toCheckOut = (event) => {
    event.preventDefault();
    history.pushState(null,null,`/#Shipping`);
    renderPayment(shippingTemplate);
};