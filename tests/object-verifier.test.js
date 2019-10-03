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

        it('Provides readible output for user when test fails', function () {
            const expectedOutput = `
Test values do not match. Please see output: 
----------------------------
Expected:

{
    "expected": "value"
}

Actual:

{
    "actual": "value"
}
----------------------------`;
            let actualOutput;

            try {
                verify({ actual: 'value' }, { expected: 'value' });
            } catch (e) {
                actualOutput = e.message;
            }

            assert.equal(actualOutput, expectedOutput.trim());
        });

    });
});