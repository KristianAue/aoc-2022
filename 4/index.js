const fs = require('fs');
const path = require('path');

module.exports = (() => {
    const file = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');

    const lines = file.split("\n");

    const pairs = lines.map((line) => {
        const lineParts = line.split(',');
        const parts1 = lineParts[0].split('-');
        const parts2 = lineParts[1].split('-');

        if ((Number(parts1[0]) <= Number(parts2[0]) && Number(parts1[1]) >= Number(parts2[1])) || (Number(parts1[0]) >= Number(parts2[0]) && Number(parts1[1]) <= Number(parts2[1]))) {
            return true;
        }

        return false;
    }).filter((v) => !!v);

    const pairs2 = lines.map((line) => {
        const lineParts = line.split(',');
        const parts1 = lineParts[0].split('-');
        const parts2 = lineParts[1].split('-');

        const firstNumbers = [...Array(Number(parts1[1]) - Number(parts1[0]) + 1).keys()].map((i) => i + Number(parts1[0]));
        const secondNumbers = [...Array(Number(parts2[1]) - Number(parts2[0]) + 1).keys()].map((i) => i + Number(parts2[0]));
        return firstNumbers.some((v) => secondNumbers.includes(v));
    }).filter((v) => !!v);

    console.log(`Part 1: ${pairs.length}`);
    console.log(`Part 2: ${pairs2.length}`);
})();