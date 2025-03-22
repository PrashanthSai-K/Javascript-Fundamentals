let list = [];
let editingState = null;

const input = document.getElementById("task-input");
const ul = document.getElementById("task-list");

function loadData() {
    ul.innerHTML = "";
    let data = JSON.parse(localStorage.getItem("list"));
    let completed = JSON.parse(localStorage.getItem("completed"));
    if (!data || data?.length === 0) {
        ul.innerHTML = "<div> No Todo's yet..!";
        return;
    }
    list = data;
    list.forEach((l, index) => {
        const li = document.createElement("li");
        const text = document.createElement("span");
        text.className = "text";
        text.innerHTML = l;

        completed?.filter((c) => {
            if (index == c)
                li.className = "checked";
        })

        li.onclick = function () {
            markComplete(index);
        }

        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.innerHTML = "Edit";
        editButton.onclick = function (event) {
            editItem(index);
            event.stopPropagation();
        }

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = "×";
        deleteButton.onclick = function (event) {
            deleteItem(index);
            event.stopPropagation();
        }
        const divElement = document.createElement("div");
        divElement.appendChild(editButton);
        divElement.appendChild(deleteButton);

        li.appendChild(text)
        li.appendChild(divElement);
        ul.appendChild(li);
    });

}

function addItem() {
    let value = input.value.trim();
    if (value === "") {
        alert("Please enter task");
        return;
    }

    if (editingState != null) {
        list[editingState] = value;
        localStorage.setItem("list", JSON.stringify(list));
        editingState = null;
        loadData();
        input.value = "";
        input.focus();
        return;
    }

    list.push(value);
    localStorage.setItem("list", JSON.stringify(list));
    loadData();
    input.value = "";
    input.focus();
}

function markComplete(index) {

    let completed = JSON.parse(localStorage.getItem("completed")) || [];

    if (completed.includes(index)) {
        completed = completed.filter((taskindex) => taskindex != index);
    } else {
        completed.push(index);
    }

    localStorage.setItem("completed", JSON.stringify(completed));
    loadData();
}

function editItem(index) {
    input.value = list[index];
    editingState = index;
    input.focus();
}

function deleteItem(task) {
    if (task === undefined || task === null || task < 0)
        return;
    list.splice(task, 1);
    localStorage.setItem("list", JSON.stringify(list));
    var completed = JSON.parse(localStorage.getItem("completed"));
    completed = completed.map(c => (c > index ? c - 1 : c)).filter(c => c !== index);
    localStorage.setItem("completed", JSON.stringify(done));

    loadData();
}
