const _ = require('lodash');

module.exports = (req, res, next) => {
  const userInput = _.get(req, 'query', {});
  const context = {
    resultsTotal: userInput.resultsTotal || 0,
    query: userInput.query || 0
  };
  res.render('search-results', context);
}
