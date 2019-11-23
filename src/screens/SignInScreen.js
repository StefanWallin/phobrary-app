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
  Alert,
  FlatList,
  ScrollView,
  Text,
} from 'react-native';
import { totp } from '~lib/totp';


class SignInScreen extends React.PureComponent {

  constructor (props) {
    super(props);

  }

  selectServer(item) {
    this.props.dispatch(selectedServer(item));
    this.props.navigation.navigate('createSession', { item: item });
  }

  render() {
    const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD';
    // const totpObj = totp.totpCheckWithWindow('blarb', secret, { window: 1 });
    // console.log(totp.verify({token: 'blarb', secret }));
    // const totp = totpObj.code;
    Alert.alert(ArrayBuffer.toString());
    const data = Object.values(this.props.compatibleServers);
    const dataCount = Object.keys(this.props.compatibleServers).length;
    return (
      <ScrollView testID="signInScreen">
        <Text style={{ marginLeft: 20, marginRight: 20, color: colors.white }}>
          Trying to find Phobrary Servers on your local network.
          Please note that you need to be connected to the same WiFi and
          local area network as your running Phobrary server.
        </Text>
        {!!dataCount && (<FlatList
          data={data}
          renderItem={({item}) =>
            <ServerButton label={item.name} subText={item.addresses[0]} onPress={()=>{this.selectServer(item)}} />
          }
          keyExtractor={(item, index) => item.fullName}
          style={{
            width: '100%',
            borderBottomColor: colors.white,
            borderBottomWidth: 0.5,
            marginTop: 10,
          }}
        />)}
        {!dataCount && (
          <Text style={{ marginTop: 40, marginLeft: 20, marginRight: 20, color: colors.white, textAlign: 'center' }}>
            No running Phobrary server found
          </Text>
        )}
      </ScrollView>
    );
  }
}

export default connect(state => ({
  foundServers: state.network.foundServers,
  compatibleServers: state.network.compatibleServers,
}))(SignInScreen);
