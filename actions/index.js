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

export const fetchIssuesDetail = () =>
  api.fetchIssuesDetail()
  .then(response => setIssuesDetail(response));

export const fetchDefaultIssuesDetail = () =>
  api.fetchIssuesDetail()
  .then(response => setDefaultIssuesDetail(response));
