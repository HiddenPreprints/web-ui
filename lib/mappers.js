const _ = require('lodash');

/**
 * Determines the class to be used on the article.
 * This controls the colour to be used in SI tag.
 *
 * @param {object} art Article as returned from the API
 * @return {string} Class to be applied in the UI
 */
function getShadowIndexUIClass(art) {
  let uiClass = 'label-success';
  if (art.shadow_index < 50) {
    uiClass = 'label-warning';
  }
  if (art.shadow_index < 25) {
    uiClass = 'label-primary';
  }

  return uiClass;
}

/**
 * Determines the class to be used on the article.
 * This controls the colour to be used in SI tag.
 *
 * @param {string} key Category key from the article
 * @param {object[]} allCategories Array of categories from API
 * (should already be present in res.locals.categories)
 * @return {string} Nice, printable name for UI
 */
function mapCategoryToDisplayName(key, allCategories) {
  const catObject = _.find(allCategories, { key });

  if (catObject && catObject.name) {
    return catObject.name;
  }

  return key;
}


/**
 * Loops across all categories to set active property (boolean).
 *
 * @param {object[]} allCategories Array of categories from API
 * @param {string} activeCategoryKey Key of active category
 * @return {object[]} Array of categories with new properties stamped on them.
 */
function mapAllCategories(allCategories, activeCategoryKey) {
  const mapped = _.map(allCategories, (cat) => {
    if (!cat || !cat.key) {
      return false;
    }

    cat.active = false;

    if (cat.key === activeCategoryKey) {
      cat.active = true;
    }

    return cat;
  });

  return _.sortBy(_.uniq(_.compact(mapped)), 'name');
}
module.exports = {
  getShadowIndexUIClass,
  mapCategoryToDisplayName,
  mapAllCategories,
};
