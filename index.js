import App from './components/App';
import configureStore from './store/configureStore';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import './css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'material-design-icons/iconfont/material-icons.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={ store }>
    <MuiThemeProvider>
      <Router onUpdate={() => window.scrollTo(0, 0)} history={ history }>
        <Route path='/' component={ App } />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
