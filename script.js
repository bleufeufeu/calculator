let displayValue = "";
let num1 = false;
let num2 = false;
let currentOperator;
let resultDisplayed = false;

const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    return a / b;
}

const power = function(a, b) {
    return a ** b;
}


function operate(a, b, operator) {
    if (operator == "+") {
        return add(a, b);
    } else if (operator == "-") {
        return subtract(a, b);
    } else if (operator == "*") {
        return multiply(a, b);
    } else if (operator == "/") {
        return divide(a, b);
    } else if (operator == "^") {
        return power(a, b);
    }
}

const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const btnClass = button.getAttribute("class");
        if (btnClass === "digit") {
            if ((!currentOperator && resultDisplayed) || (currentOperator && resultDisplayed)) {
                displayValue = "";
                resultDisplayed = false;
            }
            displayValue += button.innerText;
            display.innerText = displayValue;
        }
        if (btnClass === "decimal") {
            if (!displayValue.includes(".")) {
                if (displayValue === "") {
                    displayValue += "0";
                }
                displayValue += button.innerText;
                display.innerText = displayValue;
            }
        }
        if (btnClass === "negative") {
            if (!displayValue.includes("-")) {
                displayValue = "-" + displayValue;
                display.innerText = displayValue;
            } else {
                displayValue = displayValue.replace("-", "");
                display.innerText = displayValue;
            }
        }
        if (btnClass === "operator") {
            if (!num1) {
                num1 = parseFloat(displayValue);
                displayValue = "";
            } else if (num1 && !num2 && displayValue != "") {
                num2 = parseFloat(displayValue);
                displayValue = operate(num1, num2, currentOperator);
                display.innerText = displayValue;
                num1 = displayValue;
                num2 = false;
                resultDisplayed = true;
            }
            currentOperator = button.getAttribute("id");
        }
        if (btnClass === "equals") {
            if (num1 && displayValue === "") return;
            else if (num1 && !num2) {
                num2 = parseFloat(displayValue);
                displayValue = operate(num1, num2, currentOperator);
                display.innerText = displayValue;
                num1 = num2 = currentOperator = false;
                resultDisplayed = true;
            }
        }
        if (btnClass === "clear") {
            num1 = num2 = currentOperator = false;
            displayValue = "";
            display.innerText = "0";
            resultDisplayed = false;
        }
    });
});

document.addEventListener("keydown", function(event) {
    if (isFinite(event.key)) {
        if ((!currentOperator && resultDisplayed) || (currentOperator && resultDisplayed)) {
            displayValue = "";
            resultDisplayed = false;
        }
        displayValue += event.key;
        display.innerText = displayValue;
    }
    if (event.key === ".") {
        if (!displayValue.includes(".")) {
            if (displayValue === "") {
                displayValue += "0";
            }
            displayValue += ".";
            display.innerText = displayValue;
        }
    }
    if (["+", "-", "*", "/", "^"].includes(event.key)) {
        if (!num1) {
            num1 = parseFloat(displayValue);
            displayValue = "";
        } else if (num1 && !num2 && displayValue != "") {
            num2 = parseFloat(displayValue);
            displayValue = operate(num1, num2, currentOperator);
            display.innerText = displayValue;
            num1 = displayValue;
            num2 = false;
            resultDisplayed = true;
        }
        currentOperator = event.key;
    }
    if (event.key === "Enter" || event.key === "=") {
        if (num1 && displayValue === "") return;
        else if (num1 && !num2) {
            num2 = parseFloat(displayValue);
            displayValue = operate(num1, num2, currentOperator);
            display.innerText = displayValue;
            num1 = num2 = currentOperator = false;
            resultDisplayed = true;
        }
    }
});