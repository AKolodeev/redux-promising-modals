import { Reducer } from 'redux';

import {
    CLEAR_MODAL_WINDOWS,
    INSERT_MODAL_WINDOW,
    NEXT_MODAL_WINDOW,
    POP_MODAL_WINDOW,
    PREV_MODAL_WINDOW,
    PUSH_MODAL_WINDOW,
    SHIFT_MODAL_WINDOW
} from './actionTypes';
import { rotateClockwise, rotateCounterClockwise } from './utils';

export interface IModalsState {
    types: any[];
    props: any[];
}

export type ModalsReducer = Reducer<IModalsState>;

const initialState: IModalsState = {
    types: [],
    props: []
};

export const modalsReducer: ModalsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    const { types, props } = state;

    switch (type) {
        case PUSH_MODAL_WINDOW:
            return {
                types: types.concat(payload.types),
                props: props.concat(payload.props)
            };

        case INSERT_MODAL_WINDOW:
            return {
                types: payload.types.concat(types),
                props: payload.props.concat(props)
            };

        case POP_MODAL_WINDOW:
            return {
                types: types.slice(0, types.length - 1),
                props: props.slice(0, types.length - 1)
            };

        case SHIFT_MODAL_WINDOW:
            return {
                types: types.slice(1),
                props: props.slice(1)
            };

        case NEXT_MODAL_WINDOW:
            return {
                types: rotateCounterClockwise(types),
                props: rotateCounterClockwise(props)
            };

        case PREV_MODAL_WINDOW:
            return {
                types: rotateClockwise(types),
                props: rotateClockwise(props)
            };

        case CLEAR_MODAL_WINDOWS:
            return initialState;

        default:
            return state;
    }
};
