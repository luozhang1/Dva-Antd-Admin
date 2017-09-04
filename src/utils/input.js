/**
 *
 *  Created by youli on 2017/9/1
 *
 */

import moment from 'moment';
import {Form, Row, Col, Input, Button, Icon, DatePicker, Cascader, Select} from 'antd';

const createItem = (data,config) => {
    let result = '';
    switch (data.type) {
      case 'rang':
        result = <DatePicker.RangePicker
          showTime
          ranges={{'今天': [moment(), moment()], '这个月': [moment(), moment().endOf('month')]}} />
        break;
      case 'cascader':
        result = <Cascader options={data.data} placeholder={data.label}/>
        break;
      case 'select':
        result = <Select
          showSearch
          {...config}
        >
          {
            data.data.map((item) => (
              <Select.Option value={item.id} key={item.id}>{item.value}</Select.Option>
            ))
          }
        </Select>
        break;
      case 'select-multiple':
        result = <Select
          multiple={true}
          placeholder={data.label}
        >
          {
            data.data.map((item) => (
              <Select.Option key={item.key}>{item.value}</Select.Option>
            ))
          }
        </Select>
        break;
      default:
        result = <Input {...config}/>;
        break;
    }
    return result;
  },
  getValue = (data,item) => {
    if (data && data[item]) {
      return data[item];
    }
    else {
      return '';
    }
  };

export {
  createItem,
  getValue,
};
