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

    this.operators = {
        "+": (a,b) => a + b,
        "-": (a,b) => a - b,
        "*": (a,b) => a * b,
        "/": (a,b) => a / b
    };

    this.handleButtonPress = function(buttonStr) {
        if (buttonStr === "AC") {
            this.a = null;
            this.b = null;
            this.op = null;
            this.updateOutput(0);
        } else if (buttonStr === "=") { // equals pressed
            this.calculate();
        } else if (isNaN(+buttonStr)) { //operator pressed
            if (this.a !== null && this.op !== null && this.b !== null) {
                this.calculate();
            }
            this.op = buttonStr;
        } else if (this.a ===  null || this.op === null) {
            if (this.a === null) {
                this.a = buttonStr;
            } else {
                this.a += buttonStr;
            }
            this.a = +this.a;
            this.updateOutput(this.a);
        } else {
            if (this.b === null) {
                this.b = buttonStr;
            } else {
                this.b += buttonStr;
            }
            this.b = +this.b;
            this.updateOutput(this.b);
        }
    }

    this.calculate = function() {
        this.a = (this.operators[this.op](this.a,this.b));
        this.updateOutput(this.a);
        this.b = null;
    };
};