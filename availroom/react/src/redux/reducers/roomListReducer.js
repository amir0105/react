import {
  GET_ROOM_LIST,
  GET_ROOM_LIST_SORT_BY_CAPACITY,
  GET_ROOM_LIST_SORT_BY_AVAILABILITY,
  INIT_ROOM_LIST,
} from '../../utils/actionConstants';

/**
 * Redux Reducer class which performs operations on the roomList state
 * and returns the results based on the operation.
 * @param {*} roomList
 * @param {*} action
 */
const roomListReducer = (roomList = [], action) => {
  switch (action.type) {
    //Initializes the roomList with API result
    case INIT_ROOM_LIST:
      return action.roomList;

    //Return all the roomList without sorting
    case GET_ROOM_LIST:
      action.roomList = roomList.sort(
        (item1, item2) => item1.level < item2.level,
      );
      return roomList;

    //Return roomList sort by Capacity
    case GET_ROOM_LIST_SORT_BY_CAPACITY:
      let roomsForSelectedTimeSlot = roomList.filter(
        items => action.timeSlot in items.availability,
      );
      action.roomList = roomsForSelectedTimeSlot.sort(
        (item1, item2) => parseInt(item1.capacity) < parseInt(item2.capacity),
      );
      return roomList;

    //Return roomList sort by Availability
    case GET_ROOM_LIST_SORT_BY_AVAILABILITY:
      roomsForSelectedTimeSlot = roomList.filter(
        items => action.timeSlot in items.availability,
      );
      action.roomList = roomsForSelectedTimeSlot.sort(
        (item1, item2) =>
          item1.availability[action.timeSlot] <
          item2.availability[action.timeSlot],
      );
      return roomList;
    default:
      return roomList;
  }
};

export default roomListReducer;
