const request = require('request');

const config = require('./config');
const fakeData = require('./fakeData');
const fakeCategories = require('./fakeCategories');

function processResponse(data, callback) {
  try {
    const parsedBody = JSON.parse(data);
    callback(null, parsedBody);
  } catch (parseErr) {
    return callback(parseErr);
  }
}

function getArticles(query, callback) {
  let url = config.apiUrl + '/articles/?format=json';
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
