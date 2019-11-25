export const showAnimation = () => {
    const OW = document.querySelector('.outer-wrapper'),
        loadingWrapper = document.createElement('div'),
        loading = document.createElement('div');
    loadingWrapper.classList.add('loader-wrapper');
    loading.classList.add('loader');
    loadingWrapper.appendChild(loading);
    OW.appendChild(loadingWrapper);
};


export const hideAnimation = () => {
    const OW = document.querySelector('.outer-wrapper');
    OW.removeChild(OW.querySelector('.loader-wrapper'));
};