import { combineReducers } from 'redux';
import { modalsReducer } from 'redux-promising-modals';

export default combineReducers({
    modals: modalsReducer
});
