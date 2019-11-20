import {renderProd} from "./renderProducts.js";
import {getData} from "./requestData.js";

const HOSTNAME = 'http://localhost:3000/';
import {addCartListeners} from './cart.js';

const rerenderContent = () =>{
    if (location.href == HOSTNAME){
        const url = 'http://localhost:3000/api/products.json';
        getData(url,(products) => {
            const template = document.querySelector(".product-card");
            const wrapperTemplate = document.querySelector('.home-wrapper-template');
            renderProd(template, wrapperTemplate, "home__card",products);
            addCartListeners();
        } );
    } else {
        const urlParse = location.href.split('/'),
            categoryName = urlParse[urlParse.length-1].slice(1);

        const subcatUrl = `http://localhost:3000/api/${categoryName}Content.json`;
        getData(subcatUrl,(products)=>{
            const template = document.querySelector(".template-category-card");
            const wrapperTemplate = document.querySelector('.template-category');
            renderProd(template,wrapperTemplate, "c-clothing__card",products);
            addCartListeners();
        });
    }
};

window.onload = () => {
    rerenderContent();
};

window.onpopstate = () => {
    rerenderContent();
};