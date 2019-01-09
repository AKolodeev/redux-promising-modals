import { Middleware } from 'redux';

import { ModalsActionManager } from './ModalsActionManager';

export const modalsMiddleware: Middleware = () => (next) => {
    const manager = ModalsActionManager.getInstance();

    return (action) => {
        if (manager.shouldHandleAction(action)) {
            next(action);
            return manager.handleModalAction(action);
        }

        return next(action);
    };
};
