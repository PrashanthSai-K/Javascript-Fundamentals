let items = [
    {
        id: 1,
        name: "Attack on Titan",
        author: "Hajime Isayama",
        type: "Paperback ",
        price: "300",
        availability: true,
        img: "./assets/aot.jpg"
    },
    {
        id: 2,
        name: "Berserk",
        author: "Kentaro Miura",
        type: "Paperback ",
        price: "250",
        availability: true,
        img: "./assets/beserk.jpg"
    },
    {
        id: 3,
        name: "Bleach",
        author: "Tite Kubo",
        type: "Paperback ",
        price: "350",
        availability: true,
        img: "./assets/bleach.jpg"

    },
    {
        id: 4,
        name: "BLuelock",
        author: "Muneyuki Kaneshiro",
        type: "Paperback ",
        price: "550",
        availability: true,
        img: "./assets/bluelock.jpg"
    },
    {
        id: 5,
        name: "DragonballZ",
        author: "Akira Toriyama",
        type: "Paperback ",
        price: "350",
        availability: true,
        img: "./assets/dragonbal.jpg"
    },
    {
        id: 6,
        name: "Haikyu",
        author: "Haruichi Furudate",
        type: "Paperback ",
        price: "278",
        availability: true,
        img: "./assets/haikyu.jpg"

    },
    {
        id: 7,
        name: "Jujutsu Kaisen",
        author: "Gege Akutami",
        type: "Paperback ",
        price: "560",
        availability: true,
        img: "./assets/jjk.jpg"
    },
    {
        id: 8,
        name: "Naruto",
        author: "Masashi Kishimoto",
        type: "Paperback ",
        price: "460",
        availability: true,
        img: "./assets/naruto.jpg"

    },
    {
        id: 9,
        name: "One-punch Man",
        author: "Yusuke Murata",
        type: "Paperback ",
        price: "390",
        availability: true,
        img: "./assets/onepunch.jpg"
    },
    {
        id: 10,
        name: "OnePiece",
        author: "Eiichiro Oda",
        type: "Paperback ",
        price: "690",
        availability: true,
        img: "./assets/op.jpg"
    },
    {
        id: 11,
        name: "Sakamoto Days",
        author: "Yuto Suzuki",
        type: "Paperback ",
        price: "510",
        availability: true,
        img: "./assets/sakamoto.jpg"
    },
    {
        id: 12,
        name: "The Witcher",
        author: "Andrzej Sapkowski",
        type: "Paperback ",
        price: "280",
        availability: true,
        img: "./assets/witcher.jpg"
    },
    {
        id: 13,
        name: "Your Name",
        author: "Makoto Shinkai",
        type: "Paperback ",
        price: "470",
        availability: true,
        img: "./assets/yourname.jpg"
    }
]

let originalItems = [...items];

const cartNotify = document.querySelector(".cart-notify");


//cart functions
function addItemToCart(item) {
    let userCart = JSON.parse(localStorage.getItem("cart")) || [];

    let found = null;
    const index = userCart.map((i, index) => {
        if (i.id == item.id) {
            found = index;
            return;
        }
    });
    if (found != null) {
        userCart[found].quantity += 1;
    } else {
        userCart.push({ ...item, quantity: 1 });
    }
    cartNotify.textContent = userCart.length;
    localStorage.setItem("cart", JSON.stringify(userCart));
    loadCart();
    notify("Item added");
}

function removeItemFromCart(item) {
    let userCart = JSON.parse(localStorage.getItem("cart")) || [];

    
    let found = null;
    userCart.map((i, index) => {
        if (i.id == item.id) {
            found = index;
        }
    })
    if (found != null) {
        console.log(item, found);

        userCart.splice(found, 1);
        console.log(userCart);
        
        notify("Item removed");
    } else {
        alert("Item not found");
    }
    cartNotify.textContent = userCart.length;
    localStorage.setItem("cart", JSON.stringify(userCart));
    loadCart();
}

