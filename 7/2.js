const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    const array = data.split('\n');
    let output = 0;

    array.forEach((line) => {
        let [testValue, numbers] = line.split(':');
        testValue = Number(testValue);
        let numbersArray = numbers.trim().split(' ').map(Number);

        let possibleResults = generateResults(numbersArray);

        if (possibleResults.includes(testValue)) {
            output += testValue;
        }
    });

    console.log('Total Calibration Result:', output);
});

function generateResults(numbers) {
    const operatorCombinations = [];
    const results = [];

    function generateOperators(index, currentOperators) {
        if (index === numbers.length - 1) {
            operatorCombinations.push(currentOperators);
            return;
        }

        generateOperators(index + 1, [...currentOperators, '+']);
        generateOperators(index + 1, [...currentOperators, '*']);
        generateOperators(index + 1, [...currentOperators, '||']);
    }

    generateOperators(0, []);
    
    operatorCombinations.forEach((operators) => {
        let result = numbers[0];
        for (let i = 0; i < operators.length; i++) {
            result = evaluate(result, operators[i], numbers[i + 1]);
        }
        results.push(result);
    });

    return results;
}

function evaluate(a, operator, b) {
    if (operator === '+') {
        return a + b;
    } else if (operator === '*') {
        return a * b;
    } else if (operator === '||') {
        return Number(String(a) + String(b));
    }
}
