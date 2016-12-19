const defaultState = {
  title: 'DashBoard',
  titleIcon: 'fa fa-tachometer',
  githubLink: 'https://github.com/jepz20/dashboard',
  tabs: [
    {
      label: 'Grid',
      icon: 'fa fa-bolt',
      route: 'grid',
    }, {
      label: 'GeoLocation',
      icon: 'fa fa-superpowers',
      route: 'geo',
    }, {
      label: 'Key Metric',
      icon: 'fa fa-ravelry',
      route: 'keymetr',
    },
  ],
};

export default function(state=defaultState, action) {
  switch (action.type) {
    case 'SET_HEADER_VALUES':
      const { title, titleIcon, githubProject, githubLink } = action;
      return {
        ...state,
        title,
        titleIcon,
        githubLink,
        tabs,
      };
    default:
      return state;
  }
};
