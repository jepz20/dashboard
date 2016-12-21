import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => ({
});

class GeoLocation extends React.Component {
  render() {
    return (
      <div>
        <span>hello</span>
      </div>
    );
  }
}

GeoLocation = connect(mapStateToProps, actions)(GeoLocation);

export default GeoLocation;
