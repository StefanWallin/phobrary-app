import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import colors from '~config/colors';
import LinearGradient from 'react-native-linear-gradient';
import React, { PureComponent } from 'react';
import LogoImage from '~components/LogoImage';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import CreateSessionScreen from '~screens/CreateSessionScreen';
import ServerDiscoveryScreen from '~screens/ServerDiscoveryScreen';
import ResumeScreen from '~screens/ResumeScreen';
import UploadScreen from '~screens/UploadScreen';
import store from '~src/store';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  base: {
    flex: 1,
    width: '100%',
  },
});






class App extends React.PureComponent {
  initialRouteName () {
    const { sessionLoaded, sessionLoading } = this.props;
    if (sessionLoaded) {
      return 'upload';
    } else {
      if (sessionLoading) {
        return 'resume';
      } else {
        return 'serverDiscovery';
      }
    }
  }

  render () {
    const AppNavigator = createSwitchNavigator({
      createSession: CreateSessionScreen,
      serverDiscovery: ServerDiscoveryScreen,
      resume: ResumeScreen,
      upload: UploadScreen,
    },
    {
      initialRouteName: this.initialRouteName(),
      backBehavior: 'initialRoute',
    });
    const AppContainer = createAppContainer(AppNavigator);
    if(this.props.deviceId === null) return null;
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' networkActivityIndicatorVisible={this.props.networkActivity} />
        <LinearGradient colors={['#f36862', '#f793e0']} style={styles.base}>
          <SafeAreaView style={styles.base}>
            <LogoImage />
            <AppContainer />
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }
}

export default connect(state => ({
  sessionLoading: state.session.isLoading,
  sessionLoaded: state.session.isLoaded,
  networkActivity: !!state.network.activitySources.length,
  deviceId: state.device.deviceId,
}))(App);
