let buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
    console.log(button);
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
        if (buttonStr === "=") {
            this.calculate();
        } else if (isNaN(+buttonStr)) {
            this.op = buttonStr;
        } else if (this.a ===  null || this.op === null) {
            this.a = +buttonStr;
            this.updateOutput(this.a);
        } else {
            this.b = +buttonStr;
            this.updateOutput(this.b);
        }
        console.log(this.a);
        console.log(this.b);
        console.log(this.op);
    }

    this.calculate = function() {
        this.a = (this.operators[this.op](this.a,this.b));
        console.log(this.a);
        this.updateOutput(this.a)
    };
};