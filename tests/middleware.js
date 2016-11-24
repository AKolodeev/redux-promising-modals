import { describe, it } from 'mocha';
import { assert } from 'chai';
import configureStore from 'redux-mock-store';
import modalsMiddleware from '../src/middleware';
import * as actions from '../src/actions';

const initialState = {};
const mockStore = configureStore([modalsMiddleware])(initialState);

describe('middleware tests', () => {
    it('should return a Promise if PUSH_MODAL_WINDOW ot INSERT_MODAL_WINDOW passed', () =>
        [actions.pushModalWindow(), actions.insertModalWindow()].forEach(action =>
            assert.instanceOf(mockStore.dispatch(action), Promise)
        )
    );

    it('should return an array of promises if PUSH_MODAL_WINDOW or INSERT_MODAL_WINDOW passed', () => {
        const modalsTypes = ['FirstType', 'SecondType'];
        const modalsProps = [{ prop: 'Foo' }, { anotherProp: 'bar' }];

        [actions.pushModalWindow(modalsTypes, modalsProps), actions.insertModalWindow(modalsTypes, modalsProps)]
            .forEach(action => {
                const result = mockStore.dispatch(action);

                assert.isArray(result);
                result.forEach(promise => assert.instanceOf(promise, Promise));
            });
    });
});
