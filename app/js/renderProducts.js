export const genIndex = (base) => Math.floor(base*Math.random());

import {getData} from './requestData.js';

const url = 'http://localhost:3000/api/products.json';




export const renderProd = (template, wrapperTemplate, cardTemplate, products) => {
    const outerWrapper = document.querySelector('.outer-wrapper');
    if (outerWrapper.querySelector('.wrapper') == null){
        outerWrapper.appendChild(document.importNode(wrapperTemplate.content,true));
    } else {
        outerWrapper.removeChild(outerWrapper.querySelector('.wrapper'));
        outerWrapper.appendChild(document.importNode(wrapperTemplate.content,true));
    }
    const cards = document.querySelectorAll(`.${cardTemplate}`);

    const placeProduct = (element, type) => {
        const fittingProducts = products.filter(product=>product.Place == type),
            placeToAdd = fittingProducts[genIndex(fittingProducts.length)],
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

    cards.forEach(element=>{
        element.appendChild(document.importNode(template.content, true));
        if (element.classList.contains("top-card")){
            placeProduct(element, "top");
        } else if (element.classList.contains("big-pic")){
            placeProduct(element,"big");
        }else{
            placeProduct(element,"default");
        }
    });
};



getData(url,(products) => {
    const template = document.querySelector(".product-card");
    const wrapperTemplate = document.querySelector('.home-wrapper-template');
    renderProd(template, wrapperTemplate, "home__card",products);
} );

