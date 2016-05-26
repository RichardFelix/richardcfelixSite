'use strict';

var expect = require('./test-helper').expect,
    sinon = require('sinon'),
    _ = require('..');

describe('currySeal', function() {
    it('should seal when given a max args count', function() {
        var spyFn = sinon.spy(),
            sealedFn = _.currySeal(spyFn, 2);

        sealedFn(1)(2, 3, 4);

        expect(spyFn).to.have.been.calledWithExactly(1, 2);
    });
});
