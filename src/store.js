/* eslint prefer-const: 0 */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as reducers from '~reducers';

let ENABLE_LOGGER = false;
// ENABLE_LOGGER = true;

let middlewares = [thunk];
if (ENABLE_LOGGER) {
  middlewares = [...middlewares, createLogger()];
}

const createStoreWithMiddleware = applyMiddleware(
  ...middlewares,
)(createStore);

const reducer = combineReducers(reducers);
export default createStoreWithMiddleware(reducer);
