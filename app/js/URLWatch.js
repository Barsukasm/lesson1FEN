import {renderProd} from "./renderProducts.js";
import {getData} from "./requestData.js";
import {addCartListeners, cartUpdate,printCart} from './cart.js';
import {hoverMenu, toIndexHtml} from "./menu.js";

const HOSTNAME = 'http://localhost:3000/';

const rerenderContent = () =>{
    if (location.href == HOSTNAME){
        const url = 'http://localhost:3000/api/products.json';
        getData(url,(products) => {
            const template = document.querySelector(".product-card");
            const wrapperTemplate = document.querySelector('.home-wrapper-template');
            renderProd(template, wrapperTemplate, "home__card",[...products]);
            addCartListeners(products);
            const cartButton = document.querySelector('.o-car');
            cartButton.addEventListener("click", printCart);
        } );
    } else {
        const urlParse = location.href.split('/'),
            categoryName = urlParse[urlParse.length-1].slice(1);

        const subcatUrl = `http://localhost:3000/api/${categoryName}Content.json`;
        getData(subcatUrl,(products)=>{
            const template = document.querySelector(".template-category-card");
            const wrapperTemplate = document.querySelector('.template-category');
            renderProd(template,wrapperTemplate, "c-clothing__card",[...products]);
            addCartListeners(products);
            const cartButton = document.querySelector('.o-car');
            cartButton.addEventListener("click", printCart);
        });
    }
};

window.onload = () => {
    const urlMenu = 'http://localhost:3000/api/menuContent.json';

    document.querySelector('.o-logo').addEventListener('click',toIndexHtml);

    const menus = document.querySelectorAll(".c-navbar__item");

    window.addEventListener('storage',cartUpdate,false);

    getData(urlMenu, (menuContent) =>{
        hoverMenu(menus, menuContent);
    });
    rerenderContent();
};

window.onpopstate = () => {
    rerenderContent();
};



