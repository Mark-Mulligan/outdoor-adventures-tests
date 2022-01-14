require('dotenv').config();
const axios = require('axios');

console.log(process.env.API_URL);

axios
  .get(`${process.env.API_URL}/api/testconnection`)
  .then(({ status, data }) => {
    console.log(status);
    console.log(data);
  })
  .catch((err) => {
    console.log(err.data);
  });
