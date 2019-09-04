const _ = require('lodash');

const postgres = require('../lib/postgres');

module.exports = (req, res, next) => {
  const category = _.get(req, 'params.category');
  const query = _.get(req, 'query.query');

  return postgres.getFakeResults((queryErr, queryResults) => {
    let results = queryResults;

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
      results: results
    };

    return res.render('search-results', context);
  });
};
