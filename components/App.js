import React from 'react';
import Header from './Header.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard">
        <Header/>
        { this.props.children }
      </div>
    );
  }
}

export default App;
