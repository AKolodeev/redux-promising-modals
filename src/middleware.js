import { PUSH_MODAL_WINDOW, INSERT_MODAL_WINDOW, POP_MODAL_WINDOW, SHIFT_MODAL_WINDOW, CLEAR_MODAL_WINDOWS } from './ActionTypes';

export default () => next => {
    const resolveFunctions = [];
    const actionsHandlers = {
        [PUSH_MODAL_WINDOW]: () => new Promise(resolve => resolveFunctions.push(resolve)),
        [INSERT_MODAL_WINDOW]: () => new Promise(resolve => resolveFunctions.unshift(resolve)),
        [POP_MODAL_WINDOW]: action => {
            const values = action.payload && action.payload.values;
            const resolve = resolveFunctions.pop();

            if (typeof resolve !== 'function') return;

            resolve(values);
        },
        [SHIFT_MODAL_WINDOW]: action => {
            const values = action.payload && action.payload.values;
            const resolve = resolveFunctions.shift();

            if (typeof resolve !== 'function') return;

            resolve(values);
        },
        [CLEAR_MODAL_WINDOWS]: () => {
            resolveFunctions.forEach(resolve => resolve());
            resolveFunctions.splice(0, resolveFunctions.length);
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
