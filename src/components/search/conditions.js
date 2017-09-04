/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import React from 'react';
import {connect} from 'dva';
import {Form, Row, Col, Button} from 'antd';
import {searchFetch} from '../../action/search';
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

const conditions=({
                    conditionFields = [],
                    pageName = Symbol('common'),
                    hasOtherSearch = true,
                    searchData ={},
                    isloading,
                    form,
                    dispatch
                  }) =>{
  // 搜索按钮点击事件
  const handlerSave = (e) => {

      const {getFieldsValue} = form;

      let data = getFieldsValue();

      if (hasOtherSearch) {
        data = {...searchData, ...data};
      }

      dispatch(searchFetch(pageName,data));

      e.preventDefault();
    },
    {getFieldDecorator} = form;

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
                  initialValue:item.defaultValue || getValue(searchData, `${item.id}`),
                })(
                  createItem(item,item.config)
                )}
              </Form.Item>
            </Col>
            )
          )
        }
      </Row>

      <Row>
        <Col span={24} style={{textAlign: 'right'}}>
          <Button loading={isloading} type="primary" icon="search" htmlType="submit">搜索</Button>
        </Col>
      </Row>

    </Form>
  );
}

const SearchCondition = connect(({search})=>(({...search})))(Form.create()(conditions));

export {
  SearchCondition
};
