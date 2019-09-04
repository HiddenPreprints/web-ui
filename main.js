'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const path = require('path');

const config = require('./config');

const bodyJsonParser = bodyParser.json();
const bodyFormParser = bodyParser.urlencoded({ extended: true });

function startApp() {
  const app = express();
  const partialsPath = path.join(__dirname, 'views/partials');

  app.disable('x-powered-by');

  hbs.registerPartials(partialsPath);
  hbs.registerHelper('json', (input) => {
    return JSON.stringify(input, null, 2);
  });

  app.engine('hbs', hbs.__express);
  app.set('view engine', 'hbs');

  app.use('/public', express.static('public'));

  app.get('/', require('./routes/home'));
  app.get('/search', require('./routes/search'));

  app.listen(config.appPort, () => {
    console.log(`Equitable Preprints UI listening on port ${config.appPort}`);
  });

  return app;
}

startApp();
