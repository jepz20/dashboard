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

import 'normalize.css'
import './node_modules/font-awesome/css/font-awesome.min.css';
import './css/main.css';

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
