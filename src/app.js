const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Koala'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Koala'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Koala',
    helpText: 'This is some helpful text.'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }

  res.send({
    forecast: 'It is snowing',
    location: 'Philadelphia',
    address: req.query.address
  });
});

app.get('/products', (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Koala',
    errorMessage: 'Help article not found.'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Koala',
    errorMessage: 'Page not found.'
  });
});

app.listen(port, () => {
  console.log('Server is up on port 3000.');
});