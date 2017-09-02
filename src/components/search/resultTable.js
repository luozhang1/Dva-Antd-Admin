/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import React from 'react';
import {connect} from 'dva';
import {Table, Pagination, Select, Anchor} from 'antd';
import {reload} from "../../utils/search";
import * as system from '../../systemConstans';


/*
 页面搜索结果-->表格
 props 说明
 table：<Table/> props
 pageName：requestApi 键
 hasOtherSearch：是否组合搜索
 searchData：搜索条件
 searchResult：搜索结果
*/

function SearchResult({
                        table = {},
                        pageName = Symbol.for('common'),
                        hasOtherSearch = true,
                        searchData = new Map(),
                        searchResult = new Map(),
                        dispatch
                      }) {

  const fetchTable = (data) => {

      if (hasOtherSearch) {
        data = {...searchData.get(pageName), ...data};
      }

      reload(pageName, data);

    },
    // 页码改变的回调，参数是改变后的页码及每页条数
    handlerPageChange = (pageStart, pageSize) => (fetchTable({
      pageStart,
      pageSize,
    })),
    // 表格分页、排序、筛选变化时触发
    handlerTableChange = (pagination, filters, {columnKey, field, order}) => (fetchTable({
      columnKey,
      field,
      order,
    })),
    currentResult = searchResult.get(pageName),
    {items = [], totalCount = 0, pageStart = 1} = currentResult || {},
    {columns = []} = table;

  let width = 0;
  columns.map((item) => (
    width += parseInt(item.width)
  ))

  return (
    <div>
      <Table {...table}
             dataSource={items}
             onChange={handlerTableChange}
             pagination={false}
             scroll={{x: width,}}/>

      <Pagination
        className="ant-table-pagination"
        total={totalCount}
        current={pageStart}
        pageSize={system.PAGE_SIZE}
        onChange={handlerPageChange}
      />

    </div>
  )
}

function mapStateToProps({search}) {
  return {
    ...search
  };
}

const SearchTable = connect(mapStateToProps)(SearchResult);

export {
  SearchTable,
};
