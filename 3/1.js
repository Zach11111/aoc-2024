const fs = require('fs');


fs.readFile('input.txt', 'utf8', (err, data) => {

    const matches = data.match(/mul\(\d{1,3},\d{1,3}\)/g);

    let cleanedArray = []
    let total = 0

    matches.forEach(match => {
    const guh = match.replace("mul(", "")
    const guh2 = guh.replace(",", " ")
    const guh3 = guh2.replace(")", "")

    cleanedArray.push(guh3)
    })

    cleanedArray.forEach(index => {
    const numbers = index.split(' ').map(Number);
    const multiply = numbers[0] * numbers[1]

    total += multiply
    })


    console.log(total)

})