function minusItemFromCart(item) {
    let userCart = JSON.parse(localStorage.getItem("cart")) || [];

    let found = null;
    userCart.map((i, index) => {
        if (i.id == item.id) {
            found = index;
        }
    })

    if (found != null) {
        console.log(userCart, found);
        
        if (userCart[found].quantity <= 1) {
            removeItemFromCart(item);
            return;
        } else {
            userCart[found].quantity -= 1;
            localStorage.setItem("cart", JSON.stringify(userCart));
        }
        notify("Item removed");
        loadCart();    
    }
}

function checkout(){
    const total = calculatePrice();
    alert(`You have checkedout items for Rs. ${total + total * 0.17}`);
    localStorage.setItem("cart", JSON.stringify([]));
    cartNotify.textContent = 0;
    listPage();
}


//notify function
const message = document.querySelector("#notify");

function notify(mess){    
    message.textContent = mess;
    message.style.display = "block";
    setTimeout(()=>{
        message.style.display = "none";
    }, 5000);
}


//Load page contents

const list = document.querySelector(".list");
const cart = document.querySelector(".cart");

window.onload = function () {
    loadItems();
}

function loadItems() {
    let userCart = JSON.parse(localStorage.getItem("cart")) || [];

    cartNotify.textContent = userCart.length;

    list.innerHTML = "";
    items.forEach((item) => {
        list.appendChild(createItemCard(item));
    })
}

function loadCart() {
    let userCart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.innerHTML = "";
    cart.appendChild(createCheckoutCard());
    userCart.map((item) => {
        cart.appendChild(createCartCard(item, true));
    })
}


//navigation while hasing not functioning

const listNav = document.querySelector(".list-nav");
const cartNav = document.querySelector(".cart-nav");

listNav.addEventListener("click", function(){
    listPage();
})

cartNav.addEventListener("click", function(){
    loadCart();
    cartPage();
})


// Routing funcionality
window.onhashchange = router;

const listSection = document.querySelector(".list");
const cartSection = document.querySelector(".cart");
const pageTitle = document.querySelector(".page-title");

function router() {
    const hash = location.hash;

    switch (hash) {
        case "#list":
            listPage();
            break;
        case "#cart":
            loadCart();
            cartPage();
            break;
        default:
            break;
    }
}

function listPage() {
    pageTitle.textContent = "Products";
    listSection.style.opacity = 1;
    listSection.style.height = "auto";
    listSection.style.pointerEvents = "all"
    cartSection.style.opacity = 0;
    cartSection.style.height = 0;
    cartSection.style.pointerEvents = "none"
    search.style.display = "block";
    search.style.pointerEvents = "all"
}

function cartPage() {
    pageTitle.textContent = "Cart";
    listSection.style.opacity = 0;
    listSection.style.height = 0;
    listSection.style.pointerEvents = "none"
    cartSection.style.opacity = 1;
    cartSection.style.height = "100%";
    cartSection.style.pointerEvents = "all";
    search.style.display = "none";
    search.style.pointerEvents = "none"
}



//Utility functions

const search = document.querySelector(".search");

function debounce(func, timer = 300){
    let timeout;
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(()=>{
            func.apply(this, args);
        }, timer)
    }
}

function searchItems(){
    let word = search.value;
    if(!word){
        items = [...originalItems];
    }else {
        items = originalItems.filter((i) => i.name.toLowerCase().includes(word));        
    }
    loadItems();
}

const searchCall = debounce(searchItems, 1000);

function calculatePrice() {
    let userCart = JSON.parse(localStorage.getItem("cart")) || [];

    let price = 0;
    userCart.map((item) => {
        price += item.quantity * item.price;
    })
    return price;
}

