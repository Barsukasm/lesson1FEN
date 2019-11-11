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

const cardTemplates = document.querySelectorAll(".product-card");

cardTemplates.forEach(element=>{
    const card = document.querySelector(".home__card");
    if (card.classList.contains("top-card")){
        const fittingProducts = products.filter(product=>product.Place == "top");
        const placeToAdd = fittingProducts[genIndex(fittingProducts.length)];
    } else if (card.classList.contains("big-pic")){
        const fittingProducts = products.filter(product=>product.Place == "big");
        const placeToAdd = fittingProducts[genIndex(fittingProducts.length)];
    }else{
        const fittingProducts = products.filter(product=>product.Place == "default");
        const placeToAdd = fittingProducts[genIndex(fittingProducts.length)];
    }
});

const cardsPlacements = document.querySelectorAll(".home__card");


cardsPlacements.forEach(element=>{
    const fittingProducts = products.filter(product=>product.Place == "default");
    const placeToAdd = fittingProducts[genIndex(fittingProducts.length)];

    element.innerHTML = renderer(placeToAdd.picURL,placeToAdd.SN,placeToAdd.PN,placeToAdd.Price);
});


const topCardsPlacements = document.querySelectorAll(".top-card");


topCardsPlacements.forEach(element=>{
    const fittingProducts = products.filter(product=>product.Place == "top");
    const placeToAdd = fittingProducts[genIndex(fittingProducts.length)];

    element.innerHTML = renderer(placeToAdd.picURL,placeToAdd.SN,placeToAdd.PN,placeToAdd.Price);
});

const bigCardsPlacements = document.querySelectorAll(".big-pic");


bigCardsPlacements.forEach(element=>{
    const fittingProducts = products.filter(product=>product.Place == "big");
    const placeToAdd = fittingProducts[genIndex(fittingProducts.length)];

    element.innerHTML = renderer(placeToAdd.picURL,placeToAdd.SN,placeToAdd.PN,placeToAdd.Price);
});