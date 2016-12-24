import React from 'react';
import Divider from 'material-ui/Divider';

class MarkerDetail extends React.Component {
  render() {
    const K_SIZE = 20;

    const greatPlaceStyle = {
      // initially any map object has left top corner at lat lng coordinates
      // it's on you to set object origin to 0,0 coordinates
      position: 'absolute',
      width: K_SIZE,
      height: K_SIZE,
      left: -K_SIZE / 2,
      top: -K_SIZE / 2,
      lineHeight: 1.7,
      border: '3px solid #00bcd4',
      borderRadius: K_SIZE,
      backgroundColor: '#00bcd4',
      textAlign: 'center',
      color: '#fff',
      fontSize: 12,
      padding: 4,
      cursor: 'pointer',
    };

    const greatPlaceStyleHover = {
      ...greatPlaceStyle,
      border: '3px solid rgb(255, 64, 129)',
      color: '#fff',
    };

    const hoverSelected = {
      opacity: '1',
      width: '100px',
      visibility: 'visible',
    };

    const hoverNotSelected = {
      opacity: '0',
      width: '100px',
      visibility: 'hidden',
    };

    const { totalEmployees, name, address, hiredMonth, firedMonth, selected } = this.props;
    const style = selected ? greatPlaceStyleHover : greatPlaceStyle;
    const hoverStyle = selected ? hoverSelected : hoverNotSelected;
    return (
       <div className="hint hint--html hint--info hint--top" style={style}>
          { totalEmployees }
          <div style={hoverStyle} className="hint__content">
            <h3>{ name }</h3>
            <div>Employees: <b>{ totalEmployees }</b></div>
            <h4>This Month</h4>
            <div>Hired: <b>{ hiredMonth }</b></div>
            <div>Fired: <b> { firedMonth }</b></div>
          </div>
       </div>
    );
  }
}

export default MarkerDetail;
