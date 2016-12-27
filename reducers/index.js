import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import header from './header.js';
import grid from './grid.js';
import geolocation from './geolocation.js';
import keymetrics from './keymetrics.js';
export default combineReducers({
  header,
  grid,
  geolocation,
  keymetrics,
  routing: routerReducer,
});
