const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;

    const map = data.trim().split('\n').map(row => row.split(''));
    const rows = map.length;
    const cols = map[0].length;
    const visited = new Set();

    let directions = [
        { dx: 0, dy: -1 }, // Up
        { dx: 1, dy: 0 },  // Right
        { dx: 0, dy: 1 },  // Down
        { dx: -1, dy: 0 }  // Left
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

    console.log(`Starting patrol from (${x}, ${y})`);

    while (true) {
        const { dx, dy } = directions[currentDir];
        const nextX = x + dx;
        const nextY = y + dy;

        if (
            nextX < 0 || nextX >= cols ||
            nextY < 0 || nextY >= rows
        ) {
            console.log(`Left the map at (${x}, ${y}). Ending patrol.`);
            break;
        }

        if (map[nextY][nextX] === '#') {
            currentDir = (currentDir + 1) % 4;
            console.log(`Obstacle or edge at (${nextX}, ${nextY}), turning right. New direction: ${['Up', 'Right', 'Down', 'Left'][currentDir]}`);
        } else {
            x = nextX;
            y = nextY;
            if (!visited.has(`${x},${y}`)) {
                visited.add(`${x},${y}`);
                map[y][x] = 'X';
                console.log(`Moved to (${x}, ${y}), marking as visited.`);
            }
        }
    }

    console.log(`Distinct positions visited: ${visited.size}`);
});
