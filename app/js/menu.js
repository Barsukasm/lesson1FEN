import {renderMenus} from './menuRenderer.js';
import { getData } from './requestData.js';
import {renderProd} from './renderProducts.js';
import {addCartListeners} from "./cart.js";



const showMenu = function (event) {
	const menuObj = event.target.querySelector(".menu").classList;
	if (menuObj.contains("menu_hidden")) menuObj.remove("menu_hidden");
};

const hideMenu = function (event) {	
	const menuObj = event.target.querySelector(".menu").classList;
	if(!menuObj.contains("menu_hidden")) menuObj.add("menu_hidden");
};


export const hoverMenu = (menus, menuContent) => {
	let shift = 0, indexMenus = 0;

	menus.forEach(element => {
		renderMenus(element, shift, menuContent[indexMenus],indexMenus++);
		shift = shift + element.offsetWidth;
		element.addEventListener("mouseenter", showMenu);
		element.addEventListener("mouseleave", hideMenu);
	});
};

export const toIndexHtml = (event) =>{
	history.pushState(null,null,'/');
	const homeDataUrl = 'http://localhost:3000/api/products.json';
	getData(homeDataUrl,(products) => {
		const template = document.querySelector(".product-card");
		const wrapperTemplate = document.querySelector('.home-wrapper-template');
		renderProd(template,wrapperTemplate, "home__card",[...products]);
		addCartListeners(products);
	} );
	console.log('Event "toIndexHtml" fired!');
};

