import { applyMiddleware, compose, createStore } from 'redux';
import { modalsMiddleware } from 'redux-promising-modals';
import appDevTools from './app.devTools';
import appReducer from './app.reducer';

const enhancer = compose(
    applyMiddleware(modalsMiddleware),
    appDevTools.instrument()
);

export default createStore(appReducer, enhancer);
