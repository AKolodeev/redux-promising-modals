import {
    PUSH_MODAL_WINDOW, INSERT_MODAL_WINDOW, POP_MODAL_WINDOW, SHIFT_MODAL_WINDOW, CLEAR_MODAL_WINDOWS
} from './ActionTypes';

export const pushModalWindow = (type, props) => ({
    type: PUSH_MODAL_WINDOW,
    payload: {
        type,
        props
    }
});

export const insertModalWindow = (type, props) => ({
    type: INSERT_MODAL_WINDOW,
    payload: {
        type,
        props
    }
});

export const popModalWindow = values => ({
    type: POP_MODAL_WINDOW,
    payload: {
        values
    }
});

export const shiftModalWindow = values => ({
    type: SHIFT_MODAL_WINDOW,
    payload: {
        values
    }
});

export const clearModalWindows = () => ({
    type: CLEAR_MODAL_WINDOWS
});
