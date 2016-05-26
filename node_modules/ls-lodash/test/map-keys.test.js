'use strict';

var expect = require('./test-helper').expect,
    _ = require('..');

describe('mapKeys', function() {
    function makeTestContext() {
        var originalObject = {
            key1: 'value one',
            key2: function() {},
            key3: {},
            key4: 42,
            key5: null,
            key6: undefined,
            key7: []
        },
            mapFn = function(str) { return str + '_' + str; },
            mapKeyedObject = _.mapKeys(originalObject, mapFn);

        return {
            originalObject: originalObject,
            mapKeyedObject: mapKeyedObject,
            mapFn: mapFn
        };
    }

    it('should not affect values', function() {
        var context = makeTestContext(),
            originalObjectValues = _.values(context.originalObject),
            mapKeyedObjectValues = _.values(context.mapKeyedObject),
            valDiff = _.difference(originalObjectValues, mapKeyedObjectValues);

        expect(originalObjectValues.length).to.equal(mapKeyedObjectValues.length);
        expect(valDiff).to.deep.equal([]);
    });

    it('should run map function on all keys', function() {
        var context = makeTestContext(),
            mapKeyedObjectKeys = Object.keys(context.mapKeyedObject),
            expectedKeys = _.map(Object.keys(context.originalObject), context.mapFn),
            keyDiff = _.difference(mapKeyedObjectKeys, expectedKeys);

        expect(mapKeyedObjectKeys.length).to.equal(expectedKeys.length);
        expect(keyDiff).to.deep.equal([]);
    });
});
