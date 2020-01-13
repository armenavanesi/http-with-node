const http = require('http');
const services = require('../../services');
const url = require('url');
const jsonBody = require('body/json');
const fs = require('fs');
const formidable = require('formidable');

const server = http.createServer();

server.on('request', (request, response) => {
  request.on('error', (err) => {
    console.error('request error');
  });
  response.on('error', (err) => {
    console.error('response error');
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
  } else if (request.method === 'POST' && parsedUrl.pathname === '/upload') {
    const form = new formidable.IncomingForm({
      uploadDir: __dirname,
      keepExtensions: true,
      multiples: true,
      maxFileSize: 5 * 1024 * 1024,
      encoding: 'utf-8',
      maxFields: 20
    });

    form.parse(request, (err, fields, files) => {
      if (err) {
        console.log(err);
        response.statusCode = 500;
        response.end("Error!");
      }
      console.log(files);
      response.statusCode = 200;
      response.end("Success!");
    });
  } else {
    fs.createReadStream("../../index.html").pipe(response);
  }
});

server.listen(8080);
