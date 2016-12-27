const defaultState = {
  center: [14.9460585, -87.1793395],
  defaultCenter: [59.938043, 30.337157],
  zoom: 6,
  markers: {},
};

export default function(state=defaultState, action) {
  const { key, geolocationData } = action;
  let markers =  { ...state.markers };
  switch (action.type) {
    case 'SET_GEOLOCATION_DETAIL':
      return geolocationData;
    case 'UPDATE_EMPLOYEES':
      markers[key].totalEmployees++;
      return { ...state, markers };
    case 'CENTER_CHANGE':
      const { center } = action;
      return { ...state, center };
    case 'SELECTED_KEY_CHANGE':
      markers[key].selected = !markers[key].selected;
      return { ...state, markers };
    default:
      return state;
  }
};
