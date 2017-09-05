/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import fetch from 'dva/fetch';
import {objToFormData,objToUrlParame} from './conver';
import {systemError} from './dialog';
import {getUrl} from './reuqestConfig';
import {getStorage, storageKey} from './storage';

const parseJSON=(response) =>{
    return response.json();
  },

  checkStatus=(response) =>{
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  },

  /**
   * Requests a URL, returning a promise.
   *
   * @param  {string} url       The URL we want to request
   * @param  {object} [options] The options we want to pass to "fetch"
   * @return {object}           An object containing either "data" or "err"
   */
  request=(url, options) =>{
    return fetch(url, options)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => (data.result))
      .catch((e) => {
        systemError(e.message);
        throw new Error('http error');
      });
  },

  httpGet=(requestApi, data) =>{
    let requestUrl = getUrl(requestApi),
      parame=objToUrlParame(data);

    requestUrl+=(parame?`?${parame}`:``);

    return request(requestUrl);
  },

  httPost=(requestApi, data) =>{

    /*let requestUrl = getUrl(requestApi);

    const opt = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getStorage(storageKey.token)}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    return request(requestUrl, opt);*/

    // 测试使用，mock 数据只支持get请求
    return httpGet(requestApi,data);

  };

export {
  request,
  httpGet,
  httPost,
};
