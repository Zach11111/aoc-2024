const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const grid = parseGrid(data);
    const result = findXMASPatterns(grid);
   
    
    console.log(result);
});



const parseGrid = (data) => data.split('\n').map(row => row.split(''));

const checkDiagonal = (tl, center, br) => 
    ['MAS', 'SAM'].includes(tl + center + br);

const findXMASPatterns = (grid) => {
    const isValidPosition = (x, y) => 
        x > 0 && x < grid.length - 1 && 
        y > 0 && y < grid[x].length - 1;

    const getXMASPattern = (x, y) => {
        const center = grid[x][y];
        
        const topLeft = grid[x - 1][y - 1];
        const bottomRight = grid[x + 1][y + 1];
        
        const topRight = grid[x - 1][y + 1];
        const bottomLeft = grid[x + 1][y - 1];

        const diag1Valid = checkDiagonal(topLeft, center, bottomRight);
        const diag2Valid = checkDiagonal(topRight, center, bottomLeft);

        return diag1Valid && diag2Valid;
    };

    let patternCount = 0;

    for (let x = 1; x < grid.length - 1; x++) {
        for (let y = 1; y < grid[x].length - 1; y++) {
            if (getXMASPattern(x, y)) {
                patternCount++;
            }
        }
    }

    return patternCount;
};

