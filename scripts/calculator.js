const calcString = document.getElementById('calcstring');
const result = document.getElementById('result');

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

function operate(num1, operator, num2) {
    if (operator == '+') {
        return num1 + num2;
    } else if (operator == '-') {
        return num1 - num2;
    } else if (operator == '*') {
        return num1 * num2;
    } else {
        if (num2 !== 0) {
            return num1 / num2;
        } else {
            return 'Error: division by 0';
        }
    }
}

function signalClick(e) {
    if (!getEventTarget(e).classList.contains('inactive')) {
        getEventTarget(e).style.opacity = 0.5;
        setTimeout(() => {
            getEventTarget(e).style.opacity = 1;
        }, 100);
    }
}

function handleNumber(e) {
    if (result.textContent.length > 0) {
        result.textContent = '';
        calcString.textContent = '';
    }
    if (calcString.textContent.length < 30) {
        calcString.textContent += getEventTarget(e).textContent;
    } else {
        for (let button of document.getElementsByClassName('number')) {
            button.classList.add('inactive');
        }
    }
}

function handleDecimal() {
    const numbers = calcString.textContent.split(/[\+\-\*\/]/);
    if (calcString.textContent == '' || (numbers.length > 1 && numbers[1] == '')) {
        calcString.textContent += '0';
    }
    if (calcString.textContent.length < 29 && 
        (!calcString.textContent.includes('.') 
        || (numbers.length > 1 && calcString.textContent.length < 29 && !numbers[numbers.length-1].includes('.')))) {
        calcString.textContent += '.';
    } 
    document.getElementById('decimal').classList.add('inactive');
}

function handleOperator(e) {
    if (result.textContent.length > 0) {
        calcString.textContent = result.textContent;
        result.textContent = '';
    }
    if (!/[\+\-\*\/]/.test(calcString.textContent) || 
        (calcString.textContent.slice(0,1) == '-' 
        && calcString.textContent.split(/[\+\-\*\/]/).length < 3)) {
            calcString.textContent += getEventTarget(e).getAttribute('value');
    } 
    for (let button of document.getElementsByClassName('operator')) {
        button.classList.add('inactive');

    }   
    document.getElementById('decimal').classList.remove('inactive');
}

function handleEquals(e) {
    let numbers = calcString.textContent.split(/[\+\-\*\/]/);
    if (numbers.length > 1) {
        let operator = calcString.textContent.replace(/^(\-?[0-9\.]+)([\+\-\*\/])(\-?[0-9\.]+)$/, '$2');
        let firstNum = numbers.length > 2 ? parseFloat('-'+numbers[1]) : parseFloat(numbers[0]);
        result.textContent = operate(firstNum, operator, parseFloat(numbers[numbers.length -1]));
    }  
    
    for (let button of document.getElementsByClassName('button')) {
        if (button.classList.contains('inactive')) {
            button.classList.remove('inactive');
        }
    }
}

function handleClear() {
    calcString.textContent = ''; 
    result.textContent = '';
    for (let button of document.getElementsByClassName('button')) {
        if (button.classList.contains('inactive')) {
            button.classList.remove('inactive');
        }
    }
}

function handleDelete() {
    calcString.textContent = calcString.textContent.slice (0, -1);
    if (!/[\+\-\*\/]/.test(calcString.textContent)) {
        for (let button of document.getElementsByClassName('operator')) {
            button.classList.remove('inactive');
        }
    }
    if (calcString.textContent.split('.').length < 3 && document.getElementById('decimal').classList.contains('inactive')) {
        document.getElementById('decimal').classList.remove('inactive');
    }
    if (calcString.textContent.length < 30) {
        for (let button of document.getElementsByClassName('number')) {
            if (button.classList.contains('inactive')) {
                button.classList.remove('inactive');
            }
        } 
    }
}

function handleClick(e) {
    signalClick(e);
    if (getEventTarget(e).classList.contains('number')) { handleNumber(e); }
    if (getEventTarget(e).textContent == '.') { handleDecimal(); }
    if (getEventTarget(e).classList.contains('operator')) { handleOperator(e); }
    if (getEventTarget(e).textContent == '=') { handleEquals(e); }
    if (getEventTarget(e).textContent == 'AC') { handleClear(); }
    if(getEventTarget(e).id == 'delete') { handleDelete(); }
}
document.getElementById('buttons').addEventListener('click', handleClick);

