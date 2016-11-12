import { describe, it } from 'mocha';
import { assert } from 'chai';
import { pushModalWindow, insertModalWindow, popModalWindow, shiftModalWindow, clearModalWindows } from '../actions';
import {
    PUSH_MODAL_WINDOW, INSERT_MODAL_WINDOW, POP_MODAL_WINDOW, SHIFT_MODAL_WINDOW, CLEAR_MODAL_WINDOWS
} from '../ActionTypes';

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
                type: PUSH_MODAL_WINDOW,
                payload: {
                    type: actionType,
                    props: actionProps
                }
            },
            get result() {
                return pushModalWindow(actionType, actionProps);
            }
        },
        {
            name: 'insertModalWindow',
            expected: {
                type: INSERT_MODAL_WINDOW,
                payload: {
                    type: actionType,
                    props: actionProps
                }
            },
            get result() {
                return insertModalWindow(actionType, actionProps);
            }
        },
        {
            name: 'popModalWindow',
            expected: {
                type: POP_MODAL_WINDOW,
                payload: {
                    values: result
                }
            },
            get result() {
                return popModalWindow(result);
            }
        },
        {
            name: 'shiftModalWindow',
            expected: {
                type: SHIFT_MODAL_WINDOW,
                payload: {
                    values: result
                }
            },
            get result() {
                return shiftModalWindow(result);
            }
        },
        {
            name: 'clearModalWindows',
            expected: {
                type: CLEAR_MODAL_WINDOWS,
            },
            get result() {
                return clearModalWindows();
            }
        },
    ];

    actionCreators.forEach(actionCreator => describe(actionCreator.name, () =>
        it('returns correct action object', () =>
            assert.deepEqual(actionCreator.expected, actionCreator.result)
        )
    ));
});
