import React from 'react';
import Header from './Header.js'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard">
        <Header/>
        <main>GRID</main>
      </div>
    );
  }
}

export default App;
