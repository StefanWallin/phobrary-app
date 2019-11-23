import colors from '~config/colors';
import React, { PureComponent } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
} from 'react-native';

export default class ResumeScreen extends React.PureComponent {

  constructor (props) {
    super(props);
  }

  render() {
    return (
      <ScrollView testID="resumeScreen">
        <Text style={{
          marginTop: 40,
          color: colors.white,
          fontSize: 18,
          textAlign: 'center'
        }}>
          Authenticating...
        </Text>
      </ScrollView>
    );
  }
}
