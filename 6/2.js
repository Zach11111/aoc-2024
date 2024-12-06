const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;

    const originalMap = data.trim().split('\n').map(row => row.split(''));
    const rows = originalMap.length;
    const cols = originalMap[0].length;

    const directions = [
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 }
    ];

    let startX, startY;
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (originalMap[y][x] === '^') {
                startX = x;
                startY = y;
            }
        }
    }

    const isLooping = (map, x, y) => {
        let visited = new Set();
        let currentX = x, currentY = y, currentDir = 0;

        while (true) {
            const { dx, dy } = directions[currentDir];
            const nextX = currentX + dx;
            const nextY = currentY + dy;

            if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) {
                return false;
            }

            if (map[nextY][nextX] === '#') {
                currentDir = (currentDir + 1) % 4;
            } else {
                currentX = nextX;
                currentY = nextY;

                const position = `${currentX},${currentY}`;
                if (visited.has(position)) {
                    return true;
                }
                visited.add(position);
            }
        }
    };

    const possibleObstructionPositions = [];
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (
                originalMap[y][x] === '.' && 
                !(x === startX && y === startY)
            ) {
                const testMap = originalMap.map(row => row.slice());
                testMap[y][x] = '#';
                if (isLooping(testMap, startX, startY)) {
                    possibleObstructionPositions.push([x, y]);
                }
            }
        }
    }

    console.log(`Number of possible positions for new obstruction: ${possibleObstructionPositions.length}`);
});
