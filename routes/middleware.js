const api = require('../lib/api');

module.exports = (req, res, next) => {
  api.getCategories((categoriesErr, categoriesData) => {
    if (categoriesErr || !categoriesData) {
      const error = categoriesErr || new Error('No data returned from the service.');
      return next(error);
    }

    res.locals.categories = categoriesData;
    return next();
  });
};
