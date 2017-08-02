import axios from 'axios';
import Promise from 'bluebird';
import _ from 'lodash';
import { openweathermapAPI } from '../../config';

const getWeatherForCity = (city, country = '') => {
  if (_.isEmpty(city)) {
    return Promise.reject('city is empty');
  }
  const { baseUrl, byCityName, appid, units } = openweathermapAPI;
  const targetUrl = `${baseUrl}`;
  return Promise.resolve(axios.get(targetUrl, {
    params: {
      appid,
      units,
      [byCityName]: `${city},${country}`,
      type: 'accurate',
    },
  }));
};
const filterWeatherData = (data) => {
  const weather = {
    capital: data.name,
    forecast: data.weather[0].main,
    temperature: data.main.temp,
    country: data.sys.country
  };
  return weather;
};

const getWeatherForList = (list) => {
  const { citylist } = openweathermapAPI;
  const promiseList = _.map(list, ({ capital, alpha2Code }) => {
    const city = _.find(citylist, { name: capital, country: alpha2Code });
    if (city) {
      return getWeatherForCity(capital, alpha2Code);
    }
    return Promise.reject();
  });
  // reflect let us use promise.all with reject
  return Promise.all(promiseList.map((promise) => promise.reflect()))
    .reduce((result, inspection) => {
      if (inspection.isFulfilled()) {
        const data = filterWeatherData(inspection.value().data);
        const country = _.find(list, { alpha2Code: data.country }).name;
        data.country = country;
        result.push(data);
      }
      return result;
      // we can use this section if with else to get the reject promise;
    }, []);
};


export { getWeatherForCity, getWeatherForList, filterWeatherData};
