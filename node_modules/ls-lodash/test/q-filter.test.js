'use strict';

var q = require('q'),
    _ = require('lodash'),
    expect = require('./test-helper').expect,
    qFilter = require('..').qFilter;

describe('q-filter', function() {
    function makeTestContext() {
        var predicateFn = function(val) {
                return q(val > 3 ? true : false);
            },
            sourceObj = {
                prop1: 1,
                prop2: 2,
                prop3: 3,
                prop4: 4,
                prop5: 5
            };

        return {
            predicateFn: predicateFn,
            sourceObj: sourceObj
        };
    }

    it('returns a promise', function() {
        return expect(qFilter([], _.noop)).to.be.fulfilled;
    });

    it('filters an array', function() {
        var result = qFilter([1, 2, 3, 4, 5],  function(val) {
                return val > 3 ? q(true) : q(false);
            });

        expect(result).to.become([4, 5]);
    });

    it('filters an object', function() {
        var context = makeTestContext(),
            result = qFilter(context.sourceObj, context.predicateFn);

        expect(result).to.become([4, 5]);
    });

    it('binds predicate to thisArg', function() {
        var context = makeTestContext(),
            thisArg = { max: 3 },
            result = qFilter(context.sourceObj, function(val) {
                return q(val > this.max ? true : false);
            }, thisArg);

        expect(result).to.become([4, 5]);
    });

    it('rejects promise when collection is not valid', function() {
        expect(qFilter(1, _.noop)).to.be.rejectedWith(/got: number/);
    });
});
