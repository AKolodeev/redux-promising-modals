import {
    PUSH_MODAL_WINDOW, INSERT_MODAL_WINDOW, POP_MODAL_WINDOW, SHIFT_MODAL_WINDOW, CLEAR_MODAL_WINDOWS,
    NEXT_MODAL_WINDOW, PREV_MODAL_WINDOW
} from './ActionTypes';
import { rotateArray } from './utils';

const initialState = {
    types: [],
    props: []
};

export default (state = initialState, action) => {
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
            types: rotateArray(types, false),
            props: rotateArray(props, false)
        };

    case PREV_MODAL_WINDOW:
        return {
            types: rotateArray(types),
            props: rotateArray(props)
        };

    case CLEAR_MODAL_WINDOWS:
        return initialState;

    default:
        return state;
    }
};
