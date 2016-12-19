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
