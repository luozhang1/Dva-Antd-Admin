/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import {request} from './request';
import {getUrl} from "./reuqestConfig";
import {objToUrlParame} from './conver';
import * as system from '../systemConstans';

/*
 pageName:requestApi 键，
 data:搜索条件 eg:{key:value},
 */

const
  reload = (pageName, data) => {
    return {
      'type': 'search/fetch',
      payload: {
        pageName,
        data,
      },
    }

  },
  fetchPage = ({pageName, data}) => {
    const url = getUrl(pageName),
      defaultOpt = {
        'pageSize': system.PAGE_SIZE,
        'pageStart': 1,
      },
      parame = {...defaultOpt, ...data};

    let strParame = objToUrlParame(parame);

    return request(`${url}?${strParame}`)
      .then((data = {}) => ({data: data.data, 'pageName': pageName}));
  };

export {
  reload,
  fetchPage,
};
