/**
 *
 *  Created by youli on 2017/9/1
 *
 */


import React from 'react';
import {connect} from 'dva';
import {createItem, getValue} from '../../utils/input';
import {Spin, Form, Row, Col, Modal} from 'antd';
import {httPost, httpGet} from "../../utils/request";

/*
 修改按钮，Form In Modal
 props 说明
 Btn:修改按钮的组件，需要接收onClick事件
 okClick:点击确定按钮的回调
 editFields: 需要修改的字段,
 initialValue: Form 初始化,
 saveValue: Form 保存,
*/
class EditFormInModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      isloading: false,
      initResult: {},
      saveResult: {},
    };

  }

  // 点击编辑按钮，显示Modal
  handlerShowModal = () => {
    const {dispatch, initialValue} = this.props;

    this.setState(
      {
        visible: true,
        isloading: true,
      },
      () => {

        httpGet(initialValue)
          .then((data) => (

            this.setState({
              isloading: false,
              initResult: data.data
            })

          ));
      });

  }

  // 点击确定按钮触发的事件
  handlerSave = () => {
    const {saveValue, dispatch, form} = this.props,
      {getFieldsValue} = form,
      callBackFun = this.handlerSaveCallBack,
      values = getFieldsValue();

    this.setState({
      isloading: true,
    }, () => {

      httPost(saveValue)
        .then((data) => {

          this.setState({
            isloading: false,
            saveValue: data.data
          })

          callBackFun(data.data);

        });

    });

  }

  // 点击确定按钮的callback
  handlerSaveCallBack = (data) => {

    this.setState({
      visible: false,
    });

    const {
      okClick
    } = this.props;

    okClick(data);

  }

  // 点击取消触发的事件
  handlerCancel = (data) => {

    this.setState({
      visible: false,
    });

  }

  render() {

    const {Btn, editFields, form} = this.props,
      {getFieldDecorator} = form,
      {visible, isloading, initResult} = this.state;

    return (
      <span>

        {
          <Btn onClick={this.handlerShowModal}/>
        }

        <Modal
          visible={visible}
          confirmLoading={isloading}
          title="修改"
          onCancel={this.handlerCancel}
          onOk={this.handlerSave}
        >
          <Spin spinning={isloading}>
            <Form>
              <Row gutter={16}>
                {
                  editFields.map((item) => (
                    <Col span={item.span} key={item.id}>
                      <Form.Item>
                        {getFieldDecorator(`${item.id}`, {
                          initialValue: getValue(initResult, item.id),
                        })(
                          createItem(item)
                        )}
                      </Form.Item>
                    </Col>
                  ))
                }
              </Row>
            </Form>
          </Spin>
        </Modal>

      </span>
    );
  }
};

function mapStateToProps({editFormInModal}) {
  return {
    ...editFormInModal
  };
}

const EditBtnInModal = connect(mapStateToProps)(Form.create()(EditFormInModal));

export {
  EditBtnInModal,
};
