import {combineReducers} from 'redux';
import roomListReducer from '../reducers/roomListReducer';

/**
 * Used to do combine different reducers.
 * (Future use / scalability)
 */
export default combineReducers({
  roomList: roomListReducer,
});
