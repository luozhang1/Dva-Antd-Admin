/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import * as logService from '../../services/log';

export default {
  namespace: 'demoPage',
  state: {
    editValues: {}
  },
  reducers: {
    setEditValues(state, {payload}) {
      return{
        ...state,
        editValues:payload,
      };
    }
  },
  effects: {
    * deletelog({payload}, {call, put}) {
      const {data} = yield call(request, {payload});
    },
    * viewlog({payload}, {call, put}) {
      const {data} = yield call(logService.viewlog, {payload});
      yield put({type: 'setEditValues', payload: data});
    },
  },
  subscriptions: {},
};
