/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import {fetchPage} from '../../../services/search';

export default {
  namespace: 'search',
  state: {
    searchData: new Map(),
    searchResult: new Map(),
    isloading:false,
    action: ''
  },
  reducers: {
    setSearch(state, {payload}) {

      const {data, pageName} = payload;

      return {
        ...state,
        searchData:data,
        isloading:true,
        action: `${(pageName).toString()}-search`
      };

    },
    setResult(state, {payload}) {

      const {data, pageName,currentPage} = payload;

      data.currentPage=currentPage;

      return {
        ...state,
        searchResult:data,
        isloading:false,
        action: `${(pageName.toString())}-result`
      };

    },
  },
  effects: {
    * fetch({payload}, {call, put}) {

      const a = yield put({'type': 'setSearch', payload});

      const {data, pageName,currentPage} = yield call(fetchPage, payload);

      yield put({'type': 'setResult', 'payload': {data, pageName,currentPage}});

    },
  },
  subscriptions: {},
};
