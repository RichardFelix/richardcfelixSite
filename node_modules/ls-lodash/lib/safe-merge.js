'use strict';

var _ = require('lodash');

function safeMerge() {
    var mergeArgList = [{}].concat(_.toArray(arguments));

    return _.merge.apply(null, mergeArgList);
}

module.exports = safeMerge;
