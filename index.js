const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    let parseURL = req.url.split('/');
    parseURL[0] = '.';
    let fileName = parseURL[parseURL.length - 1];
    let extenstion = fileName.match(/\.(\w+)$/g);
    if (extenstion) {
        switch (extenstion[0]) {
            case '.js':
                res.writeHead(200, { 'content-type': 'text/javascript; charset=utf-8' });
                return fs.createReadStream(parseURL.join('/')).pipe(res);
            case '.css':
                res.writeHead(200, { 'content-type': 'text/css; charset=utf-8' });
                return fs.createReadStream(parseURL.join('/')).pipe(res);
            case '.png':
            case '.jpg':
                res.writeHead(200, { 'content-type': 'image/jpeg; charset=utf-8' });
                return fs.createReadStream(parseURL.join('/')).pipe(res);
            case '.htm':
            case '.html':
                res.writeHead(200, { 'content-type': 'text/html charset=utf-8' });
                return fs.createReadStream(parseURL.join('/')).pipe(res);
            default:
                res.writeHead(404);
                res.end();
        }
    } else {
        let html = fs.readFile(__dirname + '/index.html', function (err, data) {
            if (err) {
                return console.log(err);
            }
            res.writeHead(200, { 'content-type': 'text/html charset=utf-8' });
            return res.end(data);
        });
    }
}).listen(1234);