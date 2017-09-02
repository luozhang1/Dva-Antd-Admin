/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import {request} from '../utils/request';

export function fetch(page) {
  return request(`/api/1users?&_limit=10`);
}

export function viewlog({payload}) {
  return request(`/api/viewlog?id=${payload.id}`);
}
