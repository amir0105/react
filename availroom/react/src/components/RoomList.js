import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ListItem from '../components/ListItem';

/**
 * FlatList that would render the Room List
 * @param {*} param0
 */
const RoomList = ({roomList, selectedDate, selectedSlot, refresh}) => {
  var windowSize = 10;

  const renderItem = ({item}) => (
    <ListItem selectedSlot={selectedSlot} itemDetails={item} />
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={Styles.flatList}
        data={roomList}
        vertical={true}
        indicatorStyle="white"
        keyExtractor={item => String(item.name)}
        renderItem={renderItem}
        maxToRenderPerBatch={25}
        updateCellsBatchingPeriod={0.0005}
        windowSize={windowSize}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={true}
        directionalLockEnabled={true}
      />
    </View>
  );
};

const Styles = StyleSheet.create({flatList: {backgroundColor: 'white'}});

export default RoomList;
