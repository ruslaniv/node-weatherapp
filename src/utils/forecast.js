const req = require('request');
const darkSkyApiKey = require('./keys');

const forecast = (arg_lat, arg_long, callback) => {
  url = 'https://api.darksky.net/forecast/' + darkSkyApiKey + '/'+ arg_lat +',' + arg_long + '?exclude=minutely,hourly,daily,alerts,flags&lang=ru&units=si';
  req ({url, json:true}, (error, response) => {
    if (error) {
      callback('Error from forecast', undefined)
    } else if (response.body.currently == undefined){
      callback('Error from forecast #2', undefined)
    } else {
      callback(undefined,
        //data:response.body
        'Сводка: ' + response.body.currently.summary +
        '; температура: ' + response.body.currently.temperature +
        '; ветер: ' + response.body.currently.windSpeed +
        '; ощущается как: ' + response.body.currently.apparentTemperature +
        '; осадки: ' + response.body.currently.precipType
      )
    }
  })
};

module.exports = forecast;

//Origincal forecast code
// url = ('https://api.darksky.net/forecast/47132c5005aaae5cda110432d30c6e54/'+latitude+','+longitude+'?exclude=minutely,hourly,daily,alerts,flags&lang=ru&units=si');
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
