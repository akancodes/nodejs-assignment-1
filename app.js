const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/users') {
        res.write('<html>');
        res.write('<head><title>Assignment 1</title></head>');
        res.write(
            '<body><ul><li>Bayram</li><li>Ozum</li><li>Orka</li><li>Zeytin</li></ul></body>'
        );
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            fs.writeFile('username.txt', username, () => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    res.write('<html>');
    res.write('<head><title>Assignment 1</title></head>');
    res.write(
        '<body><h1>Welcome the my page!</h1><form action="/create-user" method="POST"><input type="text" placeholder="Enter username" name="username"/><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    res.end();
});

server.listen(3000);
