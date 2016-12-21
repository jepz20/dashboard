import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { hashHistory } from 'react-router';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const mapStateToProps = (state) => ({
  header: state.header,
});

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(tab) {
    const { setActiveTab, header } = this.props;
    if (tab.index !== header.activeTab) {
      setActiveTab(tab.index);
      hashHistory.push('/' + tab.route);
    }
  }

  render() {

    const { header } = this.props;
    const { githubProject, title, titleIcon, tabs, activeTab } = header;
    const styles = {
      white: {
        color: 'white',
        fontSize: '30px',
      },
    };

    const rightIconName = null;
    return (
      <header>
        <div className='AppBar'>
          <a className='AppBar__left' href='/'>
            <IconButton iconStyle={styles.white} iconClassName={ titleIcon }/>
            <h1 className='AppBar__title'>{ title }</h1>
          </a>
          <a className='AppBar__right' href={githubProject}>
            <IconButton iconStyle={styles.white} iconClassName='fa fa-github'/>
          </a>
        </div>
        <div className='toolbar-container'>
          <div className='toolbar'>
            <Tabs
              className='tabs mdl-tabs'
              value={ activeTab }
               >
                { tabs.map(tab =>
                  <Tab
                    key={ tab.index }
                    value = { tab.index }
                    onClick   = {() => this.handleTabClick(tab)}
                    icon={<FontIcon className={tab.icon} />}
                    label={<div className='tab-label'>{tab.label}</div>}
                    >
                    </Tab>
                  )}
                </Tabs>
            </div>
        </div>
      </header>
    );
  }
}

Header = connect(mapStateToProps, actions)(Header);
export default Header;
