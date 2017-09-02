/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import React from 'react';
import {Popconfirm} from 'antd';
import {EditBtnInModal} from './editBtn';
import * as styles from './tblOper.css';

/*
 删除按钮
 props 说明
 okClick：点击确认触发的事件
*/
const TblDelete = ({okClick}) => {
    return (
      <span>
        <Popconfirm
          title="是否确认删除？"
          onConfirm={okClick}
          okText="确定"
          cancelText="取消">

          <a href="#">删除</a>

        </Popconfirm>
        <i className={styles.i + ' ant-divider'}/>
      </span>
    );
  },
  // 修改按钮
  TblEdit = ({data}) => {
    const TempBtn = ({onClick}) => (
              <span>
                <a onClick={onClick}>修改</a>
                <span className="ant-divider"/>
              </span>
    );
    return (
      <EditBtnInModal Btn={TempBtn} {...data}/>
    );
  },
  TblOper = ({button = []}) => {
    return (
      <div className={styles.wapper}>

        {
          button.map((item, index) => {
            const {btnType} = item;
            switch (btnType) {
              case 'delete':
                return <TblDelete key={index} {...item}/>
                break;
              case 'edit':
                return <TblEdit key={index} data={item}/>
                break;
            }

          })
        }

      </div>
    )
  };

export {
  TblOper,
} ;
