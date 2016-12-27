import * as api from '../api';
import { firebaseDb } from '../utils/firebase.js';

export const fetchGeolocationDetail = (id) => {
  const geolocationRef =  firebaseDb.ref('/geolocation');
  return (
    dispatch => {
      geolocationRef.on('value', snapshot=> {
        dispatch({
          type: 'SET_GEOLOCATION_DETAIL',
          geolocationData: snapshot.val(),
        });
      });
    }
  );
};

export const fetchKeyMetric = (keyMetricType) => {
  const keyMetricRef =  firebaseDb.ref(`/keymetrics/${keyMetricType}`);
  return (
    dispatch => {
      keyMetricRef.on('value', snapshot=> {
        dispatch({
          type: 'SET_KEY_METRICS_DATA',
          data: snapshot.val(),
          keyMetricType,
        });
      });
    }
  );
};

export const setHeaderValues = headerDetail => ({
  type: 'SET_HEADER_VALUES',
  headerDetail,
});

export const setActiveTab = activeTab => ({
  type: 'SET_ACTIVE_TAB',
  activeTab,
});

export const setActiveTabFromRoute = route => ({
  type: 'SET_ACTIVE_TAB_FROM_ROUTE',
  route,
});

export const setIssuesDetail = issuesDetail => ({
  type: 'SET_ISSUES_DETAIL',
  issuesDetail,
});

export const setDefaultIssuesDetail = issuesDetail => ({
  type: 'SET_DEFAULT_ISSUES_DETAIL',
  issuesDetail,
});

export const sortChangeIssuesDetail = (columnKey, sortDir) => ({
  type: 'SORT_CHANGE_ISSUES_DETAIL',
  columnKey,
  sortDir,
});

export const filterChangeIssuesDetail = (filterValue, searchFields) => ({
  type: 'FILTER_CHANGE_ISSUES_DETAIL',
  filterValue,
  searchFields,
});

export const updateEmployees = (key) => ({
  type: 'UPDATE_EMPLOYEES',
  key,
});

export const centerChange = (center) => ({
  type: 'CENTER_CHANGE',
  center,
});

export const selectedKeyChange = (key) => ({
  type: 'SELECTED_KEY_CHANGE',
  key,
});

export const changeGridLoadingState = () => ({
  type: 'CHANGE_GRID_LOADING_STATE',
});

export const fetchIssuesDetail = () =>
  api.fetchIssuesDetail()
  .then(response => setIssuesDetail(response));
