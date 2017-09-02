/**
 *
 *  Created by youli on 2017/9/2
 *
 */

import React from 'react';
import {connect} from 'dva';
import styles from './demo.css';
import {Row, Col, Button, Tag, Modal, Form, Input, Radio} from 'antd';
import MainLayout from '../components/layout/main';
import {SearchCondition} from '../components/search/conditions';
import {SearchTable} from '../components/search/resultTable';
import {TblOper} from '../components/button/tblOper';
import {reload} from "../utils/search";
import {EditBtnInModal} from '../components/button/editBtn';
import {requestApi, getUrl} from "../utils/reuqestConfig";
import {warning} from '../utils/dialog'

class loginPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

  }

}

function mapStateToProps({login}) {
  return {
    ...login
  };
}

export default connect(mapStateToProps)(loginPage);
