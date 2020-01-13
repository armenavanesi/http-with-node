const http = require('http');
const services = require('../../services');
const url = require('url');
const jsonBody = require('body/json');
const fs = require('fs');

const server = http.createServer();

server.on('request', (request, response) => {
  request.on('error', (err) => {
    console.error('req err');
  });
  response.on('error', (err) => {
    console.error('req err');
  });

  const parsedUrl = url.parse(request.url, true);
  if (request.method === 'GET' && parsedUrl.pathname === '/metadata') {
    const { id } = parsedUrl.query;
    const metadata = services.fetchImageMetadata(id);
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;
    const serializedJSON = JSON.stringify(metadata);
    response.write(serializedJSON);
    response.end();
  } else if (request.method === 'POST' && parsedUrl.pathname === '/users') {
    jsonBody(request, response, (err, body) => {
      if (err) {
        console.log(err);
      } else {
        services.createUser(body['userName']);
      }
    });
  } else {
    response.writeHead(404, {
      'X-Powered-By': 'Node'
    });
    response.end();
  }
});

server.listen(8080);
