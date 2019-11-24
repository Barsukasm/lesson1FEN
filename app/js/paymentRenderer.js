import {renderCart} from './cartRenderer.js';
import {printCart} from "./cart.js";
import {ShippingInfo} from "./shippingInfo.js";
import {toIndexHtml} from "./menu.js";

let userInfo = new ShippingInfo();

export const shippingTemplate = document.querySelector('.template-shipping'), 
    paymentTemplate = document.querySelector('.template-payment'),
    congratsTemplate = document.querySelector('.template-congrats');

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

    if (document.querySelectorAll('.oper').length!=0){
        document.querySelectorAll('.oper')[0].setAttribute('href',`${location.origin}/#Shipping`);
        document.querySelectorAll('.oper')[1].setAttribute('href',`${location.origin}/#Payment`);
    }


    if (location.href == `${location.origin}/#Shipping`){

        checkShippingInfo();
        const backButton = document.querySelector('.o-to-cart');
        backButton.addEventListener('click', saveShippingInfo);
        backButton.addEventListener('click', printCart);
        const nextButton = document.querySelector('.o-to-payment');
        nextButton.addEventListener('click', saveShippingInfo);
        nextButton.addEventListener('click', toPayment);
    }

    if (location.href == `${location.origin}/#Payment`){
        renderCart('mini');
        const backButton = document.querySelector('.o-to-ship');
        backButton.addEventListener('click', toCheckOut);
        const nextButton = document.querySelector('.o-pay-button');
        nextButton.addEventListener('click', toCongrats);
    }

    if (location.href == `${location.origin}/#Finished`){
        const back = document.querySelector('.back-to-shopping').querySelector('.o-button');
        back.addEventListener('click',toIndexHtml);
    }
    
};

export const toCheckOut = (event) => {
    event.preventDefault();
    history.pushState(null,null,`/#Shipping`);
    renderPayment(shippingTemplate);
};

const toPayment = (event) => {
    event.preventDefault();
    history.pushState(null,null,`/#Payment`);
    renderPayment(paymentTemplate);
};

const toCongrats = (event) => {
    event.preventDefault();
    history.pushState(null,null,`/#Finished`);
    renderPayment(congratsTemplate);
};

const saveShippingInfo = (event) => {
    const form = document.querySelector('.operation-card'),
        fields = form.querySelectorAll('.ship-a__field'),
        field2 = form.querySelector('.ship-a__field-2');

    fields.forEach(field => {
        const label = field.querySelector('.ship-a__p'),
            input = field.querySelector('.o-input');
        userInfo.setField(label.innerText, input.value);
    });

    const field2Label = field2.querySelector('.ship-a__p'),
        field2input = field2.querySelector('.o-input');
    userInfo.setField(field2Label.innerText, field2input.value);
};

const checkShippingInfo = () => {
    const form = document.querySelector('.operation-card'),
        fields = form.querySelectorAll('.ship-a__field'),
        field2 = form.querySelector('.ship-a__field-2');

    fields.forEach(field => {
        const label = field.querySelector('.ship-a__p'),
            input = field.querySelector('.o-input'),
            val = userInfo.getField(label.innerText);
        if (val != null){
            input.value = val;
        }
    });

    const field2Label = field2.querySelector('.ship-a__p'),
        field2input = field2.querySelector('.o-input'),
        val2 = userInfo.getField(field2Label.innerText);
    if (val2 != null){
        field2input.value = val2;
    }
};
