const req = require('request');
const google_api_key = "AIzaSyC5KLwV2raFEmh5f7DeHK1xAHsMf-rdp68";

const geocode = (address, callback) => {
  // const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key='+google_api_key;
  const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key='+google_api_key;
  //console.log(url)
  req({url, json:true}, (error, response) => {
    if (error) {
      callback('Some error occurred!', undefined)
    } else if (response.body.error_message) {
      callback('Some another 0 error occurred!', undefined)
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
// let url = ('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+google_api_key);
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