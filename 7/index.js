const fs = require('fs');
const path = require('path');

module.exports = (() => {
    const file = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');

    const commands = file.split('\n');

    const folderStructure = {};

    let currentFolder = ['/'];
    for(const command of commands) {
        if(command[0] === '$') {
            // New command
            const cmd = command.split(' ', 3);

            if(cmd[1] === 'cd') {
                if(cmd[2] === '/') {
                    currentFolder = ['/'];
                } else if(cmd[2] === '..') {
                    currentFolder.pop();
                } else {
                    currentFolder = [
                        ...currentFolder,
                        `${currentFolder.slice(-1)}/${cmd[2]}`,
                    ];
                }
            }
        } else {
            const fileParts = command.split(' ', 2);

            if(fileParts[0] !== 'dir') {
                for(const folder of currentFolder) {

                    if(folderStructure[folder]) {
                        folderStructure[folder] += Number(fileParts[0]);
                    } else {
                        folderStructure[folder] = Number(fileParts[0]);
                    }
                }
            }
        }
    }
    const folderStructureValues = Object.keys(folderStructure).map((v) => folderStructure[v]);

    const part1 = folderStructureValues.filter((v) => v <= 100000).reduce((a, b) => a + b, 0);
    const part2 = folderStructureValues.filter((v) => v + (70000000 - folderStructure['/']) >= 30000000).sort((a, b) => a - b).find(() => true);

    console.log(`Part 1: ${part1}`);
    console.log(`Part 2: ${part2}`);
})();