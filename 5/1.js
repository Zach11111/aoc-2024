const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    const sections = data.split("\n\n");
    const rules = sections[0].split("\n").map(rule => {
        const parts = rule.split("|");
        return [parseInt(parts[0]), parseInt(parts[1])];
    });
    const updates = sections[1].split("\n").map(update => update.split(",").map(Number));

    let validUpdates = [];
    let sumMiddle = 0;

    updates.forEach(update => {
        let relevantRules = rules.filter(rule => {
            return update.includes(rule[0]) && update.includes(rule[1]);
        });

        let indexMap = {};
        update.forEach((page, index) => {
            indexMap[page] = index;
        });

        let isValid = true;
        relevantRules.forEach(rule => {
            if (indexMap[rule[0]] > indexMap[rule[1]]) {
                isValid = false;
            }
        });

        if (isValid) {
            validUpdates.push(update);
            const middleIndex = Math.floor(update.length / 2);
            sumMiddle += update[middleIndex];
        }
    });

    console.log(sumMiddle);
});
