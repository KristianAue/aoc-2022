const fs = require('fs');
const path = require('path');

module.exports = (() => {
    const file = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');

    const grid = file.split("\n").map((v) => v.split('').map((v) => Number(v)));

    let part1 = 0;
    let part2 = 0;

    for(let r = 0; r < grid.length; r++) {
        for(let c = 0; c < grid[r].length; c++) {
            const column = grid[r][c];
            if(
                grid[r].slice(0, c).every((v) => v < column) ||
                grid[r].slice(c + 1).every((v) => v < column) ||
                grid.slice(0, r).map((v) => v[c]).every((v) => v < column) ||
                grid.slice(c + 1).map((v) => v[c]).every((v) => v < column)
            ) {
                part1 += 1;
            }

            let scenic = [0, 0, 0, 0];
            // Go to the left
            for(let x = c - 1; x >= 0; x--) {
                scenic[0] += 1;
                if(grid[r][x] >= column) {
                    break;
                }
            }

            // Go to the right
            for(let x = c + 1; x < grid[r].length; x++) {
                scenic[1] += 1;
                if(grid[r][x] >= column) {
                    break;
                }
            }

            // Go up
            for(let x = r - 1; x >= 0; x--) {
                scenic[2] += 1;
                if(grid[x][c] >= column) {
                    break;
                }
            }

            // Go down
            for(let x = r + 1; x < grid.length; x++) {
                scenic[3] += 1;
                if(grid[x][c] >= column) {
                    break;
                }
            }

            part2 = Math.max(part2, scenic.slice(1).reduce((a, b) => a * b, scenic[0]));
        }
    }

    console.log(`Part 1: ${part1}`);
    console.log(`Part 2: ${part2}`);
})();