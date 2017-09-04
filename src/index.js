/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import dva from 'dva';
import {hashHistory } from 'dva/router';
import createLoading from 'dva-loading';
import {createLogger} from 'redux-logger';
import {combineReducers} from 'redux-immutable';
import dialog from './utils/dialog';
import './common.css';

// 1. Initialize
const app = dva({
  history: hashHistory ,
  /*onAction: createLogger(),*/
  /*onError(e) {
    dialog.systemError(e.message);
  },*/
});

// 2. Plugins

/*
app.use(createLoading());
*/

// 3. Model
app.model(require('./models/components/search/search'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
