const elements = document.querySelectorAll("*");

import {genIndex} from './renderProducts.js';

const elIndex = genIndex(elements.length);
const indexChanged = [elIndex];

const genColor = () =>`rgb(${Math.random()*256},${Math.random()*256},${Math.random()*256}`;

elements[elIndex].style.backgroundColor = genColor();

const firstInterval = setInterval(()=>{
    const indexChange = genIndex(elements.length);
    indexChanged.push(indexChange);
    elements[indexChange].style.backgroundColor = genColor();
},200);


const secondInterval = setInterval(()=>{
    if (indexChanged.length >0){
        const indexDefault = genIndex(indexChanged.length);
        elements[indexChanged.splice(indexDefault,1)].style.backgroundColor="";
    }
}, 400)
