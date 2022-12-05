let result = 0;
let displayText = '0';
let prevSymbol = null;

	
const display = document.querySelector('.display');
document.querySelectorAll('.number').forEach(number => number.addEventListener('click', event => manageNumber(event.target.innerText)));
document.querySelectorAll('.operation').forEach(number => number.addEventListener('click', event => manageSymbol(event.target.innerText)));

	function manageNumber(number) {
		if (displayText === '0' || isNaN(displayText))
			displayText = number;
		else displayText += number;
		display.innerHTML = displayText;
}


function manageSymbol(symbol) {
	console.log(symbol)
		switch (symbol) {
			case 'C':
				displayText = '0';
				result = 0;
				break;
			case '<-':
				if (displayText.length === 1)
					displayText = '0';
				else displayText = displayText.substring(0, displayText.length - 1);
				break;
			case '/':
			case '*':
			case '-':
			case '+':
				manageMath(symbol);
				break;
			case '.':
				if (!displayText.includes('.'))
					displayText += symbol;
				break;
			case '=':
				console.log(display)
				if (prevSymbol === null)
					return;
				
				doMath(parseFloat(displayText));
				prevSymbol = null;
				displayText = result;
				result = 0;
				break;
			default:
				if (displayText === '0' || isNaN(displayText))
					displayText = symbol;
		}
		display.innerHTML = displayText;
	}
	function manageMath(symbol) {
		if (displayText === '0')
			return;
		const value = parseFloat(displayText);
		if (result === 0) result = value;
		else doMath(value);
		prevSymbol = symbol;
		displayText = symbol;
	}
	function doMath(value) {
		if (prevSymbol === '+') result += value;
		else if (prevSymbol === '-') result -= value;
		else if (prevSymbol === '*') result *= value;
		else result /= value;
	}
