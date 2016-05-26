'use strict';

var expect = require('./test-helper').expect,
    sinon = require('sinon'),
    _ = require('..');

describe('seal', function() {
    it('should seal when given just a max args count', function() {
        var spyFn = sinon.spy(),
            sealedFn = _.seal(spyFn, 2);

        sealedFn(1, 2, 3, 4);

        expect(spyFn).to.have.been.calledWithExactly(1, 2);
    });

    it('should reject invalid values for max args count', function() {
        expect(_.partial(_.seal, _.noop, 'str')).to.throw(/string str/);
        expect(_.partial(_.seal, _.noop, -1)).to.throw(/-1/);
    });

    it('should seal when given partialLeft args', function() {
        var spyFn = sinon.spy(),
            sealedFn = _.seal(spyFn, [1, 2], 2);

        sealedFn(3, 4, 5, 6);

        expect(spyFn).to.have.been.calledWithExactly(1, 2, 3, 4);
    });

    it('should seal when given partialRight args', function() {
        var spyFn = sinon.spy(),
            sealedFn = _.seal(spyFn, 2, [3, 4]);

        sealedFn(1, 2, 3, 4, 5, 6, 7);

        expect(spyFn).to.have.been.calledWithExactly(1, 2, 3, 4);
    });

    it('should seal when given partialLeft and partialRight args', function() {
        var spyFn = sinon.spy(),
            sealedFn = _.seal(spyFn, [1, 2], 2, [5, 6]);

        sealedFn(3, 4, 5, 6, 7);

        expect(spyFn).to.have.been.calledWithExactly(1, 2, 3, 4, 5, 6);
    });

    it('should seal bound to provided thisArg', function() {
        var thisArg = {
                foo: _.noop
            },
            spyFn = sinon.spy(),
            sealedFn = _.seal(spyFn, 2, thisArg);

        sealedFn(1, 2, 3, 4);

        expect(spyFn).to.have.been.calledWithExactly(1, 2);
        expect(spyFn).to.have.been.calledOn(thisArg);
    });
});
