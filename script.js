let input = document.querySelector(".text-container");
let buttons = document.querySelectorAll("button");

const validKeys = [
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
    "=",
    ".",
    "+",
    "-",
    "*",
    "/",
    "%",
    "Enter",
    "Backspace",
    "Escape",
]



buttons.forEach((button)=>button.addEventListener("click", () => {
    if (button.className === "num") {

        input.innerText += button.innerText
    }
}))


// KEYBOARD HANDLING
document.addEventListener("keydown", (event) => {
    if (validKeys.includes(event.key)) {
        input.innerText += event.key
        console.log(input.innerText.length);
        
    }
})