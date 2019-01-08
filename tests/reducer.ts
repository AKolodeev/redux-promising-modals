import { assert } from 'chai';
import { describe, it } from 'mocha';

import { modalsReducer } from '../src';
import * as types from '../src/actionTypes';

describe('Modals reducer tests', () => {
    const firstActionType = 'CREATE_USER';
    const firstActionProps = {
        fullname: 'Alexander Kolodeev',
        age: 22
    };
    const secondActionType = 'UPLOAD_FILE';
    const secondActionProps = {
        size: '22.4 Kb',
        name: 'my_file.txt'
    };

    it('should handle PUSH_MODAL_WINDOW', () => {
        assert.deepEqual({
            types: [firstActionType],
            props: [firstActionProps]
        }, modalsReducer({
            types: [], props: []
        }, {
            type: types.PUSH_MODAL_WINDOW,
            payload: {
                types: firstActionType,
                props: firstActionProps
            }
        }));

        assert.deepEqual({
            types: [firstActionType, secondActionType],
            props: [firstActionProps, secondActionProps]
        }, modalsReducer({
            types: [firstActionType],
            props: [firstActionProps]
        }, {
            type: types.PUSH_MODAL_WINDOW,
            payload: {
                types: secondActionType,
                props: secondActionProps
            }
        }));
    });

    it('should handle INSERT_MODAL_WINDOW', () => {
        assert.deepEqual({
            types: [firstActionType],
            props: [firstActionProps]
        }, modalsReducer({
            types: [], props: []
        }, {
            type: types.INSERT_MODAL_WINDOW,
            payload: {
                types: [firstActionType],
                props: [firstActionProps]
            }
        }));

        assert.deepEqual({
            types: [secondActionType, firstActionType],
            props: [secondActionProps, firstActionProps]
        }, modalsReducer({
            types: [firstActionType], props: [firstActionProps]
        }, {
            type: types.INSERT_MODAL_WINDOW,
            payload: {
                types: [secondActionType],
                props: [secondActionProps]
            }
        }));
    });

    it('should handle POP_MODAL_WINDOW', () => {
        assert.deepEqual({
            types: [secondActionType],
            props: [secondActionProps]
        }, modalsReducer({
            types: [secondActionType, firstActionType], props: [secondActionProps, firstActionProps]
        }, {
            type: types.POP_MODAL_WINDOW,
            payload: {
                values: 'Some data'
            }
        }));

        assert.deepEqual({
            types: [],
            props: []
        }, modalsReducer({
            types: [firstActionType], props: [firstActionProps]
        }, {
            type: types.POP_MODAL_WINDOW,
            payload: {
                values: undefined
            }
        }));
    });

    it('should handle SHIFT_MODAL_WINDOW', () => {
        assert.deepEqual({
            types: [firstActionType],
            props: [firstActionProps]
        }, modalsReducer({
            types: [secondActionType, firstActionType], props: [secondActionProps, firstActionProps]
        }, {
            type: types.SHIFT_MODAL_WINDOW,
            payload: {
                values: 'Some data'
            }
        }));

        assert.deepEqual({
            types: [],
            props: []
        }, modalsReducer({
            types: [firstActionType], props: [firstActionProps]
        }, {
            type: types.SHIFT_MODAL_WINDOW,
            payload: {
                values: undefined
            }
        }));
    });

    it('should handle CLEAR_MODAL_WINDOWS', () => {
        assert.deepEqual({
            types: [],
            props: []
        }, modalsReducer({
            types: [secondActionType, firstActionType], props: [secondActionProps, firstActionProps]
        }, {
            type: types.CLEAR_MODAL_WINDOWS
        }));
    });
});
