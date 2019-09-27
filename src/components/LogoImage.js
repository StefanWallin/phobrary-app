import React from 'react';
import images from '~images';
import { Image, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 20,
    marginBottom: 20,
    height: 53,
    alignItems: 'flex-end',
    width: '100%',
  },
  logoImage: {
    width: '50%',
  },
});

export default class LogoImage extends React.PureComponent {
  render() {
    return (
      <View style={styles.logoContainer}>
        <View style={styles.logoImage}>
          <Image source={images.logo} />
        </View>
      </View>
    );
  }
}
