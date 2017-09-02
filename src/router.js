/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import React from 'react';
import { Router, Route } from 'dva/router';
import DemoPage from './routes/demo';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/demo" component={DemoPage} />
    </Router>
  );
}

export default RouterConfig;
