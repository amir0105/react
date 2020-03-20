import {Alert} from 'react-native';

import API from './APIBase';
import Config from 'react-native-config';

/**
 * API To Fetch RoomLists from Server.
 */
export const getRoomList = async (onResponse, onError) => {
  try {
    const response = await API.get(Config.GET_ROOM_AVAILABILITY, {});

    if (response.data) {
      onResponse(response.data);
    } else {
      onError({errorMessage: response.data.error});
    }
  } catch (err) {
    onError({errorMessage: String(err)});
  }
};
