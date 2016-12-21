const defaultState = {
  title: 'DashBoard',
  titleIcon: 'fa fa-tachometer',
  githubLink: 'https://github.com/jepz20/dashboard',
  activeTab: 0,
  tabs: [
    {
      label: 'Grid',
      icon: 'fa fa-bolt',
      index: 0,
      route: 'grid',
    }, {
      label: 'GeoLocation',
      icon: 'fa fa-superpowers',
      index: 1,
      route: 'geolocation',
    }, {
      label: 'Key Metric',
      icon: 'fa fa-ravelry',
      index: 2,
      route: 'keymetrics',
    },
  ],
};

export default function(state=defaultState, action) {
  const { title, titleIcon, githubProject, githubLink, activeTab } = action;
  switch (action.type) {
    case 'SET_HEADER_VALUES':
      return {
        ...state,
        title,
        titleIcon,
        githubLink,
        activeTab,
        tabs,
      };
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab,
      };
    case 'SET_ACTIVE_TAB_FROM_ROUTE':
      const { route } = action;
      let activeTab = 0;
      if (state.tabs) {
        let match = state.tabs.filter(tab => tab.route == action.route);
        if (match && match.length > 0) activeTab = match[0].index;
      };

      return {
        ...state,
        activeTab,
      };
    default:
      return state;
  }
};
