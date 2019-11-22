export const genIndex = (base) => Math.floor(base*Math.random());

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
        const placeToAdd = fittingProducts[0],
            productImage = element.querySelector("img"),
            supplierName = element.querySelector(".card__sup"),
            productName = element.querySelector(".card__prod"),
            price = element.querySelector(".card__price"),
            moreButton = element.querySelector('.home__more');
        if (type == "big") productImage.classList.add("home-image_big");
        if (type == "default") productImage.classList.add("home-image_small");
        productImage.setAttribute("src",`assets/${placeToAdd.picURL}`);
        supplierName.innerText = `${placeToAdd.SN}`;
        productName.innerText = `${placeToAdd.PN}`;
        moreButton.dataset.id = `${placeToAdd.id}`;
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
