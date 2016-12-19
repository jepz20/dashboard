import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => ({
});

class Grid extends React.Component {
  render() {
    return (
      <div>
        GRID
      </div>
    );
  }
}

Grid = connect(mapStateToProps, actions)(Grid);

export default Grid;
