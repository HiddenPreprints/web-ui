const _ = require('lodash');

const api = require('../lib/api');
const mappers = require('../lib/mappers');

module.exports = (req, res, next) => {
  const categoryKey = _.get(req, 'params.category');

  api.getCategories((categoriesErr, categoriesData) => {
    if (categoriesErr || !categoriesData) {
      const error = categoriesErr || new Error('No data returned from the service.');
      return next(error);
    }

    const categories = mappers.mapAllCategories(categoriesData, categoryKey);
    res.locals.categories = categories;
    return next();
  });
};
