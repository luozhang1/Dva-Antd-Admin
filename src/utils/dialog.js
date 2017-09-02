/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import {message} from 'antd';

const dialog = {
  success(msg) {
    message.success(msg);
  },
  systemError(msg) {
    message.error(msg);
  },
  warning(msg) {
    message.warning(msg);
  },
  info(msg) {
    message.info(msg);
  },
  loading(msg) {
    message.loading(msg);
  }
}

export default dialog;
