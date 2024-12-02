const fs = require('fs');

fs.readFile('list.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const lines = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    let total = 0
    let array1 = []
    let array2 = []

    lines.forEach(line => {
        const [num1, num2] = line.split("   ").map(Number)
        array1.push(num1)
        array2.push(num2)
    });

    for (let i = 0; i < array1.length; i++) {
    let count = array2.reduce((acc, num) => num === array1[i] ? acc + 1 : acc, 0);

    score = array1[i] * count

    total = total + score
    console.log(total)

    }



    });
