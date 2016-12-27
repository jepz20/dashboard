import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CustomChart from './CustomChart';
import InfoCard from './InfoCard';

const mapStateToProps = (state) => ({
  keymetrics: state.keymetrics,
});

class KeyMetrics extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="keymetrics">
        <div className='keymetrics__lower'>
          <InfoCard
            keyMetricType="totalIssues"
            title='Issues'/>
        </div>        
        <div className='keymetrics__upper'>
            <div className="keymetrics__upper__left">
              <CustomChart
                keyMetricType='payingCustomers'
                chartType='line'
                title='Paying Customers'
              />
            </div>
            <div className="keymetrics__upper__right">
              <CustomChart
                keyMetricType='issuesOverTime'
                chartType='bar'
                title='Issues Over Time'
              />
            </div>
        </div>
      </div>
    );
  }
}

KeyMetrics = connect(mapStateToProps, actions)(KeyMetrics);

export default KeyMetrics;
