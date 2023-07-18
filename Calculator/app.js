class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.actions = {
            '+': (prev, current) => prev + current,
            '-': (prev, current) => prev - current,
            '*': (prev, current) => prev * current,
            '÷': (prev, current) => prev / current
        }
        this.clear();
    }

    clear() { 
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, this.currentOperand.length - 1);
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number == '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand += number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand !== "") {
            if (this.previousOperand != "") {
                this.compute();
            }
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = "";

        }
    }

    compute() {
        debugger;
        let computation;

        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) {
            return;
        }

        const action = this.actions[this.operation];
        computation = action(prev, current);

        this.currentOperand = computation.toString();
        this.previousOperand = "";
        this.operation = undefined;
    }

    getDisplayNumber(number) {
        const integerDigits = parseInt(number.split('.')[0]);
        const decimalDigits = number.split('.')[1];

        let integerDisplay;

        if(isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if(decimalDigits != null) {
            return integerDisplay + '.' + decimalDigits;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.textContent = this.getDisplayNumber(this.currentOperand);
        this.previousOperandTextElement.textContent = this.previousOperand;

        if(this.operation != null){
            this.previousOperandTextElement.textContent = this.getDisplayNumber(this.previousOperand) + " " + this.operation;
        } 
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(b => {
    b.addEventListener('click', (e) => {
        calculator.appendNumber(e.target.textContent);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(b => {
    b.addEventListener('click', (e) => {
        calculator.chooseOperation(e.target.textContent);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click',() => {
    calculator.delete();
});