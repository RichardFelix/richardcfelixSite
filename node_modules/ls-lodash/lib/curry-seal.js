'use strict';

var _ = require('lodash'),
    seal = require('./seal');

module.exports = function currySeal(func, maxArgs) {
    return _.curry(seal(func, maxArgs), maxArgs);
};
