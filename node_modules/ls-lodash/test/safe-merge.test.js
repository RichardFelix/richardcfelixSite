'use strict';

var expect = require('chai').expect,
    _ = require('..');

describe('safeMerge', function() {
    function makeTestContext() {
        var obj1 = {foo: 'bar'},
            obj2 = {bar: 'baz'};

        return {
            testObj1: obj1,
            testObj2: obj2
        };
    }

    it('should not mutate objects passed to it', function() {
        var context = makeTestContext(),
            mergedObj = _.safeMerge(context.testObj1, context.testObj2);

        expect(context.testObj1).to.deep.equal({foo: 'bar'});
        expect(context.testObj2).to.deep.equal({bar: 'baz'});
    });

    it('should merge args into a new object', function() {
        var context = makeTestContext(),
            mergedObj = _.safeMerge(context.testObj1, context.testObj2);

        expect(mergedObj).to.deep.equal({
            foo: 'bar',
            bar: 'baz'
        });
        expect(context.testObj1).to.not.deep.equal(mergedObj);
        expect(context.testObj2).to.not.deep.equal(mergedObj);
    });
});
