import { createStore, applyMiddleware } from 'redux';
import { modalsMiddleware } from 'redux-promising-modals';
import appReducer from './app.reducer';

export default createStore(appReducer,applyMiddleware(modalsMiddleware));
