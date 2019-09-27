import React from 'react';
import images from '~images';
import { Image, StyleSheet, View } from 'react-native';
const Dimensions = require('Dimensions');


const styles = StyleSheet.create({
  feelingContainer: {
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
});

export default class FeelingImage extends React.PureComponent {
  render() {
    const height = (Dimensions.get('window').width) * (512/750);
    return (
      <View style={styles.feelingContainer}>
        <Image
          style={{ height }}
          resizeMode="contain"
          source={images.startscreen_feeling}
        />
      </View>
    );
  }
}
