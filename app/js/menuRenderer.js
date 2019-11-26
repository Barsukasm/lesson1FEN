const menuTemplate = document.querySelector(".menu-template");

import {genIndex, renderProd} from './renderProducts.js';
import { getData } from './requestData.js';
import {addCartListeners} from './cartRenderer.js';

const travel = (event) => {
    event.preventDefault();
    history.pushState(null,null,`/#${event.target.innerText}`);
    const subcatUrl = `http://localhost:3000/api/${event.target.innerText}Content.json`;
	getData(subcatUrl)
	.then((products)=>{
        const template = document.querySelector(".template-category-card");
        const wrapperTemplate = document.querySelector('.template-category');
        console.log(event.target.innerText, "menu", products);
		renderProd(template,wrapperTemplate, "c-clothing__card",[...products]);
        addCartListeners(products);
    });
};

const addSubcat = (subcat, element) => {
	const subcategory = document.createElement("a");
	subcategory.setAttribute("class","menu__item");
	subcategory.setAttribute("href",`${element.link}`);
    subcategory.innerText = `${element.name + genIndex(2)}`;
    subcategory.addEventListener('click', travel);
	subcat.appendChild(subcategory);
};



export const renderMenus = (menu, shift, menuContent, index) => {
	menu.appendChild(document.importNode(menuTemplate.content, true));
	const menuHeadingText = menu.querySelector(".menu__main"),
		menuBody = menu.querySelector(".menu"),	
		menuSubcats = menu.querySelectorAll(".menu__subcats");
    let subcatsWidth = [0, 0, 0];
	menuHeadingText.innerText = menuContent.heading;
	menuContent.subcats.forEach((element)=>{
		if(menuSubcats[0].querySelectorAll(".menu__item").length<8){
			addSubcat(menuSubcats[0], element);
			if (element.name.length>subcatsWidth[0]) subcatsWidth[0] = element.name.length;
		} else if(menuSubcats[1].querySelectorAll(".menu__item").length<8){
			addSubcat(menuSubcats[1], element);
			if (element.name.length>subcatsWidth[1]) subcatsWidth[1] = element.name.length;
		} else if (menuSubcats[2].querySelectorAll(".menu__item").length<8){
			addSubcat(menuSubcats[2], element);
			if (element.name.length>subcatsWidth[2]) subcatsWidth[2] = element.name.length;
		} else {
			//console.log ("Cannot visualise element: ", element.name, ",in menu item: ",menu.innerText);
		}
	});

	menuBody.style.width = `calc(3rem + ${subcatsWidth.reduce((acc, cur) => cur>0? acc +1: acc, 0)}*3rem + ${subcatsWidth.reduce((acc, cur) => acc + cur, 0)}*7.75px)`;
	menuBody.style.left = `calc((100% - 84.1rem) / 2 + ${shift}px + 3rem*${index})`;	
};