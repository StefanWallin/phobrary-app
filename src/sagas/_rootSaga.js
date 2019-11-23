import { fork } from 'redux-saga/effects';
import { discoverServers, identifyServer } from '~sagas/serverDiscoverySaga'
import { createSession, loadSession } from '~sagas/sessionSaga'

export default function* rootSaga() {
  yield fork(discoverServers);
  yield fork(identifyServer);
  yield fork(createSession);
  yield fork(loadSession);
}
