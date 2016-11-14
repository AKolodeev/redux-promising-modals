import {
    PUSH_MODAL_WINDOW, INSERT_MODAL_WINDOW, POP_MODAL_WINDOW, SHIFT_MODAL_WINDOW, CLEAR_MODAL_WINDOWS
} from './ActionTypes';
import { safelyCallFunction, getActionValues } from './utils';

const safelyResolveAction = (resolve, action) => {
    const values = getActionValues(action);

    return safelyCallFunction(resolve)(values);
};

export default () => next => {
    const resolveFunctions = []; // сделать pop и shift
    const actionsHandlers = {
        [PUSH_MODAL_WINDOW]: (action) => !action.payload.types.length ? new Promise(resolve => resolveFunctions.push(resolve)) 
            : action.payload.props.map(prop => new Promise(resolve => resolveFunctions.push(resolve))),
        [INSERT_MODAL_WINDOW]: () => new Promise(resolve => resolveFunctions.unshift(resolve)),
        [POP_MODAL_WINDOW]: action => {
            const resolve = resolveFunctions.pop();
            safelyResolveAction(resolve, action);
        },
        [SHIFT_MODAL_WINDOW]: action => {
            const resolve = resolveFunctions.shift();
            safelyResolveAction(resolve, action);
        },
        [CLEAR_MODAL_WINDOWS]: () => {
            resolveFunctions.forEach(resolve => resolve());
            resolveFunctions.splice(0, resolveFunctions.length);
        },
        [NEXT_MODAL_WINDOW]: () => {
            const resolve = resolveFunctions.shift();
            resolveFunctions.pop(resolve)
        },
        [PREV_MODAL_WINDOW]: () => {
            const resolve = resolveFunctions.pop();
            resolveFunctions.unshift(resolve)
        }
    };

    return action => {
        const handler = actionsHandlers[action.type];

        if (typeof handler !== 'function') {
            return next(action);
        }

        next(action);
        return handler(action);
    };
};
