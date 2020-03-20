import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import IconSet from 'react-native-vector-icons/SimpleLineIcons';
const {width, height} = Dimensions.get('window');

/**
 * Top Navigation Bar which Holds Pages Title and Camera Button
 * @param {*} param
 * @param {*} navigator
 * @param {*} handleOnPress
 */
const NavigationBar = (param, navigator, handleOnPress) => {
  return (
    <View style={styles.main}>
      <Text style={styles.picker}>Book a Room</Text>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => param.handleOnPress()}>
          <IconSet
            name="camera"
            size={25}
            color={'black'}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {width: width, flexDirection: 'row', flex: 1},

  icon: {
    alignContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
  },

  picker: {
    flex: 0.9,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default NavigationBar;
