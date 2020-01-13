const http = require('http');
const services = require('../../services');
const url = require('url');
const jsonBody = require('body/json');

const server = http.createServer();
server.on('request', (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  if (request.method === 'GET' && parsedUrl.pathname === '/metadata') {
    const { id } = parsedUrl.query;
    const metadata = services.fetchImageMetadata(id);
    console.log(request.headers);
  }
  jsonBody(request, response, (err, body) => {
    if (err) {
      console.log(err);
    } else {
      services.createUser(body['userName']);
    }
  });
});

server.listen(8080);
