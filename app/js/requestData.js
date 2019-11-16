const STATUS = {
    OK: 200,
}

export const getData = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status == STATUS.OK && xhr.readyState == XMLHttpRequest.DONE) {
            callback(JSON.parse(xhr.responseText));  
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
    
};