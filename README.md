# TOP-Calculator
 
A calculator built with vanilla HTML, CSS and JavaScript as part of [The Odin Project](https://www.theodinproject.com/) Foundations curriculum.
 
**Live demo:** https://knshnbz.github.io/TOP-Calculator/
 
## Features
 
- Basic operations: addition, subtraction, multiplication, division and percentage
- Chained operations: `5 + 3 + 2` evaluates step by step without pressing `=`
- Decimal numbers, with protection against multiple decimal points
- Sign toggle (`+/-`) for negative numbers, shown in parentheses when used as the second operand
- Backspace that removes the last character or operator
- Results rounded to 4 decimal places to avoid floating-point artifacts (`0.1 + 0.2 = 0.3`)
- Last calculation shown above the result
- Visual feedback:
  - Button press effect for both mouse and keyboard input
  - Screen shake on invalid input (e.g. division by zero)
  - Wave animation when clearing
## Keyboard Support
 
| Key | Action |
|---|---|
| `0`–`9` | Enter digits |
| `.` | Decimal point |
| `+` `-` `*` `/` `%` | Operators |
| `Enter` or `=` | Calculate |
| `Backspace` | Delete last character |
| `Escape` | Clear all |
 
## What I Learned
 
- Laying out a button grid with Flexbox and `gap`
- Keeping application state in variables and rendering the screen from that state
- Handling mouse and keyboard input through a single function using `data-` attributes
- Preventing default browser behavior with `event.preventDefault()`
- Dealing with floating-point precision in JavaScript
- CSS `@keyframes` animations triggered from JavaScript with the `animationend` event
## Possible Improvements
 
- Calculation history (last 10 operations)
- Light / dark mode toggle
- Automatically shrinking long numbers to fit the screen
## Built With
 
- HTML
- CSS
- JavaScript