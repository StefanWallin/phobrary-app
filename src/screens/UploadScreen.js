import colors from '~config/colors';
import React, { PureComponent } from 'react';
import PhoButton from '~components/PhoButton';
import {
  FlatList,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

class UploadScreen extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  onSignOut(self) {
    self.props.dispatch({type: 'DELETE_SESSION' });
  }

  render() {
    return (
      <View testID="uploadScreen">
        <ScrollView>
          <Text style={{ marginTop: 40, marginLeft: 20, marginRight: 20, color: colors.white, textAlign: 'center' }}>
            Logged In, let's upload images!
          </Text>
          <PhoButton testID="signOutButton" type="link" label="sign out" onPress={()=>{this.onSignOut(this)}} style={{ marginTop: 20, marginBottom: 20 }} />
        </ScrollView>
      </View>
    );
  }
}


export default connect()(UploadScreen);
