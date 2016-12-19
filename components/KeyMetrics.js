import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => ({
});

class KeyMetrics extends React.Component {
  render() {
    return (
      <div>
        KeyMetrics
      </div>
    );
  }
}

KeyMetrics = connect(mapStateToProps, actions)(KeyMetrics);

export default KeyMetrics;
