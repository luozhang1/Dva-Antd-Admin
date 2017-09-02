/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import React from 'react';
import {connect} from 'dva';
import styles from './main.css';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    const {dataNav} = this.props;

    this.state = {
      nav: dataNav || [],
      oneNavSelectKey:dataNav && dataNav[0].id,
      twoNavSelectKey: {}
    };

  }

  handlerOneNavClick = ({item, key, selectedKeys}) => {
    this.setState({
      oneNavSelectKey: key
    });
  }

  handlerTwoNavClick = ({item, key, selectedKeys}) => {
    this.setState({
      twoNavSelectKey: key
    });
  }

  handlerThreeNavClick = () => {

  }

  componentDidCatch(error, info) {
    console.log(error,info);
    debugger;
  }

  render() {
    const {SubMenu} = Menu,
      {Header, Footer, Sider, Content} = Layout,
      {nav, oneNavSelectKey, twoNavSelectKey} = this.state,
      {children} = this.props;


    return (
      <Layout className={styles.wapper}>
        <Sider
          width={90}
          className={styles.one}>
          <div className="logo"/>
          <Menu onSelect={this.handlerOneNavClick}>
            {
              nav.map((item) => (
                <Menu.Item className={styles.item + ` ${item.id == oneNavSelectKey ? styles.active : ''}`}
                           key={item.id}
                           onClick={this.handlerOneNavClick}>
                  <Icon type="user"/>
                  <span className="nav-text">{item.text}</span>
                </Menu.Item>
              ))
            }
          </Menu>
        </Sider>
        <Sider
          width={120}
          className={styles.two}
          onSelect={this.handlerTwoNavClick}
        >
          <Menu onSelect={this.handlerTwoNavClick}>
            {
              nav.map((item) => (
                <Menu.Item
                  className={styles.item + ` ${item.id == twoNavSelectKey ? styles.active : ''}`}
                  key={item.id}>
                  <span className="nav-text">{item.text}</span>
                </Menu.Item>
              ))
            }
          </Menu>
        </Sider>
        <Layout>
          <Content className={styles.content}>
            {children}
          </Content>
        </Layout>
      </Layout>
    )
  }

}

export default MainLayout;
