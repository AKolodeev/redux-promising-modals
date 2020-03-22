import { combineReducers } from 'redux';
import { modalsReducer, IModalsState } from 'redux-promising-modals';


export interface AppState {
    modals: IModalsState;
}

export const appReducer = combineReducers<AppState>({
    modals: modalsReducer
});
