import { all, call, put, takeEvery } from 'redux-saga/effects';
import ServerDiscovery from '~lib/serverDiscovery';
import Api from '~lib/api';
import { retreiveSession } from '~storage/sessionStore';
import { deduplicateArray } from '~lib/helpers';

// TODO: Don't forget this one when removing the delay call below.
const delay = ms => new Promise(res => setTimeout(res, ms));

export const createSession = function*() {
  let activityName = 'createSession';
  yield takeEvery('CREATE_SESSION_PENDING', function*(action) {
    yield put({ type: 'NETWORKUSAGE_START', activityName });
    try {
      const result = yield call(Api.createSession, action.code);
      yield put({ type: 'CREATE_SESSION_SUCCESS', result });
    } catch(error) {
      yield put({ type: 'CREATE_SESSION_ERROR', error });
    }
    // TODO: Look and see how we can remove this delay when animation is moved
    // from native to a on-brand network indicator.
    yield call(delay, 500);
    yield put({ type: 'NETWORKUSAGE_STOP', activityName });
  });
};

export const loadSession = function*() {
  yield takeEvery('COMPATIBLE_SERVER', function*(action) {
    yield put({ type: 'LOAD_SESSION_PENDING' });
    try {
      const result = yield call(retreiveSession, action.server.serverUuid);
      if(result) {
        yield put({ type: 'LOAD_SESSION_SUCCESS', server: action.server, result });
      } else {
        yield put({ type: 'LOAD_SESSION_ERROR', error: 'No stored session for server' });
      }
    } catch(error) {
      yield put({ type: 'LOAD_SESSION_ERROR', error });
    }
  });
};
