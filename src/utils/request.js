/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import fetch from 'dva/fetch';
import {objToUrlParame} from './conver';
import {systemError} from './dialog';

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
    .then(data => ({data}))
    .catch((e) => {
      systemError(e.message);
    });
}

function httpGet(url, data) {

  let parame = objToUrlParame(data),
    requestUrl = `${url}${parame ? `?${parame}` : ''}`;
  return request(requestUrl);

}

function httPost(url, data) {
  var opt = {
    method: 'Post',
    mode: 'cors',
    body: objToUrlParame(data),
  };

  return request(url, opt);

}

export {
  request,
  httpGet,
  httPost,
};
