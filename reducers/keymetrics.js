const defaultState = {
  payingCustomers: {
    datasets: [],
    labels: [],
  },
  issuesOverTime: {
    datasets: [],
    labels: [],
  },
  totalIssues: -1,
};

export default function(state=defaultState, action) {
  const { data, keyMetricType } = action;
  switch (action.type) {
    case 'SET_KEY_METRICS_DATA':
      let newState = { ...state };
      newState[keyMetricType] = data;
      return newState;
    default:
      return state;
  }
};
