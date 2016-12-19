import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const mapStateToProps = (state) => ({
  header: state.header,
});

class Header extends React.Component {
  handleTabClick() {
    console.log('click');
  }

  render() {

    const { header } = this.props;
    const { githubProject, title, titleIcon, tabs } = header;
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
              initialSelectedIndex='1'
              >
                { tabs.map(tab =>
                  <Tab
                    key={ tab.route }
                    onClick   = {this.handleTabClick.bind(null, 0)}
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
