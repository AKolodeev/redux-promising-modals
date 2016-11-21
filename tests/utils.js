import { describe, it } from 'mocha';
import { assert } from 'chai';
import * as utils from '../src/utils';

describe('utils tests', () => {
    describe('safelyCallFunction', () => {
        const foo = () => 'some result';
        const bar = (firstArg, secondArg) => firstArg + secondArg;
        const firstArg = 5;
        const secondArg = 7;

        it('should return a function', () =>
            assert.isFunction(utils.safelyCallFunction(foo))
        );

        it('should return the same value as passed function when invoked again', () => {
            assert.deepEqual(foo(), utils.safelyCallFunction(foo)());
            assert.deepEqual(bar(firstArg, secondArg), utils.safelyCallFunction(bar)(firstArg, secondArg));
        });

        it('should return false when invoked with non-function argument', () =>
            assert.isFalse(utils.safelyCallFunction(firstArg)())
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

    describe('rotateArray', () => {
        it('should not mutate argument', () => {
            const data = [1, 2, 3];
            const dataCopy = data.slice();

            utils.rotateArray(data);
            utils.rotateArray(data, false);

            assert.deepEqual(dataCopy, data);
        });

        it('should make last element first', () => {
            const testData1 = [1, 2, 3, 4, 5];
            const expectedResult1 = [5, 1, 2, 3, 4];
            const testData2 = [1];
            const expectedResult2 = [1];

            assert.deepEqual(expectedResult1, utils.rotateArray(testData1));
            assert.deepEqual(expectedResult2, utils.rotateArray(testData2));
        });

        it('should make first element last', () => {
            const testData1 = [1, 2, 3, 4, 5];
            const expectedResult1 = [2, 3, 4, 5, 1];
            const testData2 = [1];
            const expectedResult2 = [1];

            assert.deepEqual(expectedResult1, utils.rotateArray(testData1, false));
            assert.deepEqual(expectedResult2, utils.rotateArray(testData2, false));
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
