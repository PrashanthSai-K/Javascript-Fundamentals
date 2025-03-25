const messageInput = document.querySelector(".message-input");
const messages = document.querySelector(".messages");

function sendReply() {
    const responses = [
        "Nice",
        "Good to hear",
        "Good to know",
        "Tell me more",
        "Interesting...",
        "I understand",
        "That's cool!",
        "Sounds good",
        "Okay",
        "That's helpful",
        "Thanks for sharing",
        "Makes sense",
        "Right on",
        "Awesome!",
        "Fantastic",
        "Great!",
        "Terrific",
        "Excellent",
        "Wonderful",
        "Right",
        "Indeed",
        "You got it",
        "Okay that's what happens"
    ];

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(responses[Math.floor(Math.random() * (responses.length - 0 + 1) + 0)]);
        }, 3000);
    })
}

function createSendDiv(message) {
    const div = document.createElement("div");
    div.classList.add("sent");

    const p = document.createElement("p");
    p.textContent = message

    const span = document.createElement("span");
    span.textContent = new Date(Date.now()).toLocaleString();

    div.appendChild(p);
    div.appendChild(span);
    return div;
}

function createReceiveDiv(message) {
    const div = document.createElement("div");
    div.classList.add("received");

    const p = document.createElement("p");
    p.textContent = message

    const span = document.createElement("span");
    span.textContent = new Date(Date.now()).toLocaleString();

    div.appendChild(p);
    div.appendChild(span);
    return div;
}


function startConvo() {
    messages.appendChild(createReceiveDiv("Hello user !!"));
}

async function sendMessage() {
    const message = messageInput.value.trim();
    if (message == "") {
        return;
    }
    messages.appendChild(createSendDiv(message));
    messages.scrollTo(0, messages.scrollHeight);
    messageInput.value = "";
    const reply = await sendReply();
    messages.appendChild(createReceiveDiv(reply));
    messages.scrollTo(0, messages.scrollHeight);
    messageInput.focus();
}

document.querySelector(".send-button").addEventListener("click", sendMessage);

window.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        sendMessage();
    }
})

window.addEventListener("load", startConvo);
