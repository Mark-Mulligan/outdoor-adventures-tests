require('dotenv').config();

const { test, expect, describe } = require('@jest/globals');
const axios = require('axios');

const parkDataKeys = ['totalResults', 'totalPages', 'dataStart', 'dataEnd', 'currentPage', 'results'];
const parkDataResultKeys = ['fullname', 'parkcode', 'states', 'designation'];

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

  describe('Route tests', () => {
    jest.setTimeout(30000);
    test('Park Data', () => {
      return axios
        .get(`${process.env.API_URL}/api/parks?page=1&limit=10`)
        .then(({ status, data }) => {
          expect(status).toBe(200);

          parkDataKeys.forEach((key) => {
            expect(data).toHaveProperty(key);
          });

          data.results.forEach((parkData) => {
            parkDataResultKeys.forEach((key) => {
              expect(parkData).toHaveProperty(key);
              expect(typeof parkData[key]).toBe('string');
              expect(parkData[key].length).toBeGreaterThan(0);
            });
          });
        })
        .catch((err) => {
          console.log('this ran');
          console.log(err);
        });
    });
  });
});
