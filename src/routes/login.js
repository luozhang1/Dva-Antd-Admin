/**
 *
 *  Created by youli on 2017/9/2
 *
 */

import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {warning} from '../utils/dialog'
import {Form, Icon, Input, Button, Row, Col} from 'antd';
import {httPost} from '../utils/request';
import {requestApi} from '../utils/reuqestConfig';
import {setStorage, storageKey} from '../utils/storage';
import styles from './login.css';

function LoginPage({form, dispatch}) {
  const handleSubmit = (e) => {
      e.preventDefault();

      const {getFieldsValue, validateFields} = form;

      validateFields((err, values) => {
        if (err) {
          return;
        }

        const data = getFieldsValue();

        httPost((requestApi.login), data)
          .then((data) => {

            setStorage(storageKey.token, data);

            httPost(requestApi.getAuth)
              .then((data) => {

                setStorage(storageKey.menu, data.menus[0].items);
                dispatch(routerRedux.push({
                  pathname: '/demo',
                }));

              })

          })

      });

    },
    {getFieldDecorator} = form;


  return (
    <Row className={styles.form}>
      <Col>
        <Form onSubmit={handleSubmit} className="login-form">
          <h2 className={styles.logo}><span>万众云付</span></h2>
          <Form.Item hasFeedback>
            {getFieldDecorator('usernameOrEmailAddress', {
              rules: [
                {required: true, message: '用户名不能为空'},
              ]
            })(
              <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                     placeholder="请输入用户名"/>
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {required: true, message: '密码不能为空'}
              ]
            })(
              <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                     type="password"
                     placeholder="请输入密码"/>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.btn}>
              登录
            </Button>
          </Form.Item>
        </Form>

      </Col>
    </Row>
  );

}

export default connect()(Form.create()(LoginPage));
