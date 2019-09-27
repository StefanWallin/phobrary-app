import LogoImage from '~components/LogoImage'
import FeelingImage from '~components/FeelingImage'
import PhoButton from '~components/PhoButton'
import ServerButton from '~components/ServerButton'
import colors from '~config/colors';
import React, { PureComponent } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
} from 'react-native';
import Zeroconf from 'react-native-zeroconf';
import deep_equal from 'deep-equal';
const zeroconf = new Zeroconf();

export default class SignInScreen extends React.PureComponent {

  constructor (props) {
    super(props);
    this.state = {
      servers: [],
    }
    this.scanMDNS();
  }

  componentWillUnmount() {
    try {
      zeroconf.stop()
    } catch(error) {
      console.warn(error);
    }
  }

  scanMDNS = () => {
    try {
      zeroconf.stop()
      zeroconf.scan(type = 'phobrary', protocol = 'tcp', domain = 'local.')
      zeroconf.on('resolved', this.onResolved);
    } catch(error) {
      console.warn(error);
    }
  }

  onResolved = (result) => {
    let found = false;
    if(this.state.servers.length > 0) {
      this.state.servers.forEach((element) => {
        if(deep_equal(element, result)) {
          found = true;
        }
      });
    }
    if(!found) {
      this.setState({
        servers: [...this.state.servers, ...[result]],
      });
    }
  }

  connectServer = (data) => {
    console.log("CONNECT TO: ", data);
  }

  render() {
    return (
      <ScrollView testID="signInScreen">
        <Text style={{ marginLeft: 20, marginRight: 20, color: colors.white }}>Trying to find Phobrary Servers on your local network. Please note that you need to be connected to the same wifi/lan as your running phobrary server.</Text>
        {!!this.state.servers.length && (<FlatList
          data={this.state.servers}
          renderItem={({item}) => <ServerButton label={item.name} subText={item.addresses[0]} onPress={()=>{this.connectServer(item)}}/>}
          keyExtractor={(item, index) => item.fullName}
          style={{
            width: '100%',
            borderBottomColor: colors.white,
            borderBottomWidth: 0.5,
            marginTop: 10,
          }}
        />)}
        {!this.state.servers.length && (<Text style={{ marginTop: 40, marginLeft: 20, marginRight: 20, color: colors.white, textAlign: 'center' }}>No running Phobrary server found</Text>)}
      </ScrollView>
    );
  }
}
