import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import header from './header.js';
import grid from './grid.js';
export default combineReducers({
  header,
  grid,
  routing: routerReducer,
});
