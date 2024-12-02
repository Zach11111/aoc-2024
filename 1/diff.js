const fs = require('fs');

fs.readFile('list.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const lines = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    let total = 0
    let array1 = []
    let array2 = []

    lines.forEach(line => {
        const [num1, num2] = line.split("   ").map(Number)
        const diff = getDifference(num1, num2)
        array1.push(num1)
        array2.push(num2)
    });


    let sortedarray1 = array1.sort((a, b) => a - b);
    let sortedarray2 = array2.sort((a, b) => a - b);


    for (let i = 0; i < sortedarray1.length; i ++) {
        let diff = getDifference(sortedarray1[i], sortedarray2[i]);
        total = total + diff
        console.log(total)

    }



});


function getDifference(num1, num2) {
    if (num1 > num2) {
        return num1 - num2;
    } else if (num2 > num1) {
        return num2 - num1;
    } else {
        return 0;
    }
}
