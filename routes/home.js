const _ = require('lodash');

// const api = require('../lib/api');

module.exports = (req, res, next) => {
  return res.redirect('/search');

  // api.getFakeCategories((categoriesErr, categoriesData) => {
  //   res.render('home', { categories: categoriesData });
  // });
}
