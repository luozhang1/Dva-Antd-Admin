/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import fetch from 'dva/fetch';
import {objToFormData} from './conver';
import {systemError} from './dialog';
import {getUrl} from './reuqestConfig';
import {getStorage, storageKey} from './storage';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => (data.result))
    .catch((e) => {
      systemError(e.message);
      throw new Error('http error');
    });
}

function httpGet(requestApi, data) {
  let requestUrl = getUrl(requestApi);

  return request(requestUrl);
}

function httPost(requestApi, data) {

  let requestUrl = getUrl(requestApi);

  const opt = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getStorage(storageKey.token)}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  return request(requestUrl, opt);

}

export {
  request,
  httpGet,
  httPost,
};
