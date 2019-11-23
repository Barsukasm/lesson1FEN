import {renderProd} from "./renderProducts.js";
import {getData} from "./requestData.js";
import {addCartListeners, cartUpdate, printCart} from './cart.js';
import {renderCart} from './cartRenderer.js';
import {hoverMenu, toIndexHtml} from "./menu.js";
import {shippingTemplate, paymentTemplate, renderPayment} from './paymentRenderer.js';

const cartTemplate = document.querySelector('.cart-wrapper-template');

const HOSTNAME = 'http://localhost:3000/';
const CARTURL = 'http://localhost:3000/#Cart';
const SHIPURL = 'http://localhost:3000/#Shipping';
const PAYTURL = 'http://localhost:3000/#Payment';

const requestContent = (url) => {
    getData(url)
    .then((products) => {
        const template = document.querySelector(".product-card");
        const wrapperTemplate = document.querySelector('.home-wrapper-template');
        renderProd(template, wrapperTemplate, "home__card",[...products]);
        addCartListeners(products);
        const cartButton = document.querySelector('.o-car');
        cartButton.addEventListener("click", printCart);
    })
    .catch(error=>{
        console.log('Error in home render: ', error);
    });
};

const rerenderContent = () =>{
    let url;
    switch (location.href){
        case HOSTNAME:{
            url = 'http://localhost:3000/api/products.json';
            requestContent(url);
            break;
        }
        case CARTURL:{
            renderCart(cartTemplate);
            break;
        }
        case SHIPURL:{
            renderPayment(shippingTemplate);
            break;
        }
        case PAYTURL:{
            renderPayment(paymentTemplate);
            break;
        }
        default:{
            const urlParse = location.href.split('/'),
                categoryName = urlParse[urlParse.length-1].slice(1);
            url = `http://localhost:3000/api/${categoryName}Content.json`;
            requestContent(url);          
            break;
        }
    }
};

window.onload = () => {
    const urlMenu = 'http://localhost:3000/api/menuContent.json';

    document.querySelector('.o-logo').addEventListener('click',toIndexHtml);

    const menus = document.querySelectorAll(".c-navbar__item");

    window.addEventListener('storage',cartUpdate,false);

    getData(urlMenu)
    .then((menuContent) =>{
        hoverMenu(menus, menuContent);
    });
    rerenderContent();
};

window.onpopstate = () => {
    rerenderContent();
};



