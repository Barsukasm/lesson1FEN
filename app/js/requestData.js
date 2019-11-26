import {genIndex} from "./renderProducts.js";

const STATUS = {
    OK: 200,
};

const TIMEOUT = 6000,
    SHIPPINGCOST = 5+genIndex(5);

export const getData = (url) => {

    return new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status == STATUS.OK && xhr.readyState == XMLHttpRequest.DONE) {
                resolve(JSON.parse(xhr.responseText));  
            } else {
                reject(xhr.status);
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    });
    
    
};

export const proceedPaymentInfo = () =>{
    return new Promise((resolve,reject) => {
        if (TIMEOUT>=0){
            setTimeout(()=>{
                resolve('successful');
            },TIMEOUT);
        } else {
            reject('error in proceedPaymentInfo');
        }
    });
};

export const getShippingPrice = () => {
    return SHIPPINGCOST;
};