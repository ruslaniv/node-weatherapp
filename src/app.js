const path = require('path');
const e = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const staticPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = e();
const port = process.env.PORT || 3000;

app.use(e.static(staticPath));
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Home page',
    name: 'Ruslan',
  })
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Ruslan',
  })
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'HaLP',
    name: 'Ruslan',
  })
});

app.get('/w', (req, res) => {
  let finalResponse = {};
  if (!req.query.address) {
    return res.send({
      error: 'You must provide location to search'
    })
  }
  finalResponse.address = req.query.address;
  geocode(req.query.address, (error, {location, latitude, longitude} ={}) => { // destructuring of data=>data.location etc
    if (error) {
      return res.send({error})
    }
    finalResponse.location = location;
    forecast(latitude, longitude, (error, data) =>{
      if (error) {
        return res.send({error})
      }
      finalResponse.forecast = data;
      res.send(finalResponse)
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'This halpful HELP article will never be found'
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'This page has been lost'
  })
});

app.listen(port, () => {
});