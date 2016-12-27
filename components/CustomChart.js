import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { loaderStyle } from '../styles/loader';
import { ThreeBounce } from 'better-react-spinkit';
import { Line, Bar } from 'react-chartjs';

const mapStateToProps = (state, props) => {
  const { keyMetricType } = props;
  let newState = {};
  newState[keyMetricType] = state.keymetrics[keyMetricType];
  return newState;
};

class CustomChart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchKeyMetric } = this.props;
    fetchKeyMetric(this.props.keyMetricType);
  }

  render() {
    const options =  {
      responsive: true,
      scales: {
        xAxes: [
          {
            type: 'linear',
            position: 'bottom',
          },
        ],
      },
    };
    const customStyle = {
      fillColor: 'rgba(0,188,212,0.7)',
      pointColor: 'rgba(255,64,129,1)',
      pointStrokeColor: '#fff',
    };

    const { keyMetricType, chartType, title }  = this.props;
    if (!keyMetricType) {
      chart =  <div>No Key Metric</div>;
    };

    let chart;
    const data  = this.props[keyMetricType];

    if (!data) {
      chart =  <div>No Data</div>;
    };

    let type = chartType ? chartType : 'bar';

    data.datasets.forEach(item => item = (item = Object.assign(item, customStyle)));
    if (data.labels.length === 0) {
      chart = <div style={ loaderStyle }><ThreeBounce size={15} color='#ff4081'/></div>;
    } else if (type === 'line') {
      chart = <Line data={data} options={options}/>;
    } else if (type === 'line') {
      chart = <Bar data={data} options={options}/>;
    } else {
      chart = <Bar data={data} options={options}/>;
    }

    return (
      <div>
        <h4 className="keymetrics__title">{ title }</h4>
        { chart }
      </div>
    );
  }
}

CustomChart = connect(mapStateToProps, actions)(CustomChart);

export default CustomChart;
