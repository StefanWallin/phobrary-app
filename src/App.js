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
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import WelcomeScreen from '~screens/WelcomeScreen';
import SignInScreen from '~screens/SignInScreen';


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
  welcome: WelcomeScreen,
  signIn: SignInScreen,
},
{
  initialRouteName: "welcome",
  headerMode: 'none',
  transparentCard: true,
});
const AppContainer = createAppContainer(AppNavigator);


class App extends React.PureComponent {
  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" networkActivityIndicatorVisible={this.props.networkActivity} />
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
  networkActivity: state.network.activity
}))(App);
