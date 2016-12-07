import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class Header extends React.Component {
  render() {
    const goTo = () => {
      window.open('https://github.com/jepz20', '_blank');
    }
    return (
      <div>
        <AppBar
          title="Dashboard"
          iconElementRight={
            <FlatButton
              label='Github'
              onTouchTap={goTo}
            />}
        />
      </div>
    )
  }
}

export default Header;
