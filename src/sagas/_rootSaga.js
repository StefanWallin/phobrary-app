import { fork } from 'redux-saga/effects';
import { discoverServers, identifyServer } from '~sagas/serverDiscoverySaga'

export default function* rootSaga() {
  yield fork(discoverServers);
  yield fork(identifyServer);
}
