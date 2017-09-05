# Dva-Antd-Admin
## 特性日志
* 基于antd-design，dva，mockjs，json-server 企业级后台管理系统实践。
* 基于dva动态加载Modal和路由，按需加载。
* 使用roadhog本地调试和构建，其中 `json-server` 配合 `mockjs`实现脱离后端独立开发。
* `-`封装了后台页面频繁出现的场景：
	
	1.动态化菜单
	
	2.初始化搜索条件，根据搜索内容展示结果
	
	3.初始化表单，对表单数据进行修改

## 更新日志
#### 1.0
`2017-09-05`

* 实现登录
* 封装了页面的 搜索、表格展示、表格操作

## 开发构建
### 目录结构
```
├── dist				# 项目输出目录
├── mock				# 数据mock
├── package.json		# 项目信息
├── public				# 公共文件
└── src					# 源码目录
    ├── action			# action
    ├── assets			# 图片
    ├── common.less		# 全局样式
    ├── components		# UI组件
    ├── index.js		# 入口文件
    ├── models			# 数据模型
    ├── router.js		# 路由配置
    ├── routes			# 路由组件
    ├── services		# 数据接口
    ├── systemConstans.js	#系统配置文件	
    └── utils			# 工具函数
        ├── conver.js	# 类型转换
        ├── dialog.js	# 弹窗
        ├── input.js	# 生成表单组件
        ├── request.js	# fetch 包装
        ├── reuqestConfig.js	# 接口地址配置
        └── storage.js	# storage 管理
```
### 快速开始
克隆项目文件：

	git clone git@github.com:youli2013/Dva-Antd-Admin.git

进入目录安装依赖
	
	npm i
	
开发

	roadhog server
	打开 http://localhost:8000/

模拟数据

	cd mock
	json-server db.js

构建：[详情](https://github.com/sorrycc/roadhog)

	roadhog build
	会打包至dist/
	
## Demo

#### 效果图
![Editor preferences pane](https://raw.githubusercontent.com/youli2013/Dva-Antd-Admin/master/demo.jpeg)

#### 源码
```
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
import moment from 'moment';

const AuditLog=({dispatch}) =>{
  const searchInitData={
      userName:123,
      'startDate_endDate':[moment().subtract(7,'days'),moment()],
    },
    searchFields = [
      {
        id: 'hasException',
        span: '8',
        type: 'select',
        data:[
          {id:'',value:'全部'},
          {id:'true',value:'成功'},
          {id:'false',value:'错误'},
        ],
        config:{
          placeholder: '日志状态',
        }
      },
      {
        id: 'userName',
        span: '8',
        type: 'text',
        defaultValue:searchInitData['userName'],
        config:{
          placeholder: '用户名称',
        }
      },
      {
        id: 'serviceName',
        span: '8',
        type: 'text',
        config:{
          placeholder:'服务器名称'
        }
      },
      {
        id: 'startDate_endDate',
        span: '16',
        type: 'rang',
        defaultValue:searchInitData['startDate_endDate'],
        config:{
          placeholder:'服务器名称'
        }
      },
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
        )
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

  dispatch(searchFetch(pageName,searchInitData));

  return (
    <MainLayout currentNav="System.AuditLog">

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
export default connect()(AuditLog);

```


