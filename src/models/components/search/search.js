/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import {fetchPage} from '../../../utils/search';

export default {
  namespace: 'search',
  state: {
    searchData: new Map(),
    searchResult: new Map(),
    action: ''
  },
  reducers: {
    setSearch(state, {payload}) {

      const {data, pageName} = payload,
        {searchData} = state;

      searchData.set(pageName, data);

      return {
        ...state,
        searchData,
        action: `${(pageName).toString()}-search`
      };

    },
    setResult(state, {payload}) {

      const {data, pageName} = payload,
        {searchResult} = state;

      searchResult.set(pageName, data);

      return {
        ...state,
        searchResult,
        action: `${(pageName.toString())}-result`
      };

    },
  },
  effects: {
    * fetch({payload}, {call, put}) {

      const a = yield put({'type': 'setSearch', payload});

      const {data, pageName} = yield call(fetchPage, payload);

      yield put({'type': 'setResult', 'payload': {data, pageName}});

    },
  },
  subscriptions: {},
};
