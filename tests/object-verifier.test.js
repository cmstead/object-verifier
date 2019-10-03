const { assert } = require('chai');
const verifierBuilder = require('../index');

describe('Object Verifier', function () {

    describe('Pass and fail cases', function () {
        let verify;

        beforeEach(function () {
            verify = verifierBuilder.buildVerifier({}).verify;
        });

        it('passes when objects match', function () {
            verify({}, {});
        });

        it('fails when objects do not match', function () {
            const verifyRunner = () => verify({}, { foo: 'bar' });

            assert.throws(verifyRunner);
        });

    });
});