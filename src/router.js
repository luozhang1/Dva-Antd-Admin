/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import React from 'react';
import { Router, Route } from 'dva/router';
import LoginPage from './routes/login';
import AuditLog from './routes/system/auditLog';
import Maintenance from './routes/system/maintenance';
import Role from './routes/system/role';
import User from './routes/system/user';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/system/auditLog" component={AuditLog} />
      <Route path="/system/maintenance" component={Maintenance} />
      <Route path="/system/role" component={Role} />
      <Route path="/system/user" component={User} />

      <Route path="/login" component={LoginPage} />
      <Route path="/" component={AuditLog} />
    </Router>
  );
}

export default RouterConfig;
