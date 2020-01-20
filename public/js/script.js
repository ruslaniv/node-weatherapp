const address = document.getElementById('location');
const forecast = document.getElementById('forecast');
const search = document.querySelector('input');
const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let location = (search.value).replace(' ', '+');
  address.textContent = 'Loading...';
  forecast.textContent = '';
  fetch('http://127.0.0.1:3000/w?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        address.textContent = data.error
      } else {
        address.textContent = data.location;
        const entries = Object.entries(data.forecast);
        for (const weatherData of entries){
          let newParagraph = document.createElement('p');
          let forecastText = document.createTextNode(weatherData[1]);
          newParagraph.appendChild(forecastText);
          forecast.appendChild(newParagraph);
          search.value = '';
          search.focus();
        }
      }
    })
  });
});
