const http = require('http');
const services = require('./services');
const url = require('url');

const server = http.createServer();

// curl http://localhost:8080/metadata\?id\=1
// curl -H "Authorization: Bearer 123456" http://localhost:8080/metadata\?id\=1
// curl --header Content-Type:application/json --request POST --data @MOCK_DATA.json http://localhost:8080/metadata\?id\=1
// curl --header Content-Type:application/json --request POST --data @MOCK_DATA.json http://localhost:8080
server.on('request', (request, response) => {
    console.log(request.method, request.url);
    const parsedUrl = url.parse(request.url, true);
    console.log(parsedUrl);
    if (request.method == 'GET' && parsedUrl.pathname === '/metadata') {
        const { id } = parsedUrl.query;
        console.log(id);
        const metadata = services.fetchImageMetadata(id);
        console.log(metadata);
        console.log(request.headers);

    };
    
    const body = [];
    request.on('data', (chunk) => {
        //console.log('this is a chunk \n');
        //console.log(chunk.toString());
        body.push(chunk);
        }).on('end', () => {
            const parsedJSON = JSON.parse(Buffer.concat(body));
            const userName = parsedJSON[0]['userName']
            console.log(userName);
            services.createUser(userName);
        });
    });

server.listen(8080)