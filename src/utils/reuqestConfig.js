/**
 *
 *  Created by youli on 2017/9/1
 *
 */

import {request} from './request';
import * as system from '../systemConstans';

const requestApi = {
    index: Symbol.for('index'),
    init: Symbol.for('init'),
    save: Symbol.for('save'),

    auditLog:Symbol.for('auditLog'),

    login: Symbol.for('apiLogin'),
    getAuth: Symbol.for('getAuth'),


  },
  requestUrl = {
    [requestApi.index]: '/api/log',
    [requestApi.init]: '/api/viewlog',
    [requestApi.save]: '/api/deletelog',

    [requestApi.auditLog]:'/api/services/app/auditLog/getAuditLogs',

    [requestApi.login]:'/api/account',
    [requestApi.getAuth]:'/api/services/app/session/getCurrentLoginAuthInfos'
  },
  getUrl = (item) => (requestUrl[item]);

export {
  requestApi,
  getUrl,
};