function createCheckoutCard(){
    const div = document.createElement("div");
    div.classList.add("checkout-card");

    const price = document.createElement("div");
    price.classList.add("price-container");

    const total = calculatePrice();
    
    price.innerHTML = `
    <div class="total">Total Price : </div>
    <div class="price"> Rs. ${total} + 18% GST - 1% Discount = <strong>Rs. ${total + (total * 0.17)} </strong></div>
    `
    const button = document.createElement("button");
    button.classList.add("checkout-button");
    button.textContent = "Checkout";
    button.onclick = checkout;

    div.appendChild(price);
    div.appendChild(button);

    return div;
}

function createItemCard(item) {
    const div = document.createElement("div");
    div.classList.add("card");
    div.dataset.name = item.name;

    const img = document.createElement("img");
    img.src = item.img;

    const divDetails = document.createElement("div");
    divDetails.classList.add("details");

    const name = document.createElement("p");
    name.textContent = item.name;
    name.classList.add("name")
    const author = document.createElement("p");
    author.innerHTML = `By : <span>${item.author}</span>`;
    author.classList.add("author");
    const price = document.createElement("p");
    price.textContent = item.price;
    price.classList.add("price")
    const type = document.createElement("p");
    type.textContent = item.type;
    type.classList.add("type")
    const available = document.createElement("p");
    available.classList.add("available");
    if (item.availability) {
        available.textContent = "Available";
        available.style.color = "green";
    } else {
        available.textContent = "Not-Available";
        available.style.color = "red";
    }
    const button = document.createElement("button");
    button.classList.add("add-cart");
    button.textContent = "Add"
    button.onclick = function () {
        addItemToCart(item);
    }
    divDetails.appendChild(name);
    divDetails.appendChild(author);
    divDetails.appendChild(price);
    divDetails.appendChild(type);
    divDetails.appendChild(available);
    divDetails.appendChild(button);
    div.appendChild(img);
    div.appendChild(divDetails)
    return div;
}

function createCartCard(item, cart) {
    const div = document.createElement("div");
    div.classList.add("card");
    div.dataset.name = item.name;

    const img = document.createElement("img");
    img.src = item.img;

    const divDetails = document.createElement("div");
    divDetails.classList.add("details");

    const name = document.createElement("p");
    name.textContent = item.name;
    name.classList.add("name")
    const author = document.createElement("p");
    author.innerHTML = `By : <span>${item.author}</span>`;
    author.classList.add("author");
    const price = document.createElement("p");
    price.textContent = item.price;
    price.classList.add("price")
    const type = document.createElement("p");
    type.textContent = item.type;
    type.classList.add("type")
    const available = document.createElement("p");
    available.classList.add("available");
    if (item.availability) {
        available.textContent = "Available";
        available.style.color = "green";
    } else {
        available.textContent = "Not-Available";
        available.style.color = "red";
    }

    const quantityDiv = document.createElement("div");
    quantityDiv.classList.add("quantity");

    const addButton = document.createElement("button");
    addButton.classList.add("add");
    addButton.textContent = "+"
    addButton.onclick = function () {
        addItemToCart(item);
    }

    const quantity = document.createElement("p");
    quantity.textContent = item.quantity;
    quantity.classList.add("quantity-count");

    const minusButton = document.createElement("button");
    minusButton.classList.add("minus");
    minusButton.textContent = "-"
    minusButton.onclick = function () {
        minusItemFromCart(item);
    }

    const button = document.createElement("button");
    button.classList.add("remove-cart");
    button.textContent = "Remove"
    button.onclick = function () {
        removeItemFromCart(item);
    }

    quantityDiv.appendChild(addButton);
    quantityDiv.appendChild(quantity);
    quantityDiv.appendChild(minusButton);

    divDetails.appendChild(name);
    divDetails.appendChild(author);
    divDetails.appendChild(price);
    divDetails.appendChild(type);
    divDetails.appendChild(available);
    divDetails.appendChild(quantityDiv);
    divDetails.appendChild(button);

    div.appendChild(img);
    div.appendChild(divDetails)

    return div;
}

