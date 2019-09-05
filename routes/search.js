const _ = require('lodash');

const api = require('../lib/api');

module.exports = (req, res, next) => {
  const category = _.get(req, 'params.category');
  const query = _.get(req, 'query.query');

  return api.getCategories((categoriesErr, categoriesData) => {
  // return api.getFakeCategories((categoriesErr, categoriesData) => {

    return api.getArticles({ query, category }, (queryErr, queryResults) => {
    // return api.getFakeArticles(query, (queryErr, queryResults) => {
      let results = queryResults;

      const categories = _.map(categoriesData, (cat) => {
        cat.active = false; // no idea why the active property persists but whatever

        if (cat.key === category) {
          cat.active = true;
        }

        return cat;
      });

      if (!category) {
        results = {
          total: 0,
          articles: []
        };
      }

      // if (category) {
      //   console.log('applying category', category);
      //   results = _.filter(results, (item) => { return item.collection === category; });
      // }

      // if (query) {
      //   console.log('applying query', query);
      //   results = _.filter(results, (item) => { return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1; });
      // }

      const context = {
        resultsTotal: results && results.total ? results.total : 0,
        resultsDisplayed: results && results.articles ? results.articles.length : 0,
        query: query,
        category: category,
        results: results && results.articles ? results.articles : [],
        categories: categories
      };

      return res.render('search-results', context);
    });
  });

};
