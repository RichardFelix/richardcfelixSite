'use strict';

var _ = require('lodash').runInContext();

// Add chainable mixins
_.mixin({
    currySeal: require('./curry-seal.js'),
    mapKeys: require('./map-keys.js'),
    qFilter: require('./q-filter.js'),
    safeMerge: require('./safe-merge'),
    seal: require('./seal')
}, {
    chain: true
});

module.exports = _;
