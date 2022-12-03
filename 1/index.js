const fs = require('fs');
const path = require('path');

module.exports = (() => {
    const file = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');

    const groups = file.split("\n\n");

    const totalCalories = groups.map((g) => g.split("\n").reduce((a, b) => Number(a) + Number(b) , 0));

    console.log(`Part 1: ${Math.max(...totalCalories)}`);

    const sortedCalories = totalCalories.sort((a, b) => a > b ? -1 : 1);

    const part2 = sortedCalories[0] + sortedCalories[1] + sortedCalories[2];

    console.log(`Part 2: ${part2}`);
})();