require('dotenv').config();

const { test, expect, describe } = require('@jest/globals');
const axios = require('axios');

const parkDataKeys = ['totalResults', 'totalPages', 'dataStart', 'dataEnd', 'currentPage', 'results'];
const parkDataResultKeys = ['fullname', 'parkcode', 'states', 'designation'];
const parkDataParameters = [
  { page: 1, limit: 10 },
  { page: 1, limit: 25 },
  { page: 1, limit: 50 },
];

describe('Outdoor Adventures Integration and Peformance Testing', () => {
  describe('Making sure api is up', () => {
    test('api status', () => {
      return axios.get(`${process.env.API_URL}/api/testconnection`).then(({ status, data }) => {
        expect(status).toBe(200);
        expect(data.message).toBe('api up and running');
      });
    });
  });

  describe('Parks route tests', () => {
    jest.setTimeout(30000);

    test.each(parkDataParameters)(`Parks route called with page: $page and limit: $limit`, ({ page, limit }) => {
      return axios.get(`${process.env.API_URL}/api/parks?page=${page}&limit=${limit}`).then(({ status, data }) => {
        expect(status).toBe(200);
        expect(data.totalPages).toBe(Math.ceil(data.totalResults / limit));
        expect(data.totalResults).toBe(465);
        expect(data.dataStart).toBe(1);
        expect(data.results.length).toBe(limit);
      });
    });
  });
});
