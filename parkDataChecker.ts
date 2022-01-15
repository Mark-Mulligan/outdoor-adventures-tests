import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import fs from 'fs';
import { parksApiRouteResponse } from './customTypes';

type parkInfo = {
  name: string;
  parkcode: string;
  missingItems: string[];
};

const recordMissingData = async () => {
  try {
    const { data }: parksApiRouteResponse = await axios.get(`${process.env.API_URL}/api/parks?page=1&limit=500`);
    const result = [] as parkInfo[];

    data.results.forEach(({ fullname, parkcode, states, designation }) => {
      let parkInfo = { name: fullname, parkcode: parkcode, missingItems: [] } as parkInfo;

      if (states === '') {
        parkInfo.missingItems.push('states');
      }

      if (designation === '') {
        parkInfo.missingItems.push('designation');
      }

      if (parkInfo.missingItems.length > 0) {
        result.push(parkInfo);
      }
    });

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

recordMissingData();
