let buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
    console.log(button);
    button.addEventListener("click", e => {
        updateOutput(button.textContent);
    });
});

function updateOutput(str) {
    console.log(str);
}

function Calculator() {

    this.operators = {
        "+": (a,b) => a + b,
        "-": (a,b) => a - b,
        "*": (a,b) => a * b,
        "/": (a,b) => a / b
    };

    this.calculate = function(expression) {

        let split = expression.split(' '),
            a = +split[0],
            op = split[1],
            b = +split[2];

        return this.operators[op](a,b);
    };
};