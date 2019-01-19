/*
 * @Author: beyondouyuan
 * @Date:   2018-03-18 01:51:39
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-15 21:53:23
 * state.js 定义管理所有的数据状态，即存放数据的地方
 */


import siteConf from '~/config/site'

const state = {
  loginState: {
    hasLogin: false,
    userInfo: {}
  },
  sidebar: {
    opened: false
  },
  menus: [],
  links: [],
  current: '首页',
  cateStore: {
    cateName: '仪表盘测试',
    routes: [{
      path: siteConf.adminPath,
      title: '首页'
    }, {
      path: siteConf.adminPath,
      title: '仪表盘'
    }]
  },
  hotBanner: {

  },
  hotArticle: [],
  hotMembers: [],
  hotTags: [],
  fans: [],
  follows: [],
  memberInfo: {

  }
}

export default state
