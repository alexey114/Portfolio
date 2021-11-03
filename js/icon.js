let counter = 1;
let faviconImgs = 9;
let favicons = document.querySelectorAll('link'); 

function animeFavicon () {   
    favicons.forEach(item => {
        if(item.getAttribute('rel').indexOf('icon') >= 0) {
            item.setAttribute('href', 'images/icon_title/' + counter + '.png');
        }
    });   
    counter ++;    

    if (counter == faviconImgs) {counter = 1; }
}  

setInterval (animeFavicon, 1000);