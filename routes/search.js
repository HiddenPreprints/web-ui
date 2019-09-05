const _ = require('lodash');

const postgres = require('../lib/postgres');

module.exports = (req, res, next) => {
  const category = _.get(req, 'params.category');
  const query = _.get(req, 'query.query');

  return postgres.getFakeCategories((categoriesErr, categoriesData) => {

    return postgres.getFakeResults((queryErr, queryResults) => {
      let results = queryResults;

      const categories = _.map(categoriesData, (cat) => {
        cat.active = false; // no idea why the active property persists but whatever

        if (cat.key === category) {
          cat.active = true;
        }

        return cat;
      });


      if (category) {
        console.log('applying category', category);
        results = _.filter(results, (item) => { return item.collection === category; });
      }

      if (query) {
        console.log('applying query', query);
        results = _.filter(results, (item) => { return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1; });
      }

      const context = {
        resultsTotal: results.length || 0,
        query: query,
        category: category,
        results: results,
        categories: categories
      };

      return res.render('search-results', context);
    });
  });

};