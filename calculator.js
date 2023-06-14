let buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
    button.addEventListener("click", e => {
        calculator.handleButtonPress(button.textContent);
    });
});

const calculator = new Calculator();

function Calculator() {

    this.a = null;
    this.b = null;
    this.op= null;

    this.display = document.querySelector(".output");

    this.updateOutput = function(str) {
        this.display.textContent = str;
    }

    this.roundTo8DecimalPlaces = function(num) {
        return Math.round(num * Math.pow(10, 8)) / Math.pow(10, 8);
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

    this.handleButtonPress = function(buttonStr) {
        if (buttonStr === "clear") {
            this.a = null;
            this.b = null;
            this.op = null;
            this.updateOutput(0);
            return;
        } else if (buttonStr === "=") { // equals pressed
            if (this.a !== null && this.op !== null && this.b !== null) {
                this.calculate();
            }
            return;
        } else if (buttonStr in this.operators) { //operator pressed
            if (this.a !== null && this.op !== null && this.b !== null) {
                this.calculate();
            }
            this.op = buttonStr;
            return;
        } else if (this.a ===  null || this.op === null) {
            this.a = this.updateNumber(this.a, buttonStr);
            return;
        } else {
            this.b = this.updateNumber(this.b, buttonStr);
            return;
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
    };
};