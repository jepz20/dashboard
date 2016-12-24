import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import header from './header.js';
import grid from './grid.js';
import geolocation from './geolocation.js';
export default combineReducers({
  header,
  grid,
  geolocation,
  routing: routerReducer,
});
