const STATUS = {
    OK: 200,
};

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