const products = [
    {
        picURL: "image_14.jpg",
        SN: "Supplier’s Name Here",
        PN: "Product Name Here",
        Price: "$29,354.75",
        Place: "big"
    },
    {
        picURL: "image_5.jpg",
        SN: "Supplier’s Name Here",
        PN: "Product Name Here",
        Price: "$29,354.75",
        Place: "big"
    },
    {
        picURL: "layer-32.jpg",
        SN: "Supplier’s Name Here",
        PN: "Product Name Here",
        Price: "$29,354.75",
        Place: "top"
    },
    {
        picURL: "2.jpg",
        SN: "Supplier’s Name Here",
        PN: "Product Name Here",
        Price: "$29,354.75",
        Place: "top"
    },
    {
        picURL: "layer-31.jpg",
        SN: "Supplier’s Name Here",
        PN: "Product Name Here",
        Price: "$29,354.75",
        Place: "top"
    },
    {
        picURL: "image_9.jpg",
        SN: "Supplier’s Name Here",
        PN: "Product Name Here",
        Price: "$29,354.75",
        Place: "default"
    },
    {
        picURL: "image_8.jpg",
        SN: "Supplier’s Name Here",
        PN: "Product Name Here",
        Price: "$29,354.75",
        Place: "default"
    },
    {
        picURL: "image_7.jpg",
        SN: "Supplier’s Name Here",
        PN: "Product Name Here",
        Price: "$29,354.75",
        Place: "default"
    },
    {
        picURL: "image_6.jpg",
        SN: "Supplier’s Name Here",
        PN: "Product Name Here",
        Price: "$29,354.75",
        Place: "default"
    },
    {
        picURL: "image_13.jpg",
        SN: "Supplier’s Name Here",
        PN: "Product Name Here",
        Price: "$29,354.75",
        Place: "default"
    },
    {
        picURL: "image_12.jpg",
        SN: "Supplier’s Name Here",
        PN: "Product Name Here",
        Price: "$29,354.75",
        Place: "default"
    },
    {
        picURL: "image_11.jpg",
        SN: "Supplier’s Name Here",
        PN: "Product Name Here",
        Price: "$29,354.75",
        Place: "default"
    },
    {
        picURL: "image_10.jpg",
        SN: "Supplier’s Name Here",
        PN: "Product Name Here",
        Price: "$29,354.75",
        Place: "default"
    },
    {
        picURL: "image_4.jpg",
        SN: "Supplier’s Name Here",
        PN: "Product Name Here",
        Price: "$29,354.75",
        Place: "default"
    },
    {
        picURL: "image_3.jpg",
        SN: "Supplier’s Name Here",
        PN: "Product Name Here",
        Price: "$29,354.75",
        Place: "default"
    },
    {
        picURL: "image_2.jpg",
        SN: "Supplier’s Name Here",
        PN: "Product Name Here",
        Price: "$29,354.75",
        Place: "default"
    },
    {
        picURL: "image.jpg",
        SN: "Supplier’s Name Here",
        PN: "Product Name Here",
        Price: "$29,354.75",
        Place: "default"
    }
]




const genIndex = (base) => Math.floor(base*Math.random());

const cards = document.querySelectorAll(".home__card"),
    template = document.querySelector(".product-card");

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
    console.log("Текущее состояние списка товаров:", products);
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
