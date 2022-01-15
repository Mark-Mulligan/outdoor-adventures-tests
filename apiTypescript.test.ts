require('dotenv').config();
import axios from 'axios';
import { calculateNumResult, calculateDataEnd, parkDataParameters, parkDataResultKeys } from './utils';
import { parksApiRouteResponse, apiTestResponse } from './customTypes';

describe('Outdoor Adventures Integration and Peformance Testing', () => {
  describe('Making sure api is up', () => {
    test('api status', async () => {
      const { status, data }: apiTestResponse = await axios.get(`${process.env.API_URL}/api/testconnection`);
      expect(status).toBe(200);
      expect(data.message).toBe('api up and running');
    });
  });

  describe('Parks route tests', () => {
    jest.setTimeout(30000);

    test.each(parkDataParameters)(`Parks route called with page: $page and limit: $limit`, async ({ page, limit }) => {
      const { status, data }: parksApiRouteResponse = await axios.get(
        `${process.env.API_URL}/api/parks?page=${page}&limit=${limit}`,
      );

      const calculatedStart = (page - 1) * limit + 1;
      const calculatedEnd = calculateDataEnd(page, limit, 465);
      const calculatedResultLength = calculateNumResult(page, limit, 465);
      expect(status).toBe(200);
      expect(data.totalPages).toBe(Math.ceil(data.totalResults / limit));
      expect(data.totalResults).toBe(465);
      expect(data.dataStart).toBe(calculatedStart);
      expect(data.dataEnd).toBe(calculatedEnd);
      expect(data.results.length).toBe(calculatedResultLength);
      data.results.forEach((result) => {
        parkDataResultKeys.forEach((key) => {
          expect(result).toHaveProperty(key);
        });
      });
    });
  });
});
