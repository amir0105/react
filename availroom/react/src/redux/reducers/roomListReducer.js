import {
  GET_ROOM_LIST,
  GET_ROOM_LIST_SORT_BY_CAPACITY,
  GET_ROOM_LIST_SORT_BY_AVAILABILITY,
  INIT_ROOM_LIST,
} from '../../utils/actionConstants';

const roomListReducer = (roomList = [], action) => {
  switch (action.type) {
    case INIT_ROOM_LIST:
      return action.roomList;

    case GET_ROOM_LIST:
      action.roomList = roomList.sort(
        (item1, item2) => item1.level < item2.level,
      );
      return roomList;

    case GET_ROOM_LIST_SORT_BY_CAPACITY:
      action.roomList = roomList.sort(
        (item1, item2) => item1.capacity < item2.capacity,
      );
      return roomList;

    case GET_ROOM_LIST_SORT_BY_AVAILABILITY:
      let roomsForSelectedTimeSlot = roomList.filter(
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
