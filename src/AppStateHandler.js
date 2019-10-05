import { AppState } from 'react-native';
import { Provider } from 'react-redux';
import App from '~src/App'
import LinearGradient from 'react-native-linear-gradient';
import React, { PureComponent } from 'react';
import store from '~src/store'

export default class AppStateHandler extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onAppStateChange('active')
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
      store.dispatch({ type: 'DISCOVER_SERVERS' })
      // this.refreshStore();
    } else if (this.currentAppState === 'background') {
      // TODO: EVENT BACKGROUND
    }
    console.log('onAppStateChange: ', this.prevAppState, this.currentAppState);
  };

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
