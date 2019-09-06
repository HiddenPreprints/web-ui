const _ = require('lodash');

const api = require('../lib/api');

module.exports = (req, res, next) => {
  // return res.redirect('/search');

  api.getCategories((categoriesErr, categoriesData) => {
    res.render('about', { categories: categoriesData });
  });
}
