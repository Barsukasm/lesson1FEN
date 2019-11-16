import {renderMenus} from './menuRenderer.js';
import { getData } from './requestData.js';
import {renderProd} from './renderProducts.js';

const url = 'http://localhost:3000/api/menuContent.json';

const menus = document.querySelectorAll(".c-navbar__item");

const showMenu = function (event) {
	const menuObj = event.target.querySelector(".menu").classList;
	if (menuObj.contains("menu_hidden")) menuObj.remove("menu_hidden");
};

const hideMenu = function (event) {	
	const menuObj = event.target.querySelector(".menu").classList;
	if(!menuObj.contains("menu_hidden")) menuObj.add("menu_hidden");
};


const hoverMenu = (menus, menuContent) => {
	let shift = 0, indexMenus = 0;

	menus.forEach(element => {
		renderMenus(element, shift, menuContent[indexMenus],indexMenus++);
		shift = shift + element.offsetWidth;
		element.addEventListener("mouseenter", showMenu);
		element.addEventListener("mouseleave", hideMenu);
	});
};

const toIndexHtml = (event) =>{
	history.pushState(null,null,'/');
	const homeDataUrl = 'http://localhost:3000/api/products.json';
	getData(homeDataUrl,(products) => {
		const template = document.querySelector(".product-card");
		const wrapperTemplate = document.querySelector('.home-wrapper-template');
		renderProd(template,wrapperTemplate, "home__card",products);
	} );
};

document.querySelector('.o-logo').addEventListener('click',toIndexHtml);

getData(url, (menuContent) =>{
	hoverMenu(menus, menuContent);
});
