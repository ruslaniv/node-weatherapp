const req = require('request');
const darkSkyApiKey = process.env.darkSkyApiKey || require('./darkSkyApiKey');

const forecast = (arg_lat, arg_long, callback) => {
  url = 'https://api.darksky.net/forecast/' + darkSkyApiKey + '/'+ arg_lat +',' + arg_long + '?exclude=minutely,hourly,daily,alerts,flags&lang=ru&units=si';
  req ({url, json:true}, (error, response) => {
    if (error) {
      callback('No network connection, try again later (DarkSky)', undefined)
    } else if (response.body.currently == undefined){
      callback('Error from forecast #2', undefined)
    } else {
      if (!response.body.currently.precipType){
        response.body.currently.precipType = 'отсутствуют'
      } else if (response.body.currently.precipType == 'snow'){
        response.body.currently.precipType = 'снег'
      } else if (response.body.currently.precipType == 'rain'){
        response.body.currently.precipType = 'дождь'
      }
      callback(undefined, {
        summary: 'Сводка: ' + response.body.currently.summary,
        temp: 'Температура: ' + response.body.currently.temperature + '\u00B0' +'C',
        wind: 'Ветер: ' + response.body.currently.windSpeed + ' м/с',
        feel: 'Ощущается как: ' + response.body.currently.apparentTemperature + '\u00B0' +'C',
        precip: 'Осадки: ' + response.body.currently.precipType,
        //summary: 'Сводка: ' + response.body.currently.summary +
        // temp: '; температура: ' + response.body.currently.temperature + '\u00B0' +'C' +
        // wind: '; ветер: ' + response.body.currently.windSpeed + ' м/с' +
        // feel: '; ощущается как: ' + response.body.currently.apparentTemperature + '\u00B0' +'C' +
        // precip: '; осадки: ' + response.body.currently.precipType
        }
      )
    }
  })
};

module.exports = forecast;

//Original forecast code
// url = ('https://api.darksky.net/forecast/' + key + '/'+latitude+','+longitude+'?exclude=minutely,hourly,daily,alerts,flags&lang=ru&units=si');
// //console.log(url);
// req ({url:url, json:true}, (error, response) => {
//   //console.log(response.body);
//   if (error) {
//     console.log('Error Number 2!')
//   } else if (response.body.currently == undefined){
//     console.log('Bad error happened!')
//   } else {
//   console.log('Сводка: ' + response.body.currently.summary +
//               '; температура: ' + response.body.currently.temperature +
//               '; ветер: ' + response.body.currently.windSpeed +
//               '; ощущается как: ' + response.body.currently.apparentTemperature +
//               '; осадки: ' + response.body.currently.precipType);
//   }
// });
