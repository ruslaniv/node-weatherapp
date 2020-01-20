const path = require('path');
const e = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(__filename);
const staticPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = e();
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
    title: 'About page',
    name: 'Gido Van Rossum',
  })
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'halpful Help page',
    name: 'Gido Van Rossum',
  })
});
// app.get('', (req, res) => {
//   res.send('<h1>Hello world!</h1>')
// });
//
// app.get('/help', (req, res) => {
//   res.send({
//     page:'Help',
//     about:'halpful',
//   })
// });
//
// app.get('/about', (req, res) => {
//   res.send('This is about coming from res.send')
// });

app.get('/w', (req, res) => {
  let finalResponse = {};
  if (!req.query.address) {
    return res.send({
      error: 'You must provide address'
    })
  }
  finalResponse.address = req.query.address;
  geocode(req.query.address, (error, {location, latitude, longitude}) => { // destructuring of data=>data.location etc
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
  // res.send({
  //   address: req.query.address,
  //   temp: +27,
  //   message: 'rainy',
  // })
  //console.log('=============================' + '\n' + finalResponse);
  //res.send(finalResponse)
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'This HALP page will never be really found'
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'This page has been lost'
  })
});

app.listen(3000, () => {
  console.log('Server is up')
});