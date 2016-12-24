import { firebaseDb } from '../utils/firebase.js';
import * as api from '../api';

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

export const setGeolocationDetail = (geolocationData) => ({
  type: 'SET_GEOLOCATION_DETAIL',
  geolocationData,
});

export const fetchIssuesDetail = () =>
  api.fetchIssuesDetail()
  .then(response => setIssuesDetail(response));

export const fetchGeolocationDetail = () =>
  api.fetchGeolocationDetail()
  .then(geolocationData => setGeolocationDetail(geolocationData));

export const fetchDefaultIssuesDetail = () =>
  api.fetchIssuesDetail()
  .then(response => setDefaultIssuesDetail(response));
