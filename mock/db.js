/**
 * Created by youli on 2017/6/19.
 */
var Mock = require('mockjs');

const result =(result)=> ({
  success: true,
  result:result,
});

module.exports = () => {

  const log = Mock.mock({
    'items|5': [
      {
        'id|+1': 0,
        'methodName': '@ctitle(5)',
        'serviceName':'@ctitle(5)',
        'clientName':'@ctitle(5)',
        'clientIpAddress':'@ctitle(5)',
        'executionTime': '@datetime'
      }
    ],
    totalCount: 5,// 数据条数
  });

  const getCurrentLoginAuthInfos={
    success:true,
    result:{
      "menus": [
        {
          "name": "MainMenu",
          "displayName": "Main menu",
          "customData": null,
          "items": [
            {
              "name": "Finace",
              "icon": "icon-caiwuguanli",
              "displayName": "财务管理",
              "order": 0,
              "url": "/finance",
              "customData": null,
              "target": null,
              "items": [
                {
                  "name": "Finace.List",
                  "icon": null,
                  "displayName": "资金总览",
                  "order": 0,
                  "url": "/finance/index",
                  "customData": null,
                  "target": null,
                  "items": []
                }
              ]
            },
            {
              "name": "System",
              "icon": "icon-setting",
              "displayName": "系统管理",
              "order": 0,
              "url": "/system",
              "customData": null,
              "target": null,
              "items": [
                {
                  "name": "System.Role",
                  "icon": null,
                  "displayName": "角色",
                  "order": 0,
                  "url": "/system/role",
                  "customData": null,
                  "target": null,
                  "items": []
                },
                {
                  "name": "System.User",
                  "icon": null,
                  "displayName": "用户",
                  "order": 0,
                  "url": "/system/user",
                  "customData": null,
                  "target": null,
                  "items": []
                },
                {
                  "name": "System.AuditLog",
                  "icon": null,
                  "displayName": "日志",
                  "order": 0,
                  "url": "/system/auditLog",
                  "customData": null,
                  "target": null,
                  "items": []
                }
              ]
            }
          ]
        },
      ],
      "user": {
        "name": "admin",
        "surname": "admin",
        "userName": "admin",
        "emailAddress": "admin@aspnetzero.com",
        "profilePictureId": null,
        "id": 1
      }
    },
    },
    account={
    success:true,
      result:'EmtbxIOsRFMsAxehTgWlzjzINcmFlzWqkKVfHrXcD6H_7YxlhTUlZSWJXrspI4fncxx',
    };

  var data = {
    account,
    getCurrentLoginAuthInfos,
    getAuditLogs:result(log),
  };

  return data;

}

