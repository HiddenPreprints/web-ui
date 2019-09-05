const _ = require('lodash');

const postgres = require('../lib/postgres');

module.exports = (req, res, next) => {

  postgres.getFakeCategories((categoriesErr, categoriesData) => {
    res.render('home', { categories: categoriesData });
  });


  // const categories = [
  //   'physiology',
  //   'evolutionary-biology',
  //   'microbiology',
  //   'systems-biology',
  //   'cell-biology',
  //   'epidemiology'
  // ];

  // res.render('home', { categories });
}
