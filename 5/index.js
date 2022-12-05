const fs = require('fs');
const path = require('path');

module.exports = (() => {
    const file = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');

    const parts = file.split("\n");

    const findSeparatorIndex = parts.findIndex((v) => v.startsWith(' 1'));

    const separatorIndexes = parts[findSeparatorIndex].trim().split(' ').filter((v) => !!v).map((v) => parts[findSeparatorIndex].indexOf(v));
    
    // Build stacks
    const stacks = [];
    separatorIndexes.forEach((i) => {
        const stack = [];
        for(let x = 0; x < findSeparatorIndex; x++) {
            if(parts[x][i].trim()) {
                stack.push(parts[x][i]);
            }
        }

        stacks.push(stack);
    });

    const stacks2 = [...stacks];

    // TODO: Should probably clean up this code somewhat... kinda hacked together, but at least it works
    for(let x = findSeparatorIndex + 2; x < parts.length; x++) {
        const matches = parts[x].match(/^move ([0-9]+) from ([0-9]+) to ([0-9]+)$/);
        const [a, b, c] = matches.slice(1, 4);

        for(let y = 0; y < a; y++) {
            stacks[Number(c) - 1] = [
                stacks[Number(b) - 1][0],
                ...stacks[Number(c) - 1],
            ];
            stacks[Number(b) - 1] = stacks[Number(b) - 1].slice(1);
        }
        
        stacks2[Number(c) - 1] = [
            ...stacks2[Number(b) - 1].slice(0, Number(a)),
            ...stacks2[Number(c) - 1],
        ];
        
        stacks2[Number(b) - 1] = stacks2[Number(b) - 1].slice(Number(a));
    }

    const letters = stacks.map((v) => v[0]).join('');
    const letters2 = stacks2.map((v) => v[0]).join('');

    console.log(`Part 1: ${letters}`);
    console.log(`Part 2: ${letters2}`);
})();