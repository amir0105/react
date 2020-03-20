import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  View,
  Image,
  Text,
  Alert,
  Platform,
  TextInput,
  Dimensions,
} from 'react-native';

import * as RoomListActions from '../redux/actions/roomListActions';
import {connect} from 'react-redux';
import {withNavigationFocus} from 'react-navigation';
import * as APIs from '../api/APIs';
import RoomList from '../components/RoomList';
import DateTimePicker from '@react-native-community/datetimepicker';

const HomeScreen = props => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [roomList, setRoomList] = useState(null);

  const onChange = (event, selectedDate) => {
    console.log('Selected Date = ' + selectedDate);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if (mode === 'date') {
      setDate(currentDate);
    } else {
      setTime(currentDate);
    }

    let hour =
      currentDate.getHours() < 10
        ? '0' + currentDate.getHours()
        : currentDate.getHours();

    //Round Selected time to nearest 30 mins slot
    let minutes =
      currentDate.getMinutes() < 10
        ? '0' + currentDate.getMinutes()
        : currentDate.getMinutes() <= 15
        ? '00'
        : '30';

    let selectedSlot = hour + ':' + minutes;

    console.log('selectedSlot = ' + selectedSlot);
    setRoomList(props.getRoomListSortByAvailability(selectedSlot).roomList);
  };

  if (roomList === null) {
    console.log('Inside roomlist fetch');
    APIs.getRoomList(
      response => {
        props.initRoomList(response);
        let hour =
          time.getHours() < 10 ? '0' + time.getHours() : time.getHours();

        //Round Selected time to nearest 30 mins slot
        let minutes =
          time.getMinutes() < 10
            ? '0' + time.getMinutes() + ':' + '00'
            : time.getMinutes() <= 15
            ? '00'
            : '30';

        let selectedSlot = hour + ':' + minutes;

        console.log('selectedSlot = ' + selectedSlot);
        setRoomList(props.getRoomListSortByAvailability(selectedSlot).roomList);
      },
      error => {
        console.log(JSON.stringify(error));
      },
    ).then({});
  }

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const getFormattedDay = day => {
    if (day > 3 && day < 21) {
      return day + 'th';
    }
    switch (day % 10) {
      case 1:
        return day + 'st';
      case 2:
        return day + 'nd';
      case 3:
        return day + 'rd';
      default:
        return day + 'th';
    }
  };
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <View style={{flex: 1}}>
      <View>
        <Text>Date</Text>

        <TouchableOpacity onPress={() => showDatepicker()}>
          <Text>
            {getFormattedDay(date.getDate()) +
              ' ' +
              month[date.getMonth()] +
              ' ' +
              date.getFullYear()}
          </Text>
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            minuteInterval={30}
          />
        )}
      </View>

      <View>
        <Text>Slot</Text>
        <TouchableOpacity onPress={() => showTimepicker()}>
          <Text>{time.getHours() + ':' + time.getMinutes()}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <RoomList roomList={roomList} selectedDate={date} selectedSlot={time} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: '#121212',
    height: 50,
    marginTop: 3,
    fontFamily: 'FranklinITCStd-Light',
    fontSize: 16,
    borderColor: 'rgba(135,135,135,1)',
    paddingLeft: 10,
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    roomList: state.roomList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initRoomList: roomList => dispatch(RoomListActions.initRoomList(roomList)),
    getRoomList: () => dispatch(RoomListActions.getRoomList('')),
    getRoomListSortByAvailability: timeSlot =>
      dispatch(RoomListActions.getRoomListSortByAvailability(timeSlot)),
    getRoomListSortByCapacity: () =>
      dispatch(RoomListActions.getRoomListSortByCapacity),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigationFocus(HomeScreen));
