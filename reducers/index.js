import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import header from './header.js'
export default combineReducers({
  header,
  routing: routerReducer,
});
