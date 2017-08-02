import _ from 'lodash';
import { getWeatherForCity, filterWeatherData, getWeatherForList } from './weather/weather';
import { getCountriesList, checkContinent } from './country/country';


let countriesList = [];
let weatherList = [];

const getCountries = (req, res, next) => {
  const continent = req.params.continent || 'americas';
  const check = checkContinent(continent.toLowerCase());
  if (!check.result) {
    res.status(400).send(`continent need to be [${check.options.join(',')}]`);
  } else {
    getCountriesList(continent)
      .then((response) => {
        const data = response.data;
        countriesList = data;
        res.status(200).send(countriesList);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }
};

const getWeather = (req, res, next) => {
  const capital = req.params.capital;
  if (capital) {
    getWeatherForCity(capital.toLowerCase())
      .then((response) => {
        let data = response.data;
        data = filterWeatherData(data);
        res.status(200).send(data);
      }).catch((error) => {
        res.status(400).send(error);
      });
  } else if (!_.isEmpty(countriesList)) {
    getWeatherForList(countriesList)
      .then((data) => {
        weatherList = _.orderBy(data, ['country'], ['asc']);
        res.status(200).send(weatherList);
      }).catch((error) => { res.status(400).send(error); });
  } else {
    res.status(400).send('countriesList empty Please run /api/v1/countries/ or try /api/v1/weather/:city');
  }
};

const getfilter = (req, res) => {
/*
  if (_.isEmpty(weatherList)) {
    res.status(400).send('weatherList empty Please run /api/v1/weather/');
    return;
  }
*/

  const { type, filter } = req.body;
  if (type.toLowerCase() === 'Continent') {
    res.status(400).send('type need to be Continent');
    return;
  }
  if (!_.isEmpty(countriesList)) {
    getWeatherForList(countriesList)
      .then((data) => {
        weatherList = _.orderBy(data, ['country'], ['asc']);
        const { temp, weather } = filter;
        const maxTemp = temp.max;
        const minTemp = temp.min;
        const filterData = _.filter(weatherList, ({ forecast, temperature }) =>
          (forecast.toLowerCase() === weather.toLowerCase())
           && (temperature <= maxTemp) && (temperature >= minTemp),
        );
        res.status(200).send(_.orderBy(filterData, ['country'], ['asc']))
      }).catch((error) => { res.status(400).send(error); });
  } else {
    res.status(400).send('countriesList empty Please run /api/v1/countries/');
  }
};


export { getWeather, getCountries, getfilter }
