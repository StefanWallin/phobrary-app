/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';

import CameraRoll from "@react-native-community/cameraroll";

const App = () => {

  getPhotos = function () {
    CameraRoll.getPhotos({
       first: 2,
       assetType: 'Photos',
     })
     .then(r => {
       console.log("r: ", r);
     }).catch(console.err);
  };

  uploadPhotoData = function () {
    CameraRoll.getPhotos({
       first: 2,
       assetType: 'Photos',
     }).then((r) => {
       let base_url = 'http://localhost:3000/api/photos/v1/';
       let imageNode = r.edges[0].node;
       console.log(r.edges[0]);
       let uploadData = new FormData();
       let fileObj = {
         type: 'image/jpg',
         uri: imageNode.image.uri,
         name: imageNode.image.filename,
       };
       uploadData.append('file', fileObj);
       uploadData.append('metadata', JSON.stringify(imageNode));

       fetch(base_url, {
         method: 'post',
         body: uploadData,
       }).then((response) => {
         console.log("Response", response);
       });
     });
  }

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Button
              title="Get Photos"
              onPress={this.getPhotos}
            />
            <Button
              title="Upload Photo 1"
              onPress={this.uploadPhotoData}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  body: {
    backgroundColor: 'white',
  },
});

export default App;
