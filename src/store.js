/* eslint prefer-const: 0 */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as reducers from '~reducers';
import rootSaga from '~sagas/_rootSaga';

let ENABLE_LOGGER = false;
// ENABLE_LOGGER = true;

const sagaMiddleware = createSagaMiddleware()
let middlewares = [thunk, sagaMiddleware];
if (ENABLE_LOGGER) {
  middlewares = [...middlewares, createLogger()];
}

const createStoreWithMiddleware = applyMiddleware(
  ...middlewares,
)(createStore);

const reducer = combineReducers(reducers);
export default createStoreWithMiddleware(reducer);

sagaMiddleware.run(rootSaga)
