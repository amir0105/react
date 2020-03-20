import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
  Picker,
} from 'react-native';

import * as RoomListActions from '../redux/actions/roomListActions';
import {connect} from 'react-redux';
import {withNavigationFocus} from 'react-navigation';
import * as APIs from '../api/APIs';
import RoomList from '../components/RoomList';
import NavigationBar from '../components/NavigationBar';

import DateTimePicker from '@react-native-community/datetimepicker';

var roomList = null;
var selectedSlot = null;

/**
 * Main Home Screen, which holds the other components
 * @param {*} props
 */
const HomeScreen = props => {
  //Initialize all states using useState Hook
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [sortBy, setSortBy] = useState('Availability');

  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  /**
   *Call back method from DateTimePicker which returns selected Date / Time
   */
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if (mode === 'date') {
      setDate(currentDate);
    } else {
      setTime(currentDate);
    }
  };

  /**
   *Fetch the base roomlist one time when the page is loaded.
   *The state gets maintained in Redux (roomListReducer)
   */
  if (roomList === null) {
    APIs.getRoomList(
      response => {
        props.initRoomList(response);
        let hour =
          time.getHours() < 10 ? '0' + time.getHours() : time.getHours();

        //Round Selected time to nearest 30 mins slot
        let minutes = time.getMinutes() <= 15 ? '00' : '30';

        selectedSlot = hour + ':' + minutes;

        console.log(selectedSlot);

        if (sortBy === 'Availability') {
          roomList = props.getRoomListSortByAvailability(selectedSlot).roomList;
        } else {
          roomList = props.getRoomListSortByCapacity(selectedSlot).roomList;
        }
      },
      error => {},
    ).then({});
  } else {
    let hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();

    //Round Selected time to nearest 30 mins slot
    let minutes = time.getMinutes() <= 15 ? '00' : '30';

    selectedSlot = hour + ':' + minutes;

    if (sortBy === 'Availability') {
      roomList = props.getRoomListSortByAvailability(selectedSlot).roomList;
    } else {
      roomList = props.getRoomListSortByCapacity(selectedSlot).roomList;
    }
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

  /**
   * Format the day with 'th' text
   * @param {*} day
   */
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

  /**
   * Format the Hour to 12 Hrs format
   * @param {*} time
   */
  const getFormattedHour = time => {
    if (time.getHours() > 12) {
      let twelveHrFormat = 24 - time.getHours();

      let hour = twelveHrFormat < 10 ? '0' + twelveHrFormat : twelveHrFormat;

      //Round Selected time to nearest 30 mins slot
      let minutes = time.getMinutes() <= 15 ? '00' : '30';

      selectedSlot = hour + ':' + minutes + ' PM';
    } else {
      let hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();

      //Round Selected time to nearest 30 mins slot
      let minutes = time.getMinutes() <= 15 ? '00' : '30';

      selectedSlot = hour + ':' + minutes + ' AM';
    }
    return selectedSlot;
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.textLabel}>Date</Text>

        <TouchableOpacity onPress={() => showDatepicker()}>
          <Text>
            {getFormattedDay(date.getDate()) +
              ' ' +
              month[date.getMonth()] +
              ' ' +
              date.getFullYear()}
          </Text>
          <Text style={styles.underline} />
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

      <View style={styles.slotSection}>
        <Text style={styles.textLabel}>Timeslot</Text>
        <TouchableOpacity onPress={() => showTimepicker()}>
          <Text>{getFormattedHour(time)}</Text>
          <Text style={styles.underline} />
        </TouchableOpacity>
      </View>
      <View style={styles.headingOuterContainer}>
        <View style={styles.headingInnerContainer}>
          <Text style={styles.roomsText}>Rooms</Text>

          <View style={styles.sortByLayout}>
            <Text style={{textAlignVertical: 'center'}}>Sort By</Text>
            <Picker
              style={{flex: 1}}
              selectedValue={sortBy}
              onValueChange={(itemValue, itemIndex) => setSortBy(itemValue)}>
              <Picker.Item
                key={'Availability'}
                value={'Availability'}
                label={'Availability'}
              />
              <Picker.Item
                key={'Capacity'}
                value={'Capacity'}
                label={'Capacity'}
              />
            </Picker>
          </View>
        </View>
        <RoomList
          roomList={roomList}
          selectedDate={date}
          selectedSlot={selectedSlot}
        />
      </View>
    </View>
  );
};

HomeScreen.navigationOptions = ({props, navigation}) => {
  return {
    title: 'Book a Room',
    headerTitle: () => (
      <NavigationBar
        iconColor={'black'}
        navigator={navigation}
        handleOnPress={() => {
          navigation.navigate('BarCodeScan', {});
        }}
      />
    ),
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
  },
  textInput: {
    color: '#121212',
    height: 50,
    marginTop: 3,
    fontFamily: 'FranklinITCStd-Light',
    fontSize: 16,
    borderColor: 'rgba(135,135,135,1)',
    paddingLeft: 10,
  },

  textLabel: {
    fontSize: 12,
    color: 'rgba(100,100,100,0.6)',
  },

  slotSection: {marginTop: 10},

  underline: {
    height: 1,
    marginTop: 2,
    backgroundColor: '#10002233',
  },

  sortByLayout: {
    flex: 1,
    flexDirection: 'row',
  },

  headingInnerContainer: {flexDirection: 'row'},

  headingOuterContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  roomsText: {flex: 1, textAlignVertical: 'center'},
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
    getRoomListSortByCapacity: timeSlot =>
      dispatch(RoomListActions.getRoomListSortByCapacity(timeSlot)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigationFocus(HomeScreen));
