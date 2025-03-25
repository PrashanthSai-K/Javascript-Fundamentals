
let listitems = JSON.parse(localStorage.getItem("list")) || ["item1", "item2", "item3", "item4"];

const ul = document.querySelector("ul");

function loadList() {
    listitems.map((item, index) => {
        const li = document.createElement("li");

        li.textContent = item;
        li.id = index;
        li.draggable = true;

        li.addEventListener("dragstart", function (event) {
            dragstart(event)
        })

        li.addEventListener("dragover", function(event){
            dragOver(event);
        });

        li.addEventListener("drop", function (event) {
            dropStart(event);
            this.classList.remove("drop-target");
        })

        li.addEventListener("dragenter", function () {
            this.classList.add("drop-target");
        })

        li.addEventListener("dragleave", function () {
            this.classList.remove("drop-target");
        })

        ul.appendChild(li);
    })
}


function dragstart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dragOver(ev) {
    ev.preventDefault();
}

function dropStart(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const oldData = document.getElementById(data).innerText;
    const oldlistData = listitems[data];
    listitems[data] = listitems[ev.target.id];
    listitems[ev.target.id] = oldlistData
    document.getElementById(data).innerText = ev.target.innerText;
    ev.target.innerText = oldData;    
    localStorage.setItem("list", JSON.stringify(listitems));
}

loadList();
