import server from './server';
import { countriesAPI, openweathermapAPI, serverSettings } from './config';


console.log('--- PrObOt Test Service ---');


process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', (err) => {
  console.error('Unhandled Rejection', err);
});

server({
  port: serverSettings.port,
  APIs: { countriesAPI, openweathermapAPI },
}).then(() =>
  console.log(`Server started succesfully, running on port: ${serverSettings.port}.`)
);
