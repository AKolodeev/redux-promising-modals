import { createStore, applyMiddleware, compose } from 'redux';
import { modalsMiddleware } from 'redux-promising-modals';

import { appReducer } from './app.reducer';
import { AppDevTools } from './app.devTools';


const enhancer = compose(
    applyMiddleware(modalsMiddleware),
    AppDevTools.instrument()
);

export const store = createStore(appReducer, enhancer);
