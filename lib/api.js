const _ = require('lodash');
const request = require('request');

const config = require('./config');
const fakeArticles = require('./fakeData/articles');
const fakeCategories = require('./fakeData/categories');

const useFakeData = config.useFakeData;

function processResponse(data, callback) {
  try {
    const parsedBody = JSON.parse(data);
    return callback(null, parsedBody);
  } catch (parseErr) {
    return callback(parseErr);
  }
}

function getArticles(query, callback) {
  if (useFakeData) {
    let results = fakeArticles;

    if (query.category) {
      results = _.filter(results, (item) => {
        return item.collection === query.category;
      });
    }

    if (query.query) {
      results = _.filter(results, (item) => {
        return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
    }
    return callback(null, results);
  }

  let url = config.apiUrl + '/articles/?format=json';

  if (query.category) {
    url += `&category=${query.category}`;
  }

  if (query.query) {
    url += `&query=${query.query}`;
  }

  return request.get(url, (err, response, body) => {
    if (err) {
      console.error(err);
      return callback(err);
    }

    // console.log(`Got response from ${url}`, body);
    return processResponse(body, callback);
  });
}

function getCategories(callback) {
  if (useFakeData) {
    return callback(null, fakeCategories);
  }

  let url = config.apiUrl + '/categories?format=json';
  return request.get(url, (err, response, body) => {
    if (err) {
      console.error(err);
      return callback(err);
    }

    // console.log(`Got response from ${url}`, body);
    return processResponse(body, callback);
  });
}

module.exports = {
  getArticles,
  getCategories,
};
