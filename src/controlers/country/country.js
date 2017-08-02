import axios from 'axios';
import _ from 'lodash';
import { countriesAPI } from '../../config';

const getCountriesList = (continent) => {
  const { baseUrl, continentPath, fields } = countriesAPI;
  const targetUrl = `${baseUrl}${continentPath}/${continent}`;
  return axios.get(targetUrl, {
    params: {
      fields: fields.join(';'),
    },
  });
};

const checkContinent = (continent) => {
  const { continentOptions } = countriesAPI;
  const includes = _.includes(continentOptions, continent);
  if (includes) {
    return { result: true };
  }
  return { result: false, options: continentOptions };
};

export { getCountriesList, checkContinent };
