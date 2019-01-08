import { assert } from 'chai';
import { describe, it } from 'mocha';

import * as utils from '../src/utils';

describe('utils tests', () => {
    describe('safelyResolveWithActionValues', () => {
        const func = (param) => param * 10;
        const action = { payload: { values: 20 } };

        it('should return the same value as function invoked with payload\'s values', () => {
            assert.deepEqual(func(action.payload.values), utils.safelyResolveWithActionValues(func, action));
        });

        it('should return false when invoked with non-function argument', () =>
            assert.isFalse(utils.safelyResolveWithActionValues(undefined, action))
        );
    });

    describe('getActionValues', () => {
        const action = { payload: { values: 12 } };

        it('should return undefined if payload is not specified', () =>
            assert.isUndefined(utils.getActionValues({}))
        );

        it('should return values if payload is specified in action', () =>
            assert.deepEqual(action.payload.values, utils.getActionValues(action))
        );
    });

    describe('rotate functions', () => {
        it('should not mutate argument', () => {
            const data = [1, 2, 3];
            const dataCopy = data.slice();

            utils.rotateClockwise(data);
            utils.rotateCounterClockwise(data);

            assert.deepEqual(dataCopy, data);
        });

        it('rotateClockwise should make last element first', () => {
            const testData1 = [1, 2, 3, 4, 5];
            const expectedResult1 = [5, 1, 2, 3, 4];
            const testData2 = [1];
            const expectedResult2 = [1];

            assert.deepEqual(expectedResult1, utils.rotateClockwise(testData1));
            assert.deepEqual(expectedResult2, utils.rotateClockwise(testData2));
        });

        it('rotateCounterClockwise should make first element last', () => {
            const testData1 = [1, 2, 3, 4, 5];
            const expectedResult1 = [2, 3, 4, 5, 1];
            const testData2 = [1];
            const expectedResult2 = [1];

            assert.deepEqual(expectedResult1, utils.rotateCounterClockwise(testData1));
            assert.deepEqual(expectedResult2, utils.rotateCounterClockwise(testData2));
        });
    });

    describe('toArray', () => {
        it('converts single element into array', () => {
            const elem = 'Hello';
            const arrayOfElements = [elem, elem];

            assert.isArray(utils.toArray(elem));
            assert.isArray(utils.toArray(arrayOfElements));
        });
    });
});
