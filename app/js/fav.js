import {PAYTURL, SHIPURL} from "./URLWatch.js";

export const toFav = (event) => {
    event.preventDefault();
    if (location.href != SHIPURL && location.href != PAYTURL){
        //Render fav page
    }
};