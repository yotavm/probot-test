const countriesAPI ={
  baseUrl:'https://restcountries.eu/rest/v2/',
  continentPath:'region',
  continentOptions:['africa', 'americas', 'asia', 'europe', 'oceania'],
  fields:['name','capital','alpha2Code'],
}

const openweathermapAPI = {
  citylist:require('./city.list.json'),
  baseUrl:'http://api.openweathermap.org/data/2.5/weather',
  byCityName:'q',
  units:'metric',
  appid:'09804a02d16ded1d283c1caa0023feb8', //in production i wiil use .env for secrets
}

const serverSettings={
  port:3000,
}




export {countriesAPI,openweathermapAPI,serverSettings}
