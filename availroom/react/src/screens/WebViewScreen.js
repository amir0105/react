import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

/**
 * Screen to render webpage.
 */
class WebViewScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{uri: this.props.navigation.state.params.url.data}}
          startInLoadingState={true}
          scalesPageToFit={true}
          scrollEnabled={false}
          javaScriptEnabled={true}
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
export default WebViewScreen;
