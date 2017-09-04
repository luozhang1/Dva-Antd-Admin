/**
 * Created by Administrator on 2017/9/2.
 */
import React from 'react';
import {connect} from 'dva';
import styles from '../demo.css';
import {Row, Col, Button, Tag, Modal, Form, Input, Radio} from 'antd';
import MainLayout from '../../components/layout/main';
import {SearchCondition} from '../../components/search/conditions';
import {SearchTable} from '../../components/search/resultTable';
import {TblOper} from '../../components/button/tblOper';
import {reload} from "../../utils/search";
import {EditBtnInModal} from '../../components/button/editBtn';
import {requestApi, getUrl} from "../../utils/reuqestConfig";
import {warning} from '../../utils/dialog'

class AuditLog extends React.Component {

  handlerTbblEdit = (item) => {

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

    const child = [
      {id: 'title', span: '6', label: '日志状态', type: 'select',data:[
        {key:'0',value:'全部'},
        {key:'1',value:'成功'},
        {key:'2',value:'错误'},
      ], status: ''},
      {id: 'name', span: '6', label: '用户名称', type: 'text', status: ''},
      {id: 'content', span: '6', label: '服务器名称', type: 'text', status: ''},
      {id: 'datetime', span: '6', label: '操作名称', type: 'text', status: ''},
    ];

    this.state = {
      searchFields: child,
    };

  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(reload(requestApi.auditLog, {}));
  }

  render() {
    const {searchFields} = this.state,
      columns = [
        {title: '时间', dataIndex: 'executionTime', width: 200, sorter: true},
        {title: '名称', dataIndex: 'name', width: 200},
        {title: '时间', dataIndex: 'datetime', width: 200},
        {
          title: '操作',
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
      <MainLayout currentNav="System.AuditLog">

        <SearchCondition
          conditionFields={searchFields}
          pageName={requestApi.auditLog}/>

        <Row className={styles.oper}>
          <Col span={24} style={{textAlign: 'right'}}>
            <AddBtn className={styles.button}>新增audit</AddBtn>
            <Button type="danger"
                    className={styles.button}
                    onClick={this.handlerDelete}>批量删除</Button>
          </Col>
        </Row>

        <SearchTable
          table={{
            columns,
            rowKey:(item)=>{
              return (item.userId);
            },
          }}
          pageName={requestApi.auditLog}/>

      </MainLayout>
    )
  }
}


export default connect()(AuditLog);
