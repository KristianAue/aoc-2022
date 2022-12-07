const fs = require('fs');
const path = require('path');

module.exports = (() => {
    const file = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');

    const parts = file.split('');

    let found1 = null;
    let found2 = null;
    for(let x = 0; x <= parts.length; x++) {
        const string1 = file.substring(x - 4, x);
        const string2 = file.substring(x - 14, x);

        if(found1 === null && string1.length === 4 && (new Set(string1.split(''))).size === 4) {
            found1 = x;
        }

        if(found2 === null && string2.length === 14 && (new Set(string2.split(''))).size === 14) {
            found2 = x;
        }

        if(found1 && found2) {
            break;
        }
    }

    console.log(`Part 1: ${found1}`);
    console.log(`Part 1: ${found2}`);
})();