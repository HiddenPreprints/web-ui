require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const path = require('path');

const config = require('./lib/config');

function startApp() {
  const app = express();
  const partialsPath = path.join(__dirname, 'views/partials');

  app.disable('x-powered-by');

  hbs.registerPartials(partialsPath);
  hbs.registerHelper('json', (input) => {
    return JSON.stringify(input, null, 2);
  });

  hbs.registerHelper('markHits', (text, needle) => {
    if (typeof needle !== 'string' || !needle.trim().length) {
      return text;
    }

    const pattern = new RegExp(needle, 'gi');
    const replacement = (hit) => `<span class="hit">${hit}</span>`;
    const newText = text.replace(pattern, replacement);

    return newText;
  });

  hbs.registerHelper('roundNumber', (input, places) => {
    // eslint-disable-next-line no-restricted-globals
    const decPlaces = !isNaN(Number(places)) ? Number(places) : 0;
    const decFactor = 10 ** decPlaces;

    return Math.round(input * decFactor) / decFactor;
  });

  // eslint-disable-next-line no-underscore-dangle
  app.engine('hbs', hbs.__express);
  app.set('view engine', 'hbs');

  app.use('/public', express.static('public'));

  app.use('/:category?', require('./routes/middleware'));

  app.get('/', (req, res) => res.render('home', res.locals));
  app.get('/about', (req, res) => res.render('about', res.locals));
  app.get('/api', (req, res) => res.render('api', res.locals));

  app.get('/:category?/search', require('./routes/search'));

  app.listen(config.appPort, () => {
    console.log(`Hidden Preprints UI listening on port ${config.appPort}`);
  });

  return app;
}

startApp();
