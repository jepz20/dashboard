import Paper from 'material-ui/Paper';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ThreeBounce } from 'better-react-spinkit';
import { loaderStyle } from '../styles/loader';

const mapStateToProps = (state, props) => {
  const { keyMetricType } = props;
  let newState = {};
  newState[keyMetricType] = state.keymetrics[keyMetricType];
  return newState;
};

class InfoCard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchKeyMetric } = this.props;
    fetchKeyMetric(this.props.keyMetricType);
  }

  render() {
    const { keyMetricType, title }  = this.props;
    if (!keyMetricType) {
      info =  <div>No Key Metric</div>;
    };

    let info;
    const value  = this.props[keyMetricType];

    if (value === -1) {
      info =  <div style={ loaderStyle }><ThreeBounce size={15} color='#ff4081'/></div>;
    } else {
      info = <div className="keymetrics__issues--value">{ value }</div>;
    }

    const style = {
      height: 110,
      width: 'calc(100% - 40px)',
      margin: 20,
      display: 'inline-block',
    };

    return (
      <Paper style={style} zDepth={2}>
        <h2 className="keymetrics__title">{ title }</h2>
         { info }
      </Paper>
    );
  }
}

InfoCard = connect(mapStateToProps, actions)(InfoCard);
export default InfoCard;
