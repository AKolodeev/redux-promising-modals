import {
    PUSH_MODAL_WINDOW, INSERT_MODAL_WINDOW, POP_MODAL_WINDOW, SHIFT_MODAL_WINDOW, CLEAR_MODAL_WINDOWS,
    NEXT_MODAL_WINDOW, PREV_MODAL_WINDOW
} from './ActionTypes';
import { toArray } from './utils';

export const pushModalWindow = (types, props) => ({
    type: PUSH_MODAL_WINDOW,
    payload: {
        types: toArray(types),
        props: toArray(props)
    }
});

export const insertModalWindow = (types, props) => ({
    type: INSERT_MODAL_WINDOW,
    payload: {
        types: toArray(types),
        props: toArray(props)
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

export const nextModalWindow = () => ({
    type: NEXT_MODAL_WINDOW
});

export const prevModalWindow = () => ({
    type: PREV_MODAL_WINDOW
});
