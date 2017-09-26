import { createStore, applyMiddleware, compose } from 'redux';
import { modalsMiddleware } from 'redux-promising-modals';
import appReducer from './app.reducer';
import appDevTools from './app.devTools';

const enhancer = compose(
    applyMiddleware(modalsMiddleware),
    appDevTools.instrument()
);

export default createStore(appReducer, enhancer);
