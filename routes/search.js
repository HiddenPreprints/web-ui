const _ = require('lodash');

const api = require('../lib/api');

/**
 * Determines the class to be used on the article.
 * This controls the colour to be used in SI tag.
 *
 * @param {object} art Article as returned from the API
 * @return {string} Class to be applied in the UI
 */
function determineUIClassForArticle(art) {
  let uiClass = 'label-danger';
  if (art.shadow_index < 31) {
    uiClass = 'label-warning';
  }
  if (art.shadow_index < 16) {
    uiClass = 'label-success';
  }

  return uiClass;
}


function mapCategoryToDisplayName(cat, allCategories) {
  const catObject = _.find(allCategories, {key: cat});

  if (catObject && catObject.name) {
    return catObject.name;
  }

  return cat;
}


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

      // if (!category) {
      //   results = {
      //     total: 0,
      //     articles: []
      //   };
      // }

      results.articles = _.map(results.articles, (art) => {
        art.ui_class = determineUIClassForArticle(art);
        art.category_display = mapCategoryToDisplayName(art.category, categoriesData);
        return art;
      });
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
