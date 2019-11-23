import LogoImage from '~components/LogoImage'
import FeelingImage from '~components/FeelingImage'
import PhoButton from '~components/PhoButton'
import ServerButton from '~components/ServerButton'
import config from '~config/config'
import colors from '~config/colors';
import Api from '~lib/api';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectedServer } from '~actions/networkActions';
import {
  FlatList,
  ScrollView,
  Text,
} from 'react-native';

class ResumeScreen extends React.PureComponent {

  constructor (props) {
    super(props);
  }

  render() {
    return (
      <ScrollView testID="signInScreen">
        <Text style={{ marginTop: 40, marginLeft: 20, marginRight: 20, color: colors.white, textAlign: 'center' }}>
          Trying to resume existing session
        </Text>
      </ScrollView>
    );
  }
}

export default connect(state => ({
  session: state.session,
}))(ResumeScreen);
