'use strict';

var q = require('q'),
    _ = require('lodash');

module.exports = function qFilter(coll, predicateFn, thisArg) {
    var deferred = q.defer(),
        mapFn = _.isArray(coll) ? _.map : _.mapValues;

    if (!_.isArray(coll) && !_.isObject(coll)) {
        deferred.reject(new Error('Expected array or object, got: ' + typeof coll));
        return deferred.promise;
    }

    return q.all(mapFn(coll, predicateFn, thisArg)).then(function(boolColl) {
        return _.filter(coll, function(item, id) {
            return boolColl[id];
        });
    });
};
