
(function () {

    function getFunctionName(value) {
        return value.name === ''
            ? 'anonymous'
            : value.name;
    }

    function stringifyFunction(index, value) {
        if(typeof value === 'function') {
            return `[function ${getFunctionName(value)}]`;
        } else {
            return value;
        }
    }

    (function (buildVerifier) {
        const isNode = typeof module !== 'undefined'
            && typeof module.exports !== 'undefined';

        if (isNode) {
            module.exports = {
                buildVerifier
            };
        } else {
            window.objectVerifier = {
                buildVerifier
            }
        }
    })(function ({
        replacer = stringifyFunction,
        indentation = 4
    }) {

        function isInt(value) {
            return typeof value === 'number'
                && Math.floor(value) === value
                && value !== Infinity
                && value !== NaN;
        }

        const replacerIsValid = replacer === null || typeof replacer === 'function';
        const indentationIsValid = isInt(indentation) && indentation > 0;

        if (!replacerIsValid) {
            throw new Error('ObjectVerifier replacer option must be null or a function');
        }

        if (!indentationIsValid) {
            throw new Error('ObjectVerifier indentation option must be an integer > 0');
        }

        function stringify(value) {
            if (typeof value === 'string') {
                return value;
            } else if (typeof value === 'undefined') {
                return 'undefined';
            } else {
                return JSON.stringify(value, replacer, indentation);
            }
        }

        function compare(actual, expected) {
            const actualString = stringify(actual);
            const expectedString = stringify(expected);

            return actualString === expectedString;
        }

        function getComparisonOutput(actual, expected) {
            const actualString = stringify(actual);
            const expectedString = stringify(expected);

            const comparisonOutput = [
                '----------------------------',
                'Expected:',
                '',
                expectedString,
                '',
                'Actual:',
                '',
                actualString,
                '----------------------------'
            ];

            return comparisonOutput.join('\n');
        }

        function verify(actual, expected) {
            if (!compare(actual, expected)) {
                const comparisonOutput = getComparisonOutput(actual, expected);
                throw new Error(`Test values do not match. Please see output: \n${comparisonOutput}`);
            }
        }

        function buildVerifier() {
            throw new Error('Did you forget to call a buildVerifier method? Try compare, verify, or getComparisonOutput');
        }

        buildVerifier.compare = compare;
        buildVerifier.getComparisonOutput = getComparisonOutput;
        buildVerifier.verify = verify;

        return buildVerifier;

    });
})();
