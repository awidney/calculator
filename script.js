function add(x, y) {
    return Math.round((x + y) * (10 ** 10)) / (10 ** 10);  
}

function subtract(x, y) {
    return Math.round((x - y) * (10 ** 10)) / (10 ** 10);
}

function multiply(x, y) {
    return Math.round((x * y) * (10 ** 10)) / (10 ** 10);
}

function divide(x, y) {
    return Math.round((x / y) * (10 ** 10)) / (10 ** 10);
}


function operate(operator, x, y) {
    if (operator == '+') {
        displayValue = add(x, y);
        display.textContent = displayValue;
        firstNumber = +displayValue;
        currentOperator = '';
        result = true;
        wiped = false;
        
    } else if (operator == '−') {
        displayValue = subtract(x, y);
        display.textContent = displayValue;
        firstNumber = +displayValue;
        currentOperator = '';
        result = true;
        wiped = false;
        
    } else if (operator == '×') {
        displayValue = multiply(x, y);
        display.textContent = displayValue;
        firstNumber = +displayValue;
        currentOperator = '';
        result = true;
        wiped = false;
        
    } else if (operator == '÷') {
        if (y == 0) {
            display.textContent = 'Say please.';
            displayValue = '';
            currentOperator = undefined;
            firstNumber = undefined;
            secondNumber = undefined;
            previousClick = undefined;
            result = false;
            wiped = false;
            equalsToggled = false;
        } else {
            displayValue = divide(x, y);
            display.textContent = displayValue;
            firstNumber = +displayValue;
            currentOperator = '';
            result = true;
            wiped = false;
        }
    }
}


const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.button.operator');
const display = document.querySelector('#display');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const operatorSymbols = ['+', '−', '×', '÷'];


let displayValue = '';
let firstNumber;
let currentOperator;
let result = false;
let wiped = false;
let equalsToggled = false;
let previousClick;


numbers.forEach(number => {
    number.addEventListener('click', function (e) {
        
        if ((display.textContent.length >= 15) && (previousClick.match(/[0-9]+/))) {
            alert('Can\'t enter more than 15 digits.');
            return;

        } else if (result) {
            if (!wiped) {
                displayValue = '';
                wiped = true;
                displayValue = e.target.textContent;
                display.textContent = displayValue;
                previousClick = e.target.textContent;

            } else {
                displayValue += e.target.textContent;
                display.textContent = displayValue;
                previousClick = e.target.textContent;
            }
        
        } else {
            displayValue += e.target.textContent;
            display.textContent = displayValue;
            previousClick = e.target.textContent;

        }
    });
});


operators.forEach(operator => {
    operator.addEventListener('click', function (e) {
        
            if (display.textContent == 'Say please.') {
                return;

            } else if ((currentOperator) && (!wiped)) {

            if (operatorSymbols.includes(previousClick)) {
                currentOperator = e.target.textContent;
                previousClick = e.target.textContent;
            
            } else {
                secondNumber = +displayValue;
                operate(currentOperator, firstNumber, secondNumber);
                currentOperator = e.target.textContent;
                wiped = false;
                previousClick = e.target.textContent;
            }

        
        } else if (currentOperator) {
            secondNumber = +displayValue;
            operate(currentOperator, firstNumber, secondNumber);
            currentOperator = e.target.textContent;
            previousClick = e.target.textContent;
            
        } else {
            currentOperator = e.target.textContent;
            firstNumber = +displayValue;
            displayValue = '';
            previousClick = e.target.textContent;
        }  
    });
});


equals.addEventListener('click', function (e) {
    if (previousClick == '=') {
        return;
    } else if (firstNumber == undefined) {
        return;
    } else if ((!previousClick.match(/[0-9]+/))) {
        return;
    } else if (!currentOperator) {
        return;
    } else {
        secondNumber = +displayValue;
        operate(currentOperator, firstNumber, secondNumber);
        if (display.textContent == 'Say please.') {
            return;
        } else {
            equalsToggled = true;
            previousClick = e.target.textContent;
        }
    }
});


clear.addEventListener('click', () => {
    display.textContent = '0';
    displayValue = '';
    currentOperator = undefined;
    firstNumber = undefined;
    secondNumber = undefined;
    previousClick = undefined;
    result = false;
    wiped = false;
    equalsToggled = false;
});


// Bug: numbers can overflow screen if too large