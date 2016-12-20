import App from './components/App';
import configureStore from './store/configureStore';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MainSection from './components/Main.js';
import Grid from './components/Grid.js';
import GeoLocation from './components/GeoLocation.js';
import KeyMetrics from './components/KeyMetrics.js';
injectTapEventPlugin();

import 'normalize.css';
import './node_modules/font-awesome/css/font-awesome.min.css';
import './node_modules/fixed-data-table/dist/fixed-data-table.css';
import './css/main.css';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={ store }>
    <MuiThemeProvider>
      <Router onUpdate={() => window.scrollTo(0, 0)} history={ history }>
        <Route component={ App }>
        <Route component ={ MainSection }>
          <Route path='/' component ={ Grid }/>
          <Route path='/grid' component ={ Grid }/>
          <Route path='/geolocation' component ={ GeoLocation }/>
          <Route path='/keymetrics' component ={ KeyMetrics }/>
        </Route>
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
