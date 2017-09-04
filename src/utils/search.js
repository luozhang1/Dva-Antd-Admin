/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import {httPost} from './request';
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
    const url = (pageName),
      defaultOpt = {
        'skipCount': 0,
        'maxResultCount': system.PAGE_SIZE,
        'startDate':'2017-09-02',
        'endDate':'2017-09-02',
      },
      parame = {...defaultOpt, ...data};

    return httPost(pageName,parame)
      .then((data = {}) => {
      return {data: data, 'pageName': pageName}
      });
  };

export {
  reload,
  fetchPage,
};
