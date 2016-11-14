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
});
