import { connect } from 'react-redux';
import * as actions from '../actions';
import MarkerDetail from './MarkerDetail';
import React from 'react';
import GoogleMap from 'google-map-react';
const mapStateToProps = (state) => ({
  geolocation: state.geolocation,
  routing: state.routing,
});

class GeoLocation extends React.Component {

  // shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this._onChildClick = this._onChildClick.bind(this);
    this._onChildMouseEnter = this._onChildMouseEnter.bind(this);
    this._onChildMouseLeave = this._onChildMouseLeave.bind(this);
  }

  componentDidMount() {
    const { fetchGeolocationDetail } = this.props;
    fetchGeolocationDetail();
  }

  _onBoundsChange(center, zoom /* , bounds, marginBounds */) {
    console.log('onBoundsChange', center, zoom);
    // this.props.onCenterChange(center);
    // this.props.onZoomChange(zoom);
  }

  _onChildClick(key, childProps) {
    const { selectedKeyChange, centerChange } = this.props;
    centerChange([childProps.lat, childProps.lng]);
  }

  _onChildMouseEnter(key) {
    const { selectedKeyChange } = this.props;
    selectedKeyChange(key);
  }

  _onChildMouseLeave(key, /* childProps */) {
    const { selectedKeyChange } = this.props;
    selectedKeyChange(key);
  }

  render() {

    const style = {
      mapContainer: {
        position: 'absolute',
        height: 'calc(100% - 140px)',
        width: '100%',
      },
    };

    const { geolocation } = this.props;
    const markers = Object.keys(geolocation.markers).map(key => (
      <MarkerDetail key={ key }
        lat={geolocation.markers[key].latitud}
        lng={geolocation.markers[key].longitud}
        totalEmployees={geolocation.markers[key].totalEmployees}
        name={geolocation.markers[key].name}
        address={geolocation.markers[key].address}
        firedMonth={geolocation.markers[key].firedMonth}
        hiredMonth={geolocation.markers[key].hiredMonth}
        selected={geolocation.markers[key].selected}
      />
    ));

    return (
      <div style={ style.mapContainer }>
        <GoogleMap
         apiKey = {'AIzaSyAV2zQ_WJVjhj66O2fhk7FESKIR4RBOaC4'}
         defaultCenter={geolocation.defaultCenter}
         center={geolocation.center}
         onChildClick={this._onChildClick}
         onChildMouseEnter={this._onChildMouseEnter}
         onChildMouseLeave={this._onChildMouseLeave}
         defaultZoom={geolocation.zoom}>
         { markers }
       </GoogleMap>
      </div>
    );
  }
}

GeoLocation = connect(mapStateToProps, actions)(GeoLocation);

export default GeoLocation;
