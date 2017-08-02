import express from 'express';
import { getCountries, getWeather, getfilter } from '../controlers/main';

const api = express.Router();

api.get('/countries/:continent?', getCountries);
api.get('/weather/:capital?', getWeather);
api.post('/filter', getfilter);


export { api };
