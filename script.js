let displayEl = document.querySelector(".text-container");
let buttons = document.querySelectorAll("button");
let lastCalculationEl = document.querySelector(".historyTemp")

const digitKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "."
]

const operatorKeys = [
    "+",
    "-",
    "*",
    "/",
    "%",
]

const controlKeys = [
    "Enter",
    "Backspace",
    "Escape",
    "=",
]


let firstNumber = ""
let secondNumber = ""
let operator = ""
let result = ""
let history = ""
let isJustCalculated = false;

function updateScreen() {
        if (secondNumber.startsWith("-")) {
            displayEl.innerText = `${firstNumber}${operator}` + "(" + `${secondNumber}` + ")";
            return;
        }
        displayEl.innerText = `${firstNumber}${operator}${secondNumber}`
        
}

function updateLastCalculation() {
    if (secondNumber !== "") {
        if (secondNumber.startsWith("-")) {
            lastCalculationEl.innerText = `${firstNumber}${operator}` + "(" + `${secondNumber}` + ")" + "=" + `${result}`;
            return
        }
        lastCalculationEl.innerText = `${firstNumber}${operator}${secondNumber}` + "=" + `${result}`
    }
}

function appendDigit(digit) {
    if (isJustCalculated) {
        clearAll();
    }

    let current = operator === "" ? firstNumber : secondNumber;

    if (digit === "." ) {
        if (current.includes(".")) {
            return;
        }
        if (current === "") {
            current = "0."
        } else {
            current += "."
        }
    } else {
        if (current === "0") {
            current = digit;
        } else {
            current += digit;
        }
    }
    if (operator === "") {
        firstNumber = current;
    } else {
        secondNumber = current;
    }

    updateScreen()
}

function setOperator(op) {
    if (firstNumber !== "") {
        operator = op;
        updateScreen();
    }
    isJustCalculated = false;
}

function clearAll() {
    firstNumber = ""
    secondNumber = ""
    operator = ""
    result = ""
    updateScreen()
    isJustCalculated = false;
}

// Toggle + / -
function toggleSign() {
    
    let current = operator === "" ? firstNumber : secondNumber;
    if (current === "" || current === "0") {
        return;
    }
    const isNegative = current.startsWith("-")
    if (isNegative) {
        current = current.slice(1)
    } else {
        current = "-" + current
    }

    if (operator === "") {
        firstNumber = current;
    } else {
        secondNumber = current;
    }

    updateScreen()
}

// Calculation

function calculate() {
    if (secondNumber === "" || firstNumber === "") {
        return;
    }
    switch (operator) {
        case "+":
            result = +firstNumber + +secondNumber
            break;
        case "-":
            result = +firstNumber - +secondNumber
            break;
        case "*":
            result = +firstNumber * +secondNumber
            break;
        case "/":
            result = +firstNumber / +secondNumber
            break;
        case "%":
            result = +firstNumber * +secondNumber / 100
            break;

        default:
            break;
    }
    if (!isFinite(result)) {

        clearAll()
        return;
        
    }
    result = Number(result.toFixed(4))
    updateLastCalculation()
    firstNumber = String(result);
    displayEl.innerText = firstNumber;
    secondNumber = ""
    operator = ""
    isJustCalculated = true;
}

// Backspace

function deleteLast() {
    if (isJustCalculated) {
        clearAll();
        return;
    }
    if (displayEl.innerText !== "") {
        if (secondNumber !== "") {
            secondNumber = secondNumber.slice(0,-1)
        } else if (secondNumber === "" && operator !== "") {
            operator = ""
        } else if (secondNumber === "" && operator === "" && firstNumber !== ""){
            firstNumber = firstNumber.slice(0,-1)
        }
    }
    updateScreen()
    
}
// Get Input from both (Keyboard & Button) handleInput

function handleInput(key) {
    if (digitKeys.includes(key)) {
        appendDigit(key)
    } else if (operatorKeys.includes(key)) {
        if (operator === "" || !secondNumber) {
            setOperator(key)
        } else {
            calculate()
            setOperator(key)
        }
    } else if (key === "Enter" || key === "=") {
        calculate()
    } else if (key === "Escape") {
        clearAll()
    } else if (key === "Backspace") {
        deleteLast()
    } else if (key === "negate"){
        toggleSign()
    }
}

// Button Effect 
// setTimeout(func, delay)

function flashButton(key) {
    if (key === "Enter") {
        key = "="
    }
    const button = document.querySelector(`[data-key="${key}"]`)
    if (button === null) {
        return;
    }
    button.classList.add("pressed")
    setTimeout(() => {
        button.classList.remove("pressed")
    }, 150);

}


// BUTTON HANDLING

buttons.forEach((button) => button.addEventListener("click", () => {
    handleInput(button.dataset.key)
}));


// KEYBOARD HANDLING

document.addEventListener("keydown", (event) => {
    flashButton(event.key)
    if (event.metaKey || event.ctrlKey) return; 
    const key = event.key;
    if (digitKeys.includes(key) || operatorKeys.includes(key) || controlKeys.includes(key)) {
        event.preventDefault(); // prevent focus()
        handleInput(key);
    };
    })