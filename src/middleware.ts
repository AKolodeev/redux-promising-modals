import { Middleware } from 'redux';

import { ResolverManager } from './ResolverManager';

export const modalsMiddleware: Middleware = () => (next) => {
    const manager = ResolverManager.getInstance();

    return (action) => {
        if (manager.shouldHandleAction(action)) {
            next(action);
            return manager.handleModalAction(action);
        }

        return next(action);
    };
};
