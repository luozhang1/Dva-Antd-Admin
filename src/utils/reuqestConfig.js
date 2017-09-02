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
  },
  requestUrl = {
    [requestApi.index]: '/api/log',
    [requestApi.init]: '/api/viewlog',
    [requestApi.save]: '/api/deletelog',
  },
  getUrl = (item) => (requestUrl[item]);

export {
  requestApi,
  getUrl,
};
