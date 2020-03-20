import {combineReducers} from 'redux';
import roomListReducer from '../reducers/roomListReducer';

export default combineReducers({
  roomList: roomListReducer,
});
