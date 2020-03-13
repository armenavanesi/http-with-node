const axios = require('axios');
const fs = require('fs');

// GET request used:
axios({
  method: 'get',
  url : 'http://www.google.com',
  responseType: 'stream'
})
.then((response) => {
  response.data.pipe(fs.createWriteStream('google.html'));
})
.catch((error) => {
  console.error(error);
});

// POST request used:
axios({
  method: 'post',
  url : 'http://localhost:8080/users',
  data: {
    userNames: ['dannyt100', 'freddyv100']
  },
  transformRequest: (data, headers) => {
    const newData = data.userNames.map((userName) => {
      return userName + '!';
    });
    return JSON.stringify(newData);
  }
})
.then((response) => {
  console.log(response);
})
.catch((error) => {
  console.error(error);
});

const getMetadata = () => {
  return axios.get('http://localhost:8080/metadata?id=1');
};

const getMetadataAgain = () => {
  return axios.get('http://localhost:8080/metadata?id=1');
};

// Making concurrent requests:
axios.all([
  getMetadata(), getMetadataAgain()
]).then((responseArray) => {
  console.log(responseArray[0].data.description);
  console.log(responseArray[1].data.description);
});
