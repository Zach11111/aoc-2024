const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    const sections = data.split("\n\n");
    const rules = sections[0].split("\n").map(rule => {
        const parts = rule.split("|");
        return [parseInt(parts[0]), parseInt(parts[1])];
    });
    const updates = sections[1].split("\n").map(update => update.split(",").map(Number));

    const isValidUpdate = (update, rules) => {
        const indexMap = new Map();
        update.forEach((page, idx) => indexMap.set(page, idx));

        for (const [x, y] of rules) {
            if (indexMap.has(x) && indexMap.has(y)) {
                if (indexMap.get(x) > indexMap.get(y)) return false;
            }
        }
        return true;
    };

    const correctOrder = (update, rules) => {
        const graph = new Map();
        const inDegree = new Map();

        update.forEach(page => {
            graph.set(page, []);
            inDegree.set(page, 0);
        });

        rules.forEach(([x, y]) => {
            if (graph.has(x) && graph.has(y)) {
                graph.get(x).push(y);
                inDegree.set(y, (inDegree.get(y) || 0) + 1);
            }
        });

        const queue = [];
        inDegree.forEach((count, page) => {
            if (count === 0) queue.push(page);
        });

        const sorted = [];
        while (queue.length) {
            const current = queue.shift();
            sorted.push(current);

            graph.get(current).forEach(neighbor => {
                inDegree.set(neighbor, inDegree.get(neighbor) - 1);
                if (inDegree.get(neighbor) === 0) queue.push(neighbor);
            });
        }

        return sorted;
    };

    let sumMiddle = 0;

    updates.forEach(update => {
        const relevantRules = rules.filter(([x, y]) => update.includes(x) && update.includes(y));
        if (!isValidUpdate(update, relevantRules)) {
            const corrected = correctOrder(update, relevantRules);
            const middlePage = corrected[Math.floor(corrected.length / 2)];
            sumMiddle += middlePage;
        }
    });

    console.log(sumMiddle);
});
