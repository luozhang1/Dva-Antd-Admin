/**
 *
 *  Created by youli on 2017/8/31
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

class DemoPage extends React.Component {

  handlerTbblEdit = (item) => {
    debugger
  }

  handlerTblDelete = () => {
  }

  handlerDelete = () => {
    const {selectTbl} = this.state;
    if (!selectTbl || selectTbl.length == 0) {
      warning('请选择要删除的数据');
      return false;
    }
  }

  onSelectChange = (keys, rows) => {
    this.setState({
      selectTbl: rows
    });
  }

  constructor(props) {
    super(props);

    const nav = [
        {
          id: 1,
          text: '二级菜单1',
          menu: [
            {
              id: 1,
              text: '三级菜单1'
            }

          ]
        },

        {
          id: 2,
          text: '二级菜单2',
          menu: [
            {
              id: 2,
              text: '三级菜单2'
            }

          ]
        },
        {
          id: 3,
          text: '二级菜单3',
          menu: [
            {
              id: 3,
              text: '三级菜单3'
            }

          ]
        },
        {
          id: 4,
          text: '二级菜单4',
          menu: [
            {
              id: 4,
              text: '三级菜单4'
            }

          ]
        }
      ],
      child = [
        {id: 'title', span: '6', label: '文本框', type: 'text', status: ''},
        {id: 'name', span: '6', label: '文本框', type: 'text', status: ''},
        {id: 'content', span: '6', label: '文本框', type: 'text', status: ''},
        {id: 'datetime', span: '6', label: '文本框', type: 'text', status: ''},
      ];

    this.state = {
      nav,
      searchFields: child,
      visible: false,
      selectTbl: [],
      test: {
        value: {
          'a': '1'
        }
      },
      testStr: '1'
    };


  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch(reload(requestApi.index, {}));
  }

  render() {
    const {nav, searchFields} = this.state,
      columns = [
        {title: '标题', dataIndex: 'title', width: 200, sorter: true},
        {title: '名称', dataIndex: 'name', width: 200},
        {title: '时间', dataIndex: 'datetime', width: 200},
        {
          title: '操作',
          fixed: 'right',
          width: 100,
          render: (item) => (

            <TblOper key={item.id}
                     button={
                       [
                         {
                           btnType: 'edit',
                           okClick: this.handlerTbblEdit,
                           editFields: searchFields,
                           initialValue: getUrl(requestApi.init) + '?id=' + item.id,
                           saveValue: getUrl(requestApi.save),
                         },
                         {
                           btnType: 'delete',
                           okClick: this.handlerTblDelete.bind(null, item)
                         },
                       ]
                     }/>
          ),
        },
      ],
      rowSelection = {
        onChange: this.onSelectChange,
      },
      AddBtn = () => {
        const TempBtn = ({onClick}) => (
            <Button className={styles.button} onClick={onClick}>新增</Button>
          ),
          data = {
            btnType: 'edit',
            okClick: this.handlerTblEdit,
            editFields: searchFields,
            initialValue: getUrl(requestApi.init),
            saveValue: getUrl(requestApi.save),
          };
        return (
          <EditBtnInModal Btn={TempBtn} {...data}/>
        );
      };
    return (
      <MainLayout dataNav={nav}>
        <SearchCondition
          conditionFields={searchFields}
          pageName={requestApi.index}/>
        <Row className={styles.oper}>
          <Col span={24} style={{textAlign: 'right'}}>
            <AddBtn className={styles.button}>新增</AddBtn>
            <Button type="danger"
                    className={styles.button}
                    onClick={this.handlerDelete}>批量删除</Button>
          </Col>
        </Row>
        <SearchTable
          table={{
            columns,
            rowSelection: rowSelection,
            rowKey: (record => record.id),
          }}
          pageName={requestApi.index}/>
      </MainLayout>
    )
  }
}

function mapStateToProps({demoPage}) {
  return {
    ...demoPage
  };
}

export default connect(mapStateToProps)(DemoPage);
