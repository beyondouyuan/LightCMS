/*
 * @Author: beyondouyuan
 * @Date:   2018-03-18 01:47:48
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-02-15 13:44:40
 * actions.js 即对数据进行各种操作，即通过commit给mutaions实现
 */

import * as types from './mutations-types'

export const setLogoutStateAction = ({ commit }) => {
  const loginState = {
      hasLogin: false,
      userInfo: {}
    }
  commit(types.SET_LOGIN_STATE, loginState)
}

export const setLoginStateAction = ({ commit }, loginState) => {
  commit(types.SET_LOGIN_STATE, loginState)
}

export const setToggleSideBarAction = ({ commit }) => {
  commit(types.TOGGLE_SIDEBAR)
}

export const setCloseSideBarAction = ({ commit }, opener) => {
  commit(types.CLOSE_SIDEBAR, opener)
}

export const setCateAction = ({ commit }, cate) => {
  commit(types.SET_CATE, cate)
}

export const setTopMenuAction = ({ commit }, menus) => {
  commit(types.SET_TOP_MENUS, menus)
}

export const setFriendLinkAction = ({ commit }, links) => {
  commit(types.SET_FRIEND_LINK, links)
}
export const setHotMembersAction = ({ commit }, hotMembers) => {
  commit(types.SET_HOT_MEMBERS, hotMembers)
}
export const setHotBannerAction = ({ commit }, hotBanner) => {
  commit(types.SET_HOT_BANNER, hotBanner)
}
export const setMemberInfo = ({ commit }, memberInfo) => {
  commit(types.SET_MEMBER_INFO, memberInfo)
}

// 解决vuex问题
export const nuxtServerInit = ({ commit }, { req }) => { // 将本地服务端数据发送给浏览器
  if (req.session && req.session.userInfo) {
    const loginState = {
      hasLogin: req.session.userLogined,
      userInfo: req.session.userInfo
    }
    commit(types.SET_LOGIN_STATE, loginState)
  } else {
    const loginState = {
      hasLogin: false,
      userInfo: {}
    }
    commit(types.SET_LOGIN_STATE, loginState)
  }
}
