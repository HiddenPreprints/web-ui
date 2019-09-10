const _ = require('lodash');

const api = require('../lib/api');
const mappers = require('../lib/mappers');

module.exports = (req, res) => {
  const categoryKey = _.get(req, 'params.category');
  const query = _.get(req, 'query.query');
  const categoriesData = res.locals.categories;

  const category = _.find(categoriesData, { key: categoryKey });

  return api.getArticles({ query, category: categoryKey }, (queryErr, queryResults) => {
    const results = queryResults;

    results.articles = _.map(results.articles, (art) => {
      art.ui_class = mappers.getShadowIndexUIClass(art);
      art.category_display = mappers.mapCategoryToDisplayName(art.category, categoriesData);
      return art;
    });

    const context = {
      query,
      category,
      categories: categoriesData,
      resultsTotal: results && results.total ? results.total : 0,
      resultsDisplayed: results && results.articles ? results.articles.length : 0,
      results: results && results.articles ? results.articles : [],
    };

    return res.render('search-results', context);
  });
};
