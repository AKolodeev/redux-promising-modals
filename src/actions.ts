import {
    CLEAR_MODAL_WINDOWS,
    INSERT_MODAL_WINDOW,
    NEXT_MODAL_WINDOW,
    POP_MODAL_WINDOW,
    PREV_MODAL_WINDOW,
    PUSH_MODAL_WINDOW,
    SHIFT_MODAL_WINDOW
} from './actionTypes';
import { toArray } from './utils';

export const pushModalWindow = (types, props) => ({
    type: PUSH_MODAL_WINDOW,
    payload: {
        types: toArray(types),
        props: toArray(props)
    }
});
export type pushModalWindow = typeof pushModalWindow;

export const insertModalWindow = (types, props) => ({
    type: INSERT_MODAL_WINDOW,
    payload: {
        types: toArray(types),
        props: toArray(props)
    }
});
export type insertModalWindow = typeof insertModalWindow;

export const popModalWindow = (values) => ({
    type: POP_MODAL_WINDOW,
    payload: {
        values
    }
});
export type popModalWindow = typeof popModalWindow;

export const shiftModalWindow = (values) => ({
    type: SHIFT_MODAL_WINDOW,
    payload: {
        values
    }
});
export type shiftModalWindow = typeof shiftModalWindow;

export const clearModalWindows = () => ({
    type: CLEAR_MODAL_WINDOWS
});
export type clearModalWindows = typeof clearModalWindows;

export const nextModalWindow = () => ({
    type: NEXT_MODAL_WINDOW
});
export type nextModalWindow = typeof nextModalWindow;

export const prevModalWindow = () => ({
    type: PREV_MODAL_WINDOW
});
export type prevModalWindow = typeof prevModalWindow;
