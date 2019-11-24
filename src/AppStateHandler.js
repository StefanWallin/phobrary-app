import ReactTimeout from 'react-timeout'
import { AppState } from 'react-native';
import { Provider, connect } from 'react-redux';
import App from '~src/App';
import LinearGradient from 'react-native-linear-gradient';
import React, { PureComponent } from 'react';
import store from '~src/store';
import getDeviceID from '~storage/deviceIdStore';

export default ReactTimeout(class AppStateHandler extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onAppStateChange('active')
    getDeviceID().then((value) =>{
      store.dispatch({ type: 'DEVICE_LOADED', deviceId: value});
      setTimeout(()=> {
        store.dispatch({ type: 'DISCOVER_SERVERS' });
      }, 0);
    }).catch((error)=>{
      return null;
    });
  }

  componentDidMount() {
    AppState.addEventListener('change', this.onAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.onAppStateChange);
  }

  onAppStateChange = (currentAppState) => {
    this.prevAppState = this.currentAppState;
    this.currentAppState = currentAppState;
    if (this.currentAppState === 'active') {
      if (this.prevAppState === undefined) {
        // TODO: EVENT APP START

      } else {
        // TODO: EVENT RESUME
      }
      // this.refreshStore();
    } else if (this.currentAppState === 'background') {
      // TODO: EVENT BACKGROUND
    }
  };

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
});
