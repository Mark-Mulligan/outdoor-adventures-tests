require('dotenv').config();

const { test, expect, describe } = require('@jest/globals');
const axios = require('axios');

describe('Outdoor Adventures Integration and Peformance Testing', () => {
  describe('Making sure api is up', () => {
    test('api status', () => {
      return axios
        .get(`${process.env.API_URL}/api/testconnection`)
        .then(({ status, data }) => {
          expect(status).toBe(200);
          expect(data.message).toBe('api up and running');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });

  describe('');
});
