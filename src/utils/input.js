/**
 *
 *  Created by youli on 2017/9/1
 *
 */

import moment from 'moment';
import {Form, Row, Col, Input, Button, Icon, DatePicker, Cascader, Select} from 'antd';

const createItem = (data) => {
    let result = '';
    switch (data.type) {
      case 'rang':
        result = <DatePicker.RangePicker
          ranges={{'今天': [moment(), moment()], '这个月': [moment(), moment().endOf('month')]}}
          showTime format="YYYY/MM/DD HH:mm:ss"/>
        break;
      case 'cascader':
        result = <Cascader options={data.data} placeholder={data.label}/>
        break;
      case 'select':
        result = <Select
          showSearch
          placeholder={data.label}>
          {
            data.data.map((item) => (
              <Select.Option key={item.key}>{item.value}</Select.Option>
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
        result = <Input placeholder={data.label}/>;
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
