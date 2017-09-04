/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import {httPost} from '../utils/request';
import {getUrl} from "../utils/reuqestConfig";
import {objToUrlParame} from '../utils/conver';
import * as system from '../systemConstans';

/*
 pageName:requestApi 键，
 data:搜索条件 eg:{key:value},
 */

const
  fetchPage = ({pageName, data}) => {
    const url = (pageName),
      defaultOpt = {
        'pageStart':1,
        'pageSize':system.PAGE_SIZE,
      };

    let parame = {...defaultOpt, ...data},
      skipCount=(parame.pageStart-1)*parame.pageSize,
      maxResultCount=parame.pageSize;

    parame={
      ...parame,
      skipCount,
      maxResultCount,
    };

    return httPost(pageName,parame)
      .then((data = {}) => ({data: data, 'pageName': pageName,'currentPage':parame.pageStart}));
  };

export {
  fetchPage,
};
