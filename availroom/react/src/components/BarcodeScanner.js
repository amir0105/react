import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {RNCamera} from 'react-native-camera';

/**
 * BarcodeScanner component used for Scanning QR code information.
 * On Scanning, if URL is https:// then it shall redirect the user to WebPage
 * within the application. (WebViewScreen)
 */
class BarcodeScanner extends Component {
  //Barcode scan callback, called once the Camera recognizes a QR.
  onBarCodeRead = e => {
    if (e.data.startsWith('https')) {
      this.props.navigation.navigate('WebView', {url: e});
    }
  };

  //Renders the Camera View for QR code scan
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          onBarCodeRead={this.onBarCodeRead}
          ref={cam => (this.camera = cam)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40,
  },
  bottomOverlay: {
    position: 'absolute',
    width: '100%',
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default BarcodeScanner;
