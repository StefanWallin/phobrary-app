import { all, call, put, takeEvery } from 'redux-saga/effects';
import ServerDiscovery from '~lib/serverDiscovery';
import Api from '~lib/api';
import { getAccessToken } from '~storage/accessTokenStore';
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
  yield takeEvery('LOAD_SESSION', function*(action) {
    try {
      const result = yield call(getAccessToken);
      yield put({ type: 'LOAD_SESSION_SUCCESS', result });
    } catch(error) {
      yield put({ type: 'LOAD_SESSION_ERROR', error });
    }
  });
};
