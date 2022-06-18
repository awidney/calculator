function add(x, y) {
    return x + y;            
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

const result = document.querySelector('#result');

function operate(operator, x, y) {
    if (operator == '+') {
        result.textContent = add(x, y);
    } else if (operator == '−') {
        result.textContent = subtract(x, y);
    } else if (operator == '×') {
        result.textContent = multiply(x, y);
    } else if (operator == '÷') {
        result.textContent = divide(x, y);
    }
}

const buttons = document.querySelectorAll('.button');
const display = document.querySelector('#display');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        display.textContent += e.target.textContent;
    })
});

const equals = document.querySelector('#equals');

equals.addEventListener('click', () => {
    const operator = display.textContent.match(/\u002B|\u2212|\u00D7|\u00F7/).toString();
    const x = +display.textContent.match(/[0-9]+/).toString();
    const y = +display.textContent.match(/[0-9]+$/).toString();
    operate(operator, x, y);
});