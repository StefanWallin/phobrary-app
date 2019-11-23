import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import colors from '~config/colors';
import LinearGradient from 'react-native-linear-gradient';
import React, { PureComponent } from 'react';
import LogoImage from '~components/LogoImage';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import CreateSessionScreen from '~screens/CreateSessionScreen';
import SignInScreen from '~screens/SignInScreen';
import ResumeScreen from '~screens/ResumeScreen';
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


const AppNavigator = createSwitchNavigator({
  createSession: CreateSessionScreen,
  signIn: SignInScreen,
  resume: ResumeScreen,
},
{
  initialRouteName: 'signIn',
  backBehavior: 'initialRoute',
});

const AppContainer = createAppContainer(AppNavigator);

class App extends React.PureComponent {
  render () {
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
  networkActivity: !!state.network.activitySources.length,
  deviceId: state.device.deviceId,
}))(App);
