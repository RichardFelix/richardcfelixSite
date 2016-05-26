'use strict';

var _ = require('lodash');

function mapKeys(object, callback, thisArg) {
    var keyValPairs = _.pairs(object),
        keys = _.pluck(keyValPairs, 0),
        vals = _.pluck(keyValPairs, 1);

    return _.zipObject(_.map(keys, callback, thisArg), vals);
}

module.exports = mapKeys;
