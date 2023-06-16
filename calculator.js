

const calculator = new Calculator();

const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
    button.addEventListener("click", e => {
        calculator.handleButtonPress(button);
    });
});

window.addEventListener('keydown', calculator.handleKeyPress);

function Calculator() {

    this.a = null;
    this.b = null;
    this.op= null;

    this.keys = ["1","2","3","4","5","6","7","8","9","0","+","-","/","*","."];

    this.display = document.querySelector(".output");

    this.updateOutput = function(str) {
        this.display.textContent = str;
    }

    this.roundTo8DecimalPlaces = function(num) {
        return Math.round(num * Math.pow(10, 8)) / Math.pow(10, 8);
    }

    this.backspace = function() {
        if (this.a !== null && this.b === null) {
            this.a = this.a.toString();
            this.a = this.a.slice(0,-1);
            if (this.a === "") this.a = null;
            this.updateOutput(this.a);
        } else if (this.b !== null) {
            this.b = this.b.toString();
            this.b = this.b.slice(0,-1);
            if (this.b === "") this.b = null;
            this.updateOutput(this.b);
        }
    }

    this.operators = {
        "+": (a,b) => a + b,
        "-": (a,b) => a - b,
        "*": (a,b) => a * b,
        "/": (a,b) => a / b
    };

    this.updateNumber = function(num, buttonStr) {
        if (num === null) {
            num = buttonStr;
        } else {
            if(buttonStr === "." && num.includes(".")) {
                return num;
            }
            num += buttonStr;
        }
        this.updateOutput(num);
        return num;
    }

    this.handleButtonPress = function(button) {
        button.classList.add('pressing');
        const buttonStr = button.textContent;
        if (buttonStr === "clear") {
            this.a = null;
            this.b = null;
            this.op = null;
            this.updateOutput(0);
            return;
        } else if (buttonStr === "backspace"){
            this.backspace();
        } else if (buttonStr === "=") { // equals pressed
            if (this.a !== null && this.op !== null && this.b !== null) {
                this.calculate();
            }
            return;
        } else if (buttonStr in this.operators) { //operator pressed
            if (this.a !== null && this.op !== null && this.b !== null) {
                this.calculate();
            } else {
                this.op = buttonStr;
                return;
            }
        } else if (this.a ===  null || this.op === null) {
            this.a = this.updateNumber(this.a, buttonStr);
            return;
        } else {
            this.b = this.updateNumber(this.b, buttonStr);
            return;
        }
    }

    this.handleKeyPress = function(e) {
        if (calculator.keys.includes(e.key)) {
            calculator.handleButtonPress(e.key);
        } else if (e.key === "Backspace") {
            calculator.handleButtonPress("backspace");
        } else if (e.key === "Enter") {
            calculator.handleButtonPress("backspace");
        }
    }

    this.calculate = function() {
        if (this.b == 0 && this.op === "/") {
            this.updateOutput("Dividing by 0 is not allowed in this reality.");
            return;
        }
        this.a = this.roundTo8DecimalPlaces(this.operators[this.op](+this.a,+this.b));
        this.updateOutput(this.a);
        this.b = null;
        this.op = null;
    };
};