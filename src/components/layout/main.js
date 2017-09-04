/**
 *
 *  Created by youli on 2017/8/31
 *
 */

import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './main.css';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {getStorage, storageKey, isLogin} from '../../utils/storage';

class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    const menus = JSON.parse(getStorage(storageKey.menu)),
      {currentNav} = this.props;

    let one,two;

    if (currentNav && currentNav.indexOf('.') > -1) {
      let navStr = currentNav.split('.');
      one = menus.filter((item) => (item.name == navStr[0] ? item : ''));
      one=one[0];
      two = one.items.filter((item) => (item.name == currentNav ? item : ''));
      two=two[0];
    }

    this.state = {
      menus:menus || [],
      oneSelectNav:one || [],
      twoSelectNav:two || [],
    }

  }

  handlerOneNavClick = ({key}) => {
    const {menus} = this.state,
      oneCurrent = menus.filter((item) => (
        item.name == key ? item : ''
      ));

    this.setState({
      oneSelectNav: oneCurrent[0]
    });
  }


  handlerTwoNavClick = ({key}) => {


    const {dispatch} = this.props,
      {menus, oneSelectNav} = this.state,
      two = oneSelectNav.items.filter((item) => (
        item.name == key ? item : ''
      ));
    ;

    this.setState({
      twoSelectNav: two[0]
    });

    dispatch(routerRedux.push({
      pathname: two[0].url,
    }));

  }

  render() {

    const {menus} = this.state;

    if (!isLogin()) {

      const {dispatch} = this.props;

      dispatch(routerRedux.push({
        pathname: '/login',
      }));

      return (
        <div></div>
      );
    }
    const {Sider, Content} = Layout,
      {children} = this.props,
      {twoSelectNav, oneSelectNav} = this.state,
      MenuNav = ({onSelect, menus = [], selectNav}) => {
        return (
          <Menu onSelect={onSelect}>
            {
              menus.map((item, index) => (
                <Menu.Item
                  className={styles.item + ` ${item.name == selectNav.name ? styles.active : ''}`}
                  key={item.name}>
                  <Icon type={item.icon && "user"}/>
                  <span className="nav-text">{item.displayName}</span>
                </Menu.Item>
              ))
            }
          </Menu>
        )
      };

    return (
      <Layout className={styles.wapper}>
        <Sider
          width={90}
          className={styles.one}>

          <MenuNav onSelect={this.handlerOneNavClick}
                   menus={menus}
                   selectNav={oneSelectNav}/>

        </Sider>
        <Sider
          width={120}
          className={styles.two}
        >
          <MenuNav onSelect={this.handlerTwoNavClick}
                   menus={oneSelectNav.items}
                   selectNav={twoSelectNav}/>
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
export default connect(({layoutMain}) => ({...layoutMain}))(MainLayout);
