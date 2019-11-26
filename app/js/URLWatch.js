import {renderProd} from "./renderProducts.js";
import {getData} from "./requestData.js";
import {renderCart,cartUpdate, smallCartUpdate, addCartListeners} from './cartRenderer.js';
import {hoverMenu, toIndexHtml} from "./menu.js";
import {shippingTemplate, paymentTemplate, renderPayment,congratsTemplate} from './paymentRenderer.js';
import {toFav} from "./fav.js";

const cartTemplate = document.querySelector('.cart-wrapper-template');

export const HOSTNAME = 'http://localhost:3000/',
    CARTURL = 'http://localhost:3000/#Cart',
    SHIPURL = 'http://localhost:3000/#Shipping',
    PAYTURL = 'http://localhost:3000/#Payment',
    FINISHED = 'http://localhost:3000/#Finished';

const requestContent = (url) => {
    getData(url)
    .then((products) => {
        const template = document.querySelector(".product-card");
        const wrapperTemplate = document.querySelector('.home-wrapper-template');
        renderProd(template, wrapperTemplate, "home__card",[...products]);
        addCartListeners(products);
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
        case FINISHED:{
            renderPayment(congratsTemplate);
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

window.addEventListener('storage',cartUpdate,false);

window.onload = () => {
    const urlMenu = 'http://localhost:3000/api/menuContent.json';

    document.querySelector('.o-logo').addEventListener('click',toIndexHtml);

    const menus = document.querySelectorAll(".c-navbar__item");

    const cartButton = document.querySelector('.o-car');
    cartButton.addEventListener("click", (event)=>{
        event.preventDefault();
        if (location.href != SHIPURL && location.href != PAYTURL){
            history.pushState(null,null,`/#Cart`);
            renderCart(cartTemplate);
        }
    });

    smallCartUpdate();

    const favButton = document.querySelector('.o-fav');
    favButton.addEventListener("click", toFav);

    getData(urlMenu)
    .then((menuContent) =>{
        hoverMenu(menus, menuContent);
    });
    rerenderContent();
};

window.onpopstate = () => {
    rerenderContent();
};



