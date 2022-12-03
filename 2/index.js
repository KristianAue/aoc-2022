const fs = require('fs');
const path = require('path');

module.exports = (() => {
    const file = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');

    const rounds = file.split("\n");

    // X = Rock, Y = Paper, Z = Scissors
    const map = {
        X: 1,
        Y: 2,
        Z: 3,
    };
    const scores = rounds.map((round) => {
        const r = round.split(' ');
        
        // Start by adding the score of the mapped element
        let score = map[r[1]];

        if((r[0] === 'A' && r[1] === 'Y') || (r[0] === 'B' && r[1] === 'Z') || (r[0] === 'C' && r[1] === 'X')) {
            // won
            score = score + 6;
        } else if((r[0] === 'A' && r[1] === 'X') || (r[0] === 'B' && r[1] === 'Y') || (r[0] === 'C' && r[1] === 'Z')) {
            // draw
            score = score + 3;
        }

        return score;
    }).reduce((a, b) => a + b, 0);

    const mapScores = {
        A: 1,
        B: 2,
        C: 3,
    };
    const mapLose = {
        A: 'C',
        B: 'A',
        C: 'B',
    };
    const mapWin = {
        A: 'B',
        B: 'C',
        C: 'A',
    };

    const scores2 = rounds.map((round) => {
        const r = round.split(' ');
        let score = 0;

        if(r[1] === 'X') {
            // we need to lose
            score = score + mapScores[mapLose[r[0]]];
        } else if(r[1] === 'Y') {
            // We need to draw
            score = score + mapScores[r[0]] + 3; 
        } else if(r[1] === 'Z') {
            // we need to win
            score = score + mapScores[mapWin[r[0]]] + 6;
        }

        return score;
    }).reduce((a, b) => a + b, 0);

    console.log(`Part 1: ${scores}`);
    console.log(`Part 2: ${scores2}`);
})();