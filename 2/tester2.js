const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;

    const lines = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    let total = 0

    lines.forEach(line => {
        const numbers = line.split(' ').map(Number);
        const isSafe = checkLine(numbers);
        if (isSafe) {
        total++
        }
        console.log(total)
    });
});

function checkLine(numbers) {
    if (isSafe(numbers)) {
        return true;
    }

    for (let i = 0; i < numbers.length; i++) {
        const modifiedNumbers = [...numbers.slice(0, i), ...numbers.slice(i + 1)];
        if (isSafe(modifiedNumbers)) {
            return true;
        }
    }
    return false;
}

function isSafe(numbers) {
    const isIncreasing = numbers.every((num, i) =>
    i === 0 || (num === numbers[i - 1] + 1 || num === numbers[i - 1] + 2 || num === numbers[i - 1] + 3)
    );

    const isDecreasing = numbers.every((num, i) =>
    i === 0 || (num === numbers[i - 1] - 1 || num === numbers[i - 1] - 2 || num === numbers[i - 1] - 3)
    );

    return isIncreasing || isDecreasing;
}
