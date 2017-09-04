/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import React from 'react';
import {connect} from 'dva';
import {Form, Row, Col, Button} from 'antd';
import {createItem, getValue} from '../../utils/input';
import styles from './conditions.css';

/*
 页面搜索框组件
 props 说明
 conditionFields：搜索条件
 pageName：requestApi 键
 hasOtherSearch：是否组合搜索
 searchData：搜索条件
*/

function conditions({
                      conditionFields = [],
                      pageName = Symbol('common'),
                      hasOtherSearch = true,
                      searchData = new Map(),
                      form,
                      dispatch
                    }) {
  // 搜索按钮点击事件
  const handlerSave = (e) => {

      const {getFieldsValue} = form;

      let data = getFieldsValue();

      if (hasOtherSearch) {
        data = {...currentSearchData, ...data};
      }

      dispatch({
        type: 'search/fetch',
        payload: {
          data,
          pageName,
        }
      });

      e.preventDefault();
    },
    {getFieldDecorator} = form,
    currentSearchData = searchData.get(pageName);

  return (
    <Form
      className={styles.search}
      onSubmit={handlerSave}
    >

      <Row gutter={16}>
        {
          conditionFields.map((item) => (
            <Col span={item.span} key={item.id}>
              <Form.Item>
                {getFieldDecorator(`${item.id}`, {
                  initialValue: getValue(currentSearchData, `${item.id}`),
                })(
                  createItem(item)
                )}
              </Form.Item>
            </Col>
          ))
        }
      </Row>

      <Row>
        <Col span={24} style={{textAlign: 'right'}}>
          <Button type="primary" icon="search" htmlType="submit">搜索</Button>
        </Col>
      </Row>

    </Form>
  );
}

function mapStateToProps({search}) {
  return {
    ...search
  };
}

const SearchCondition = connect(mapStateToProps)(Form.create()(conditions));

export {
  SearchCondition
};
