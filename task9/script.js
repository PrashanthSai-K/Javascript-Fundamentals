let page_no = 0;
let error = null;


const container = document.querySelector(".container");
const loader = document.querySelector(".loader");

async function loadData() {
    const data = await apiCall();
    page_no = page_no + 1;
    data.items.map((item) => {
        container.appendChild(makeUser(item));
    })
}

async function apiCall() {
    try {
        const api = `https://api.github.com/search/users?q=a&per_page=30&page=${page_no}`;
        const response = await fetch(api);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        error = "Api error. Try after some time";
    }
}

function makeUser(user) {
    const div = document.createElement("div");
    div.classList.add("card");

    const img = document.createElement("img");
    img.src = user.avatar_url;

    const p = document.createElement("p");
    p.textContent = "User: " + user.login;

    div.appendChild(img);
    div.appendChild(p);

    return div;
}

window.addEventListener("load", loadData);


window.addEventListener("scroll", async function (event) {
    loader.classList.remove("invisible");

    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
console.log(scrollPosition >= pageHeight);

    if (scrollPosition + 100 >= pageHeight) {
        await loadData()
    }
    loader.classList.add("invisible");

})