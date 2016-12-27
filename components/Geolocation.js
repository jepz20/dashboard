import { connect } from 'react-redux';
import * as actions from '../actions';
import MarkerDetail from './MarkerDetail';
import React from 'react';
import GoogleMap from 'google-map-react';
const mapStateToProps = (state) => ({
  geolocation: state.geolocation,
  routing: state.routing,
});

const API_KEY = 'AIzaSyCTCKi7arfd9BrRlCvZBVmnjPn9NoyHg_8';
class GeoLocation extends React.Component {

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

  _onChildClick(key, childProps) {
    const { selectedKeyChange, centerChange } = this.props;
    centerChange([childProps.lat, childProps.lng]);
  }

  _onChildMouseEnter(key) {
    const { selectedKeyChange } = this.props;
    selectedKeyChange(key);
  }

  _onChildMouseLeave(key) {
    const { selectedKeyChange } = this.props;
    selectedKeyChange(key);
  }

  render() {

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
      <div className="map-container">
        <GoogleMap
        bootstrapURLKeys={{
            key: API_KEY,
            language: 'en',
          }}
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
