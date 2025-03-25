const home = document.querySelector(".home");
const services = document.querySelector(".services");
const products = document.querySelector(".products");
const about = document.querySelector(".about");

//event listener for hash change
window.onhashchange = router;

function router() {
    const hash = location.hash;
    switch (hash) {
        case "#home":
            homePage();
            break;
        case "#products":
            productsPage();
            break;
        case "#services":
            servicePage();
            break;
        case "#about":
            aboutPage();
            break;
        default:
            break;
    }
}


function homePage() {
    home.style.opacity = 1;
    home.style.height = "auto";
    services.style.opacity = 0;
    services.style.height = 0;
    products.style.opacity = 0;
    products.style.height = 0;
    about.style.opacity = 0;
    about.style.height = 0;
}

function productsPage() {
    home.style.opacity = 0;
    home.style.height = 0;
    services.style.opacity = 0;
    services.style.height = 0;
    products.style.opacity = 1;
    products.style.height = "auto";
    about.style.opacity = 0;
    about.style.height = 0;
}

function servicePage() {
    home.style.opacity = 0;
    home.style.height = 0;
    services.style.opacity = 1;
    services.style.height = "auto";
    products.style.opacity = 0;
    products.style.height = 0;
    about.style.opacity = 0;
    about.style.height = 0;
}

function aboutPage() {
    home.style.opacity = 0;
    home.style.height = 0;
    services.style.opacity = 0;
    services.style.height = 0;
    products.style.opacity = 0;
    products.style.height = 0;
    about.style.opacity = 1;
    about.style.height = "auto";
}
