const fs = require('fs');

fs.writeFile('index.html',  "<h1>Hello World</h1>", (err) => console.log(err));

const http = require("http");
const server = http.createServer((req, res) => {
    fs.readFile('./index.html', {encoding: "utf-8"}, (err, data) => {
        res.write(data);
        res.end()
    });
})

server.listen(3000, () => console.log("server is listening"));


