/**
 *
 *  Created by youli on 2017/9/1
 *
 */

import {request} from './request';
import * as system from '../systemConstans';

const requestApi = {
    auditLog:Symbol.for('auditLog'),
    login: Symbol.for('apiLogin'),
    getAuth: Symbol.for('getAuth'),
  },
  requestUrl = {

    [requestApi.auditLog]:'/api/services/app/auditLog/getAuditLogs',
    [requestApi.login]:'/api/account',
    [requestApi.getAuth]:'/api/services/app/session/getCurrentLoginAuthInfos'
  },
  getUrl = (item) => (requestUrl[item]);

export {
  requestApi,
  getUrl,
};
