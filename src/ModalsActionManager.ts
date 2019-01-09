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

export class ModalsActionManager {
    public static getInstance() {
        if (ModalsActionManager.managerInstance) {
            return ModalsActionManager.managerInstance;
        }

        ModalsActionManager.managerInstance = new ModalsActionManager();

        return ModalsActionManager.managerInstance;
    }
    private static managerInstance: ModalsActionManager | undefined;

    private resolvers: Resolver[];
    private readonly handlersLookupTable;

    private constructor() {
        this.resolvers = [];
        this.handlersLookupTable = {
            [PUSH_MODAL_WINDOW]: this.handlePushModalWindowAction,
            [INSERT_MODAL_WINDOW]: this.handleInsertModalWindowAction,
            [POP_MODAL_WINDOW]: this.handlePopModalWindowAction,
            [SHIFT_MODAL_WINDOW]: this.handleShiftModalWindowAction,
            [CLEAR_MODAL_WINDOWS]: this.handleClearModalWindowAction,
            [NEXT_MODAL_WINDOW]: this.handleNextModalWindowAction,
            [PREV_MODAL_WINDOW]: this.handlePrevModalWindowAction
        };
    }

    public shouldHandleAction(action: Action) {
        return typeof this.handlersLookupTable[action.type] === 'function';
    }

    public handleModalAction(action: Action) {
        return this.handlersLookupTable[action.type](action);
    }

    private handlePushModalWindowAction = (action) => {
        const newPromises = action.payload.types.map(() =>
            new Promise((resolve) => this.resolvers.push(resolve))
        );
        return newPromises.length === 1 ? newPromises.shift() : newPromises;
    }

    private handleInsertModalWindowAction = (action) => {
        const newPromises = action.payload.types.map(() =>
            new Promise((resolve) => this.resolvers.unshift(resolve))
        );
        return newPromises.length === 1 ? newPromises.shift() : newPromises;
    }

    private handlePopModalWindowAction = (action) => {
        const resolve = this.resolvers.pop();
        safelyResolveWithActionValues(resolve, action);
    }

    private handleShiftModalWindowAction = (action) => {
        const resolve = this.resolvers.shift();
        safelyResolveWithActionValues(resolve, action);
    }

    private handleClearModalWindowAction = () => {
        this.resolvers.forEach((resolve) => resolve());
        this.resolvers.splice(0, this.resolvers.length);
    }

    private handleNextModalWindowAction = () => {
        this.resolvers = rotateCounterClockwise(this.resolvers);
    }

    private handlePrevModalWindowAction = () => {
        this.resolvers = rotateClockwise(this.resolvers);
    }
}
