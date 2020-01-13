const request = require('request');
const fs = require('fs');

request('http://www.google.com', (error, response, body) => {
  console.log('body:', body);
}).pipe(fs.createWriteStream('google.html'));

fs.createReadStream(__dirname + '/payload.json')
.pipe(request.post('http://localhost:8080/users'));
