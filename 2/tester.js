const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;

    const lines = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    let total = 0

    lines.forEach(line => {
        const isSafe = checkLine(line);
        if (isSafe) {
        total++
        }
        console.log(total)
    });
});

function checkLine(line) {
    const numbers = line.split(' ').map(Number);

    const isIncreasing = numbers.every((num, i) =>
    i === 0 || (num === numbers[i - 1] + 1 || num === numbers[i - 1] + 2 || num === numbers[i - 1] + 3)
    );

    const isDecreasing = numbers.every((num, i) =>
    i === 0 || (num === numbers[i - 1] - 1 || num === numbers[i - 1] - 2 || num === numbers[i - 1] - 3)
    );

    return isIncreasing || isDecreasing;
}

