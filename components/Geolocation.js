
import { connect } from 'react-redux';
import * as actions from '../actions';


import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import GoogleMap from 'google-map-react';

// import MyGreatPlace from './my_great_place.jsx';

// import {greatPlaceStyle} from './my_great_place_styles.js';

class MyGreatPlace extends Component {
  render() {
    const K_WIDTH = 40;
    const K_HEIGHT = 40;

    const greatPlaceStyle = {
      // initially any map object has left top corner at lat lng coordinates
      // it's on you to set object origin to 0,0 coordinates
      position: 'absolute',
      width: K_WIDTH,
      height: K_HEIGHT,
      left: -K_WIDTH / 2,
      top: -K_HEIGHT / 2,

      border: '5px solid #f44336',
      borderRadius: K_HEIGHT,
      backgroundColor: 'white',
      textAlign: 'center',
      color: '#3f51b5',
      fontSize: 16,
      fontWeight: 'bold',
      padding: 4
    };

    return (
       <div style={greatPlaceStyle}>
          {this.props.text}
       </div>
    );
  }
}

class GeoLocation extends React.Component {

  // shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
  super(props);
}
  render() {
    const defaultProps = {
      center: [59.938043, 30.337157],
      zoom: 9,
      greatPlaceCoords: { lat: 59.724465, lng: 30.080121 },
    };

    const style = {
      mapContainer: {
        position: 'absolute',
        height: 'calc(100% - 140px)',
        width: '100%',
      },
    };

    return (
      <div style={ style.mapContainer }>
        <GoogleMap
         apiKey = { "AIzaSyAV2zQ_WJVjhj66O2fhk7FESKIR4RBOaC4 "}
         defaultCenter={defaultProps.center}
         defaultZoom={defaultProps.zoom}>
         <MyGreatPlace lat={59.955413} lng={30.337844} text={'A'} /* Kreyser Avrora */ />
         <MyGreatPlace lat={59.955413} lng={30.337995} text={'C'} /* Kreyser Avrora */ />
         <MyGreatPlace {...this.props.greatPlaceCoords} text={'B'} /* road circle */ />
       </GoogleMap>
      </div>
    );
  }
}

// GeoLocation = connect(mapStateToProps, actions)(GeoLocation);

export default GeoLocation;
