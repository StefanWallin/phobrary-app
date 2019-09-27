import FeelingImage from '~components/FeelingImage';
import PhoButton from '~components/PhoButton';
import React, { PureComponent } from 'react';
import {
  ScrollView,
  Text,
} from 'react-native';
import colors from '~config/colors';

export default class WelcomeScreen extends React.PureComponent {
  onGetStarted = () => {
    console.log("Let's get started!");
  }

  onSignIn = () => {
    this.props.navigation.navigate('signIn');
    console.log("Let's sign in!");
  }

  render() {
    return (
      <ScrollView testID="welcomeScreen" style={{backgroundColor: 'transparent'}}>
        <FeelingImage />
        <PhoButton testID="getStartedButton" type="primary" label="get started" onPress={this.onGetStarted} style={{ marginTop: 40, marginBottom: 20 }} />
        <Text style={{ color: colors.grey, textAlign: 'center' }}>— or —</Text>
        <PhoButton testID="signInButton" type="link" label="sign in" onPress={this.onSignIn}  style={{ marginTop: 20, marginBottom: 20 }} />
      </ScrollView>
    );
  }
}
