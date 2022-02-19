
function getNameFromCommandLine() {
    // Write you code here, name should be taken as args in process.argv
    const name = process.argv[5]
    return name;

}

function getNameFromEnv() {
    //write your code here
    return process.env.name;
}

function getNameFromReadLine() {
    const readline = require('readline');
    readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    readline.question('', (name) => name)
    readline.close();
}



module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}

