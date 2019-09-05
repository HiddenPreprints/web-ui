// const { Client } = require('pg');

const fakeData = require('./fakeData');
const fakeCategories = require('./fakeCategories');

/**
 * Executes a query.
 * Completely insecure prototype only - switch to using API ASAP.
 *
 * @param {string} query
 * @param {function} callback (err, data) signature
 */
// function runQuery(query, callback) {
//   const client = new Client();
//
//   client.connect();
//
//   client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//     if (err) {
//       console.log(err.stack ? err.stack : err);
//     }
//     console.log(res.rows[0].message);
//
//     client.end();
//
//     callback(null, res.rows)
//   });
// }


function getFakeResults(callback) {
  return callback(null, fakeData);
}

function getFakeCategories(callback) {
  return callback(null, fakeCategories);
}

module.exports = {
  // runQuery,
  getFakeResults,
  getFakeCategories
};
