import Zeroconf from 'react-native-zeroconf';
import { foundServer } from '~actions/networkActions';
import store from '~src/store';


export default class ServerDiscovery {

  static myInstance = null

  static getInstance() {

  }

  static scan() {
    const sd = new ServerDiscovery();
    sd.startScan();
  }

  static stop() {
    const sd = new ServerDiscovery();
    sd.stopScan();
  }

  constructor() {
    if (ServerDiscovery.myInstance === null) {
      ServerDiscovery.myInstance = new Zeroconf();
    }
    return this;
  }

  startScan() {
    try {
      ServerDiscovery.myInstance.scan('phobrary')
      ServerDiscovery.myInstance.on('resolved', (result) => {
        store.dispatch(foundServer(result));
      });
    } catch(error) { return null; }
  }

  stopScan() {
    try {
      ServerDiscovery.myInstance.stop();
    } catch(error) { return null; }
    try {
      ServerDiscovery.myInstance.removeDeviceListeners();
    } catch(error) { return null; }
  }
}
