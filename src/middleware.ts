import { Action } from 'redux';
import {
    CLEAR_MODAL_WINDOWS,
    INSERT_MODAL_WINDOW,
    NEXT_MODAL_WINDOW,
    POP_MODAL_WINDOW,
    PREV_MODAL_WINDOW,
    PUSH_MODAL_WINDOW,
    SHIFT_MODAL_WINDOW
} from './actionTypes';
import { getActionValues, rotateArray, safelyCallFunction } from './utils';

const safelyResolveAction = (resolve, action) => {
    const values = getActionValues(action);

    return safelyCallFunction(resolve)(values);
};

type Resolver = (value?: Action) => void;

export default () => (next) => {
    let resolveFunctions: Resolver[] = [];
    const actionsHandlers = {
        [PUSH_MODAL_WINDOW]: (action) => {
            const newPromises = action.payload.types.map(() =>
                new Promise((resolve) => resolveFunctions.push(resolve))
            );
            return newPromises.length === 1 ? newPromises.shift() : newPromises;
        },
        [INSERT_MODAL_WINDOW]: (action) => {
            const newPromises = action.payload.types.map(() =>
                new Promise((resolve) => resolveFunctions.unshift(resolve))
            );
            return newPromises.length === 1 ? newPromises.shift() : newPromises;
        },
        [POP_MODAL_WINDOW]: (action) => {
            const resolve = resolveFunctions.pop();
            safelyResolveAction(resolve, action);
        },
        [SHIFT_MODAL_WINDOW]: (action) => {
            const resolve = resolveFunctions.shift();
            safelyResolveAction(resolve, action);
        },
        [CLEAR_MODAL_WINDOWS]: () => {
            resolveFunctions.forEach((resolve) => resolve());
            resolveFunctions.splice(0, resolveFunctions.length);
        },
        [NEXT_MODAL_WINDOW]: () => {
            resolveFunctions = rotateArray(resolveFunctions, false);
        },
        [PREV_MODAL_WINDOW]: () => {
            resolveFunctions = rotateArray(resolveFunctions);
        }
    };

    return (action) => {
        const handler = actionsHandlers[action.type];

        if (typeof handler !== 'function') {
            return next(action);
        }

        next(action);
        return handler(action);
    };
};
