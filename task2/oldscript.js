let prevInput = ""
let currentInput = ""
let currentOp = ""


let input = document.getElementById("display");

//Handling the click event
function keyPress(event) {
    let key = event.key;
    if (!isNaN(key) || key === ".") {
        appendNumber(key);
    } else if (key === "+" || key === "-" || key === "x" || key === "/" || key === "*" || key === "%") {
        appendOperation(key);
    } else if (key == "=" || key === "Enter") {
        calculate();
    }
    else if (key === "Escape" || key === "C") {
        clearAll();
    } else if (key === "Backspace") {
        clearLast();
    }
    else {
        return
    }
}

//Handling clear all
function clearAll() {
    prevInput = ""
    currentInput = ""
    currentOp = ""
    input.value = ""
}

//Handling clear last
function clearLast() {
    if (currentOp == "" && currentInput == "")
        prevInput = prevInput.slice(0, -1);
    else if (currentInput == "")
        currentOp = "";
    else
        currentInput = currentInput.slice(0, -1);
    input.value = `${prevInput} ${currentOp} ${currentInput}`;
}

//Handling clicking of numbers
function appendNumber(number) {
    currentInput += number
    input.value = `${prevInput} ${currentOp} ${currentInput}`
}

//Handling clicking of operations
function appendOperation(operation) {
    if (currentInput == "") return;
    if (prevInput == "")
        prevInput = currentInput;
    else
        calculate();
    currentOp = operation;
    prevInput = currentInput;
    currentInput = "";
    input.value = `${prevInput} ${currentOp} ${currentInput}`;
}

//Main caculate function
function calculate() {
    if (prevInput === "" || currentInput == "") return;

    let op1 = parseFloat(prevInput);
    let op2 = parseFloat(currentInput);
    var result = 0;
    switch (currentOp) {
        case "+":
            result = op1 + op2;
            break;
        case "-":
            result = op1 - op2;
            break;
        case "x":
            result = op1 * op2;
            break;
        case "*":
            result = op1 * op2;
            break;
        case "%":
            result = op1 % op2;
            break;
        case "/":
            if (op2 == 0) {//Handling division by zero
                alert("Division by zero is not allowed")
                clearAll()
                return
            }
            result = op1 / op2;
            break;
        default:
            break;
    }

    currentInput = result.toString(); //Converting back to string to avoid addition instead of concatenation
    currentOp = "";
    prevInput = ""
    input.value = `${currentInput}`
}

//Adding event listener to the window for key press
window.addEventListener("keydown", keyPress);