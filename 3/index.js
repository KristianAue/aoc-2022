const fs = require('fs');
const path = require('path');

module.exports = (() => {
    const file = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
    
    const rucksacks = file.split("\n");

    const priorities = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6,
        g: 7,
        h: 8,
        i: 9,
        j: 10,
        k: 11,
        l: 12,
        m: 13,
        n: 14,
        o: 15,
        p: 16,
        q: 17,
        r: 18,
        s: 19,
        t: 20,
        u: 21,
        v: 22,
        w: 23,
        x: 24,
        y: 25,
        z: 26,
        A: 27,
        B: 28,
        C: 29,
        D: 30,
        E: 31,
        F: 32,
        G: 33,
        H: 34,
        I: 35,
        J: 36,
        K: 37,
        L: 38,
        M: 39,
        N: 40,
        O: 41,
        P: 42,
        Q: 43,
        R: 44,
        S: 45,
        T: 46,
        U: 47,
        V: 48,
        W: 49,
        X: 50,
        Y: 51,
        Z: 52,
    };
    const common = rucksacks.map((rucksack) => {
        const compartment1 = rucksack.substring(0, rucksack.length / 2);
        const compartment2 = rucksack.substring(rucksack.length / 2);

        const commonChars = compartment1.split('').filter((v, i, s) => compartment2.includes(v) && s.indexOf(v) === i).map((v) => priorities[v]).reduce((a, b) => a + b, 0);
        return commonChars;
    }).reduce((a, b) => a + b, 0);

    const common2 = [];
    for(let x = 0; x < rucksacks.length; x += 3) {
        common2.push(rucksacks[x].split('').filter((v, i, s) => rucksacks[x + 1].includes(v) && rucksacks[x + 2].includes(v) && s.indexOf(v) === i).map((v) => priorities[v]).reduce((a, b) => a + b, 0));
    }

    console.log(`Part 1: ${common}`);
    console.log(`Part 2: ${common2.reduce((a, b) => a + b, 0)}`);
})();