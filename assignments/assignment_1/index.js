function getNameFromCommandLine() {
    return process.argv[5];  
}

function getNameFromEnv() {
    return process.env.name;
}
function getNameFromReadLine() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })
    readline.question('', (input) => {input,
    readline.close()})    
}


module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}

