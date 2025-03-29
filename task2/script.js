let input = document.getElementById("display");
let resultDisplay = document.querySelector(".result-display");

let expression = "";

window.addEventListener("keydown", keyPress);

function keyPress(event) {
    let key = event.key;
    if (!isNaN(key) || key === ".") {
        appendVal(key);
    } else if (key === "+" || key === "-" || key === "x" || key === "/" || key === "*" || key === "%" || key === "(" || key === ")") {
        appendVal(key);
    } else if (key == "=" || key === "Enter") {
        updateResult(event, true);
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

function updateResult(e, enterPress) {
    if (enterPress)
        e.preventDefault();
    try {
        const tokens = tokenize(expression);
        const postfix = infixToPostfix(tokens);
        const result = calculate(postfix);
        console.log(expression);

        resultDisplay.textContent = result;
    } catch (error) {
        console.log(error);
        resultDisplay.textContent = "";
    }
}


function appendVal(val) {
    expression += val;
    input.value = expression;
    if (isNaN(val)) {
        updateResult();
    }
}

function clearAll() {
    expression = "";
    input.value = expression;
}

function clearLast() {
    expression = expression.slice(0, -1);
    input.value = expression;
}


function tokenize(expression) {
    let tokens = [];
    let operand = "";
    let lastChar = null;
    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];
        if (!isNaN(char) || char == ".") {
            operand += char;
        } else if (char === "-" && (i === 0 || isNaN(lastChar))) {
            operand += char;
        } else {

            if (operand != "") {
                tokens.push(parseFloat(operand));
            }
            tokens.push(char);
            operand = "";
        }
        lastChar = char;
    }

    if (operand !== "") {
        tokens.push(parseFloat(operand));
    }

    return tokens;
}

function infixToPostfix(tokens) {
    let postfix = [];
    let operator = [];
    let precedence = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2 };

    tokens.forEach((token) => {
        if (typeof token === "number") {
            postfix.push(token);
        } else if (token == "(") {
            operator.push(token);
        } else if (token == ")") {
            while (operator.length && operator[operator.length - 1] != "(") {
                postfix.push(operator.pop());
            }
            operator.pop();
        } else {
            while (operator.length && precedence[operator[operator.length - 1]] >= precedence[token]) {
                postfix.push(operator.pop());
            }
            operator.push(token);
        }
    })

    while (operator.length) {
        postfix.push(operator.pop());
    }
    console.log(postfix);

    return postfix;
}

function calculate(postfix = []) {
    let stack = [];

    postfix.forEach((val) => {
        if (!isNaN(val)) {
            stack.push(val);
        } else {
            let b = stack.pop();
            let a = stack.pop();

            if (a === undefined || b === undefined) {
                throw new Error("Invalid expression");
            }

            switch (val) {
                case "+":
                    stack.push(a + b);
                    break;
                case "-":
                    stack.push(a - b);
                    break;
                case "*":
                    stack.push(a * b);
                    break;
                case "/":
                    if (b == 0) {
                        alert("Cannot divide by zero");
                        return NaN;
                    }
                    stack.push(a / b);
                    break;
                case "%":
                    stack.push(a % b);
                    break;
                default:
                    throw new Error(`Unknown operator: ${val}`);
            }
        }
    });

    return stack.pop();
}

