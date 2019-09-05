const request = require('request');

const config = require('./config');
const fakeData = require('./fakeData');
const fakeCategories = require('./fakeCategories');

function getArticles(query, callback) {
  let url = config.apiUrl + '/articles';
  return request.get(url, (err, response, body) => {
    if (err) {
      console.error(err);
    }
    callback(err, body);
  });
}

function getCategories(callback) {
  let url = config.apiUrl + '/categories';
  return request.get(url, (err, response, body) => {
    if (err) {
      console.error(err);
    }
    callback(err, body);
  });
}

function getFakeArticles(query, callback) {
  return callback(null, fakeData);
}

function getFakeCategories(callback) {
  return callback(null, fakeCategories);
}

module.exports = {
  // runQuery,
};


module.exports = {
  getFakeArticles,
  getFakeCategories,

  getArticles,
  getCategories
};
