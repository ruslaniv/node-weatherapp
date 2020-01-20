const req = require('request');
const googleApiKey = require('./googleApiKey');

const geocode = (address, callback) => {
  const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key='+googleApiKey + '&language=ru';
  req({url, json:true}, (error, response) => {
    if (error) {
      callback('No network connection, try again later (Google)', undefined)
    } else if (response.body.error_message) {
      callback('You must provide a location to search', undefined)
    } else if (response.body.status == "ZERO_RESULTS") {
      callback('Unable to find this location, try another location', undefined)
    } else {
      callback(undefined, {
        latitude: response.body.results[0].geometry.location.lat,
        longitude: response.body.results[0].geometry.location.lng,
        location: response.body.results[0].formatted_address,
      })}
  })
};

module.exports = geocode;

// Original geocode code
//
// let url = ('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+googleApiKey);
// req ({url:url, json:true}, (error, response) => {
//   if (error){
//     console.log('Error!')
//   } else if (response.body.error_message){
//     console.log('Some other weird error!')
//   } else {
//     const latitude = response.body.results[0].geometry.location.lat;
//     const longitude = response.body.results[0].geometry.location.lng;
//     //console.log(latitude, longitude);
//   }
// });
//