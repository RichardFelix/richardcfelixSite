'use strict';

var _ = require('lodash');

function seal(fn, preArgs, n, postArgs, thisArg) {
    var argsArray = _.rest(_.toArray(arguments)),
        prefixArgs = _.isArray(_.first(argsArray)) ? argsArray.shift() : [],
        inputMax = argsArray.shift(),
        suffixArgs = _.isArray(_.first(argsArray)) ? argsArray.shift() : [],
        thisToBind = argsArray.shift();

    if (!_.isNumber(inputMax)) {
        throw new Error('seal must provided `n` arg of type number, got: ' + typeof inputMax + ' ' + inputMax);
    }

    if (inputMax < 0) {
        throw new Error('seal must provided `n` arg >=0, got: ' + inputMax);
    }

    if (!_.isFunction(fn)) {
        throw new Error('seal must provided `fn` funtion arg, got: ' + typeof fn + ' ' + fn);
    }

    return function() {
        var truncatedArgList = _.toArray(arguments).slice(0, inputMax),
            finalArgList = prefixArgs.concat(truncatedArgList).concat(suffixArgs);

        return fn.apply(thisToBind, finalArgList);
    };
}

module.exports = seal;
