import { assert } from 'chai';
import { describe, it } from 'mocha';

import * as actions from '../src/actions';
import * as types from '../src/actionTypes';

describe('Action creators tests', () => {
    const actionType = 'CREATE_USER';
    const actionProps = {
        fullname: 'Alexander Kolodeev',
        age: 22
    };
    const result = {
        status: 'OK'
    };
    const actionCreators = [
        {
            name: 'pushModalWindow',
            expected: {
                type: types.PUSH_MODAL_WINDOW,
                payload: {
                    types: [actionType],
                    props: [actionProps]
                }
            },
            get result() {
                return actions.pushModalWindow(actionType, actionProps);
            }
        },
        {
            name: 'insertModalWindow',
            expected: {
                type: types.INSERT_MODAL_WINDOW,
                payload: {
                    types: [actionType],
                    props: [actionProps]
                }
            },
            get result() {
                return actions.insertModalWindow(actionType, actionProps);
            }
        },
        {
            name: 'popModalWindow',
            expected: {
                type: types.POP_MODAL_WINDOW,
                payload: {
                    values: result
                }
            },
            get result() {
                return actions.popModalWindow(result);
            }
        },
        {
            name: 'shiftModalWindow',
            expected: {
                type: types.SHIFT_MODAL_WINDOW,
                payload: {
                    values: result
                }
            },
            get result() {
                return actions.shiftModalWindow(result);
            }
        },
        {
            name: 'clearModalWindows',
            expected: {
                type: types.CLEAR_MODAL_WINDOWS
            },
            get result() {
                return actions.clearModalWindows();
            }
        },
        {
            name: 'nextModalWindow',
            expected: {
                type: types.NEXT_MODAL_WINDOW
            },
            get result() {
                return actions.nextModalWindow();
            }
        },
        {
            name: 'prevModalWindow',
            expected: {
                type: types.PREV_MODAL_WINDOW
            },
            get result() {
                return actions.prevModalWindow();
            }
        }
    ];

    actionCreators.forEach((actionCreator) => describe(actionCreator.name, () =>
        it('returns correct action object', () =>
            assert.deepEqual(actionCreator.expected, actionCreator.result)
        )
    ));
});
