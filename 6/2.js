const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;

    const map = data.trim().split('\n').map(row => row.split(''));
    const rows = map.length;
    const cols = map[0].length;
    const visited = new Set();

    let directions = [
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 }
    ];
    let currentDir = 0;

    let startX, startY;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (map[y][x] === '^') {
                startX = x;
                startY = y;
            }
        }
    }

    let x = startX, y = startY;
    visited.add(`${x},${y}`);
    map[y][x] = 'X';

    while (true) {
        const { dx, dy } = directions[currentDir];
        const nextX = x + dx;
        const nextY = y + dy;

        if (
            nextX < 0 || nextX >= cols ||
            nextY < 0 || nextY >= rows
        ) {
            break;
        }

        if (map[nextY][nextX] === '#') {
            currentDir = (currentDir + 1) % 4;
        } else {
            x = nextX;
            y = nextY;
            if (!visited.has(`${x},${y}`)) {
                visited.add(`${x},${y}`);
                map[y][x] = 'X';
            }
        }
    }

    console.log(`Distinct positions visited: ${visited.size}`);

    const testObstructionPlacement = (map, x, y) => {
        const modifiedMap = map.map(row => row.slice());
        modifiedMap[y][x] = '#';

        const newVisited = new Set();
        let newX = startX, newY = startY;
        let newDir = 0;

        newVisited.add(`${newX},${newY}`);

        while (true) {
            const { dx, dy } = directions[newDir];
            const nextX = newX + dx;
            const nextY = newY + dy;

            if (
                nextX < 0 || nextX >= cols ||
                nextY < 0 || nextY >= rows
            ) {
                return false;
            }

            if (modifiedMap[nextY][nextX] === '#') {
                newDir = (newDir + 1) % 4;
            } else {
                newX = nextX;
                newY = nextY;
                const positionKey = `${newX},${newY},${newDir}`;

                if (newVisited.has(positionKey)) {
                    return true;
                }

                newVisited.add(positionKey);
            }
        }
    };

    let obstructionCount = 0;

    visited.forEach((pos) => {
        const [visitedX, visitedY] = pos.split(',').map(Number);
        if (visitedX !== startX || visitedY !== startY) {
            if (testObstructionPlacement(map, visitedX, visitedY)) {
                obstructionCount++;
            }
        }
    });

    console.log(`(Part 2) Number of possible obstructions: ${obstructionCount}`);
});
