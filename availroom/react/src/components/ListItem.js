import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

class ListItem extends React.PureComponent {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.line1}>
            <Text style={styles.name}>{this.props.itemDetails.name}</Text>
            <Text style={styles.availability}>
              {this.props.itemDetails.availability[this.props.selectedSlot] ===
              '1'
                ? 'Available'
                : 'Not available'}
            </Text>
          </View>

          <View style={styles.line2}>
            <Text style={styles.level}>{this.props.itemDetails.level}</Text>
            <Text style={styles.capacity}>
              {this.props.itemDetails.capacity}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ListItem;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 3,
    marginBottom: 3,
  },
  line1: {
    flexDirection: 'row',
    flex: 1,
  },
  line2: {
    flexDirection: 'row',
    flex: 1,
  },
});
