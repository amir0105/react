import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

/**
 * Component which presents the Room List items.
 * This renders the individual rows of Room List, as part of FlatList
 */
class ListItem extends React.PureComponent {
  render() {
    //Availability text requires green color representation.
    var color = {color: 'black'};
    if (
      this.props.itemDetails !== undefined &&
      this.props.itemDetails.availability !== undefined &&
      this.props.itemDetails.availability[this.props.selectedSlot] === '1'
    ) {
      color = {color: 'green'};
    }

    //Return the Individual items in Flat List
    return (
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.line1}>
            <Text style={styles.name}>{this.props.itemDetails.name}</Text>
            <Text style={[styles.availability, color]}>
              {/*check if availability is 1 or 0. Based on the value return text*/}
              {this.props.itemDetails.availability[this.props.selectedSlot] ===
              '1'
                ? 'Available'
                : 'Not available'}
            </Text>
          </View>

          <View style={styles.line2}>
            <Text style={styles.level}>
              Level {this.props.itemDetails.level}
            </Text>
            <Text style={styles.capacity}>
              {this.props.itemDetails.capacity} pax
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
    marginTop: 5,
    marginBottom: 5,

    padding: 10,
    backgroundColor: '#11000011',
    borderRadius: 5,
  },
  name: {flex: 1, fontWeight: 'bold'},
  availability: {flex: 1, textAlign: 'right', fontStyle: 'italic'},
  level: {flex: 1},
  capacity: {flex: 1, textAlign: 'right'},
  line1: {
    flexDirection: 'row',
    flex: 1,
  },
  line2: {
    flexDirection: 'row',
    flex: 1,
  },
});
