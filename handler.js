'use strict';
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var AWS = require('aws-sdk');
var extend = require('extend');
var _ = require('lodash');

// all valid states
var states = {
  OK: 'OK',
  WARNING: 'WARNING',
  CRITICAL: 'CRITICAL'
};

var fakeItems = [
  { key: 'staging_up', state: states.OK, message: 'All OK', updatedAt: 1 },
  { key: 'production_up', state: states.OK, message: 'All OK', updatedAt: 1 },
  { key: 'production_job_queue', state: states.WARNING, message: '1000 items, nearing limit', updatedAt: 1 },
  { key: 'production_sns_queue', state: states.CRITICAL, message: 'Way too many items!', updatedAt: 1 },
];

var listTemplate = _.template(fs.readFileSync(path.join(__dirname, 'client/template.html')));

var defaultHeaders =  {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Content-Type": "application/json"
};

var getItems = (queryParams) => {
  return new Promise((resolve, reject) => {
    if (queryParams && queryParams.q) {
      resolve(_.filter(fakeItems, (s) => s.key.indexOf(queryParams.q) > -1));
    } else if (queryParams && queryParams.state) {
      resolve(_.filter(fakeItems, (s) => s.state == queryParams.state));
    } else {
      resolve(fakeItems);
    }
  });
}

var list = (event, context, cb) => {
  var queryParams = event.queryStringParameters;
  return getItems(queryParams)
    .then((items) => {
      cb(null, {
        statusCode: 200,
        headers: extend(defaultHeaders, { 'Content-Type': 'text/html' }),
        body: listTemplate({
          title: process.env.SERVICE_NAME || 'Status Server',
          queryFilter: queryParams && queryParams.q,
          stateFilter: queryParams && queryParams.state,
          statuses: items
        })
      })
    })
    .catch((e) => {
      cb(e, { statusCode: 500 });
    });
};

var update = (event, context, cb) => {
  cb(null, {
    statusCode: 200,
    heades: defaultHeaders,
    body: JSON.stringify('OK')
  })
};

module.exports = {
  list,
  update
}
