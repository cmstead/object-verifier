const { assert } = require('chai');
const { verify } = require('../index').buildVerifier({});

describe('Object Verifier', function () {
    it('passes when objects match', function () {
        verify({}, {});
    });
});