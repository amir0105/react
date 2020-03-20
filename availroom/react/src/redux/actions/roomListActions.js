import * as ActionTypes from '../../utils/actionConstants';

/**
 * initializes the roomList State with API response data.
 * @param {*} roomList
 */
export const initRoomList = roomList => {
  return {
    type: ActionTypes.INIT_ROOM_LIST,
    roomList: roomList,
  };
};

/**
 * Returns roomList without any sorting
 * @param {*} roomList
 */
export const getRoomList = roomList => {
  return {
    type: ActionTypes.GET_ROOM_LIST,
    roomList: roomList,
  };
};

/**
 * returns RoomList sorted by Availability
 * @param {*} timeSlot
 * @param {*} roomList
 */
export const getRoomListSortByAvailability = (timeSlot, roomList) => {
  return {
    type: ActionTypes.GET_ROOM_LIST_SORT_BY_AVAILABILITY,
    timeSlot: timeSlot,
    roomList: roomList,
  };
};

/**
 * returns roomList sorted by Capacity
 * @param {*} timeSlot
 * @param {*} roomList
 */
export const getRoomListSortByCapacity = (timeSlot, roomList) => {
  return {
    type: ActionTypes.GET_ROOM_LIST_SORT_BY_CAPACITY,
    timeSlot: timeSlot,
    roomList: roomList,
  };
};
