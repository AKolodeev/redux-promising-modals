import { combineReducers } from 'redux';
import { modalsReducer } from 'redux-promising-modals';

export interface IAppState {
    modals: any;
}

export default combineReducers<IAppState>({
    modals: modalsReducer
});
