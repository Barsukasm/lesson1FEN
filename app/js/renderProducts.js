export const genIndex = (base) => Math.floor(base*Math.random());

import {getData} from './requestData.js';


const HOSTNAME = 'http://localhost:3000/';



export const renderProd = (template, wrapperTemplate, cardTemplate, products) => {
    const outerWrapper = document.querySelector('.outer-wrapper'),
        initialProductsLength = products.length;

    if (outerWrapper.querySelector('.wrapper') == null){
        outerWrapper.appendChild(document.importNode(wrapperTemplate.content,true));
    } else {
        outerWrapper.removeChild(outerWrapper.querySelector('.wrapper'));
        outerWrapper.appendChild(document.importNode(wrapperTemplate.content,true));
    }
    const cards = document.querySelectorAll(`.${cardTemplate}`);

    const placeProduct = (element, type) => {
        let fittingProducts;
        if (products[0].hasOwnProperty('Place')){
            fittingProducts = products.filter(product=>product.Place == type);
        } else {
            fittingProducts = products;
        }
        const placeToAdd = fittingProducts[genIndex(fittingProducts.length)],
            productImage = element.querySelector("img"),
            supplierName = element.querySelector(".card__sup"),
            productName = element.querySelector(".card__prod"),
            price = element.querySelector(".card__price");
        productImage.setAttribute("src",`assets/${placeToAdd.picURL}`);
        supplierName.innerText = `${placeToAdd.SN}`;
        productName.innerText = `${placeToAdd.PN}`;
        price.innerText = `${placeToAdd.Price}`;
        products.splice(products.indexOf(placeToAdd),1);
    };

    let cardIndex = 0;
    cards.forEach(element=>{
        if (products.length>0 && cardIndex<=initialProductsLength) {
            element.appendChild(document.importNode(template.content, true));
            if (element.classList.contains("top-card")){
                placeProduct(element, "top");
            } else if (element.classList.contains("big-pic")){
                placeProduct(element,"big");
            }else{
                placeProduct(element,"default");
            }
            cardIndex++;
        }
    });
};


const rerenderContent = () =>{
    if (location.href == HOSTNAME){
        const url = 'http://localhost:3000/api/products.json';
        getData(url,(products) => {
            const template = document.querySelector(".product-card");
            const wrapperTemplate = document.querySelector('.home-wrapper-template');
            renderProd(template, wrapperTemplate, "home__card",products);
        } );
    } else {
        const urlParse = location.href.split('/'),
            categoryName = urlParse[urlParse.length-1].slice(1);

        const subcatUrl = `http://localhost:3000/api/${categoryName}Content.json`;
        getData(subcatUrl,(products)=>{
            const template = document.querySelector(".template-category-card");
            const wrapperTemplate = document.querySelector('.template-category');
            console.log(event.target.innerText, "menu", products);
            renderProd(template,wrapperTemplate, "c-clothing__card",products);
        });
    }
};

window.onload = () => {
    rerenderContent();
};

window.onpopstate = () => {
    rerenderContent();
};