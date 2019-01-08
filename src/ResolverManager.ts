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
import { rotateClockwise, rotateCounterClockwise, safelyResolveWithActionValues } from './utils';

type Resolver = (value?: Action) => void;

export class ResolverManager {
    public static getInstance() {
        if (ResolverManager.managerInstance) {
            return ResolverManager.managerInstance;
        }

        ResolverManager.managerInstance = new ResolverManager();

        return ResolverManager.managerInstance;
    }
    private static managerInstance: ResolverManager | undefined;

    private resolvers: Resolver[];
    private readonly handlersLookupTable;

    private constructor() {
        this.resolvers = [];
        this.handlersLookupTable = {
            [PUSH_MODAL_WINDOW]: (action) => {
                const newPromises = action.payload.types.map(() =>
                    new Promise((resolve) => this.resolvers.push(resolve))
                );
                return newPromises.length === 1 ? newPromises.shift() : newPromises;
            },
            [INSERT_MODAL_WINDOW]: (action) => {
                const newPromises = action.payload.types.map(() =>
                    new Promise((resolve) => this.resolvers.unshift(resolve))
                );
                return newPromises.length === 1 ? newPromises.shift() : newPromises;
            },
            [POP_MODAL_WINDOW]: (action) => {
                const resolve = this.resolvers.pop();
                safelyResolveWithActionValues(resolve, action);
            },
            [SHIFT_MODAL_WINDOW]: (action) => {
                const resolve = this.resolvers.shift();
                safelyResolveWithActionValues(resolve, action);
            },
            [CLEAR_MODAL_WINDOWS]: () => {
                this.resolvers.forEach((resolve) => resolve());
                this.resolvers.splice(0, this.resolvers.length);
            },
            [NEXT_MODAL_WINDOW]: () => {
                this.resolvers = rotateCounterClockwise(this.resolvers);
            },
            [PREV_MODAL_WINDOW]: () => {
                this.resolvers = rotateClockwise(this.resolvers);
            }
        };
    }

    public shouldHandleAction(action: Action) {
        return typeof this.handlersLookupTable[action.type] === 'function';
    }

    public handleModalAction(action: Action) {
        return this.handlersLookupTable[action.type](action);
    }
}
