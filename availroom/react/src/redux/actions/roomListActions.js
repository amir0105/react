import * as ActionTypes from '../../utils/actionConstants';

export const initRoomList = roomList => {
  return {
    type: ActionTypes.INIT_ROOM_LIST,
    roomList: roomList,
  };
};

export const getRoomList = roomList => {
  return {
    type: ActionTypes.GET_ROOM_LIST,
    roomList: roomList,
  };
};

export const getRoomListSortByAvailability = (timeSlot, roomList) => {
  return {
    type: ActionTypes.GET_ROOM_LIST_SORT_BY_AVAILABILITY,
    timeSlot: timeSlot,
    roomList: roomList,
  };
};

export const getRoomListSortByCapacity = roomList => {
  return {
    type: ActionTypes.GET_ROOM_LIST_SORT_BY_CAPACITY,
    roomList: roomList,
  };
};
