/**
 * Created by youli on 2017/6/19.
 */
var Mock = require('mockjs');

const result = {
  error: null,
  result: '',
  success: true,
  targetUrl: '',
};

module.exports = () => {

  const log = Mock.mock({
    'items|5': [
      {
        'id|+1': 0,
        'title': '@ctitle(5)',
        'name': '@cname(3)',
        'content': '@cparagraph(10,50)',
        'datetime': '@datetime'
      }
    ],
    totalCount: 5,// 数据条数
    pageStart: 1,// 当前的页面
  });

  var data = {
    login: {
      error: null,
      result: '',
      success: true,
      targetUrl: '',
    },
    log,
    deletelog:{
      error: null,
      result: [],
      success: true,
      targetUrl: '',
    },
    viewlog:{
      'id': 1,
      'title': '标题',
      'name': '名称',
      'content': '内容',
      'datetime': '2018-08-08'
    }
  };

  return data;

}

