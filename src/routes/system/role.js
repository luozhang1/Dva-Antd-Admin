/**
 * Created by Administrator on 2017/9/2.
 */
import React from 'react';
import {connect} from 'dva';
import {Row, Col, Button} from 'antd';
import MainLayout from '../../components/layout/main';
import {SearchCondition} from '../../components/search/conditions';
import {SearchTable} from '../../components/search/resultTable';
import {TblOper} from '../../components/button/tblOper';
import {EditBtnInModal} from '../../components/button/editBtn';
import {searchFetch} from '../../action/search';
import {requestApi, getUrl} from "../../utils/reuqestConfig";
import {warning} from '../../utils/dialog'

const Role=({dispatch}) =>{
  const searchFields = [
      {id: 'title', span: '6', label: '日志状态', type: 'select',data:[
        {key:'0',value:'全部'},
        {key:'1',value:'成功'},
        {key:'2',value:'错误'},
      ], status: ''},
      {id: 'name', span: '6', label: '用户名称', type: 'text', status: ''},
      {id: 'content', span: '6', label: '服务器名称', type: 'text', status: ''},
      {id: 'datetime', span: '6', label: '操作名称', type: 'text', status: ''},
    ],
    columns = [
      {title: 'ID', dataIndex: 'id', width: 50},
      {title: '操作名称', dataIndex: 'methodName', width: 200},
      {title: '服务器名称', dataIndex: 'serviceName', width: 200},
      {title: '操作时间', dataIndex: 'executionTime', width: 200},
      {title: '客户端', dataIndex: 'clientName', width: 200},
      {title: '请求地址', dataIndex: 'clientIpAddress', width: 200},
      {
        title: '操作',
        width: 100,
        flex:'right',
        render: (item) => (

          <TblOper key={item.id}
                   button={
                     [
                       {
                         btnType: 'edit',
                         okClick: handlerTblEdit,
                         editFields: searchFields,
                         initialValue: getUrl(requestApi.init) + '?id=' + item.id,
                         saveValue: getUrl(requestApi.save),
                       },
                       {
                         btnType: 'delete',
                         okClick: handlerTblDelete.bind(null, item)
                       },
                     ]
                   }/>
        ),
      },
    ],
    pageName=requestApi.auditLog,
    AddBtn = () => {
      const TempBtn = ({onClick}) => (
          <Button  onClick={onClick}>新增</Button>
        ),
        data = {
          btnType: 'edit',
          okClick: handlerTblEdit,
          editFields: searchFields,
          initialValue: getUrl(requestApi.init),
          saveValue: getUrl(requestApi.save),
        };
      return (
        <EditBtnInModal Btn={TempBtn} {...data}/>
      );
    },
    handlerTblEdit = (item) => {
      warning('表格修改');
    },
    handlerTblDelete = () => {
      warning('表格删除');
    },
    handlerDelete = () => {
      const {selectTbl} = this.state;
      if (!selectTbl || selectTbl.length == 0) {
        warning('请选择要删除的数据');
        return false;
      }
    };

  dispatch(searchFetch(pageName));

  return (
    <MainLayout currentNav="System.Role">

      <SearchCondition
        conditionFields={searchFields}
        pageName={pageName}/>

      <Row className="spp-oper-row">
        <Col span={24} style={{textAlign: 'right'}}>
          <AddBtn>新增audit</AddBtn>
          <Button type="danger"
                  onClick={handlerDelete}>批量删除</Button>
        </Col>
      </Row>

      <SearchTable
        table={{
          columns,
          rowKey:'id',
        }}
        pageName={pageName}/>

    </MainLayout>
  )
}
export default connect()(Role);
