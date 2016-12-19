import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => ({
  routing: state.routing,
});

class MainSection extends React.Component {
  constructor(props) {
    super(props);
    this.updateTabs = this.updateTabs.bind(this);
  }

  updateTabs() {
    const { setActiveTabFromRoute, routing } = this.props;
    let lastIndex = routing.locationBeforeTransitions.pathname.lastIndexOf('/');
    let location = routing.locationBeforeTransitions.pathname.substring(lastIndex + 1);
    setActiveTabFromRoute(location);
  }

  componentDidMount() {
    this.updateTabs();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateTabs();
  }

  render() {
    return (
      <main>
        { this.props.children}
      </main>
    );
  }
}

MainSection = connect(mapStateToProps, actions)(MainSection);

export default MainSection;
