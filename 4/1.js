const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const array = data.split('\n');
    let twodArray = array.map(row => row.split(''));
    
    const xmasDirections = [
        {dx: 1, dy: 0},
        {dx: -1, dy: 0},
        {dx: 0, dy: 1},
        {dx: 0, dy: -1},
        {dx: 1, dy: 1},
        {dx: -1, dy: -1},
        {dx: -1, dy: 1},
        {dx: 1, dy: -1}
    ];

    function findXmas(grid) {
        let total = 0;
        const rows = grid.length;
        const cols = grid[0].length;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                for (let direction of xmasDirections) {
                    if (checkXmas(grid, x, y, direction)) {
                        total++;
                    }
                }
            }
        }

        return total;
    }

    function checkXmas(grid, startX, startY, {dx, dy}) {
        const word = 'XMAS';
        const rows = grid.length;
        const cols = grid[0].length;

        for (let i = 0; i < word.length; i++) {
            const x = startX + i * dx;
            const y = startY + i * dy;

            if (x < 0 || x >= cols || y < 0 || y >= rows) {
                return false;
            }

            if (grid[y][x] !== word[i]) {
                return false;
            }
        }

        return true;
    }

    const total = findXmas(twodArray);
    console.log(total);
});