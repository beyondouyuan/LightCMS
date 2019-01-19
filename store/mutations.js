/*
 * @Author: beyondouyuan
 * @Date:   2018-03-18 01:48:44
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-17 20:48:51
 * mutations.js 对state进行修改
 */
import * as types from './mutations-types'

const mutations = {
    [types.TOGGLE_SIDEBAR](state) {
        state.sidebar.opened = !state.sidebar.opened
    },
    [types.CLOSE_SIDEBAR](state, opened) {
        state.sidebar.opened = opened
    },
    [types.SET_CATE](state, cate) {
        state.cateStore = cate
    },
    [types.SET_LOGIN_STATE](state, loginState) {
        state.loginState = loginState
    },
    [types.SET_TOP_MENUS](state, menus) {
        state.menus = menus
    },
    [types.SET_FRIEND_LINK](state, links) {
        state.links = links
    },
    [types.SET_CURRENT_NAME](state, current) {
        state.current = current
    },
    [types.SET_HOT_ARTICLE](state, hotArticle) {
        state.hotArticle = hotArticle
    },
    [types.SET_HOT_TAGS](state, hotTags) {
        state.hotTags = hotTags
    },
    [types.SET_HOT_MEMBERS](state, hotMembers) {
        state.hotMembers = hotMembers
    },
    [types.SET_HOT_BANNER](state, hotBanner) {
        state.hotBanner = hotBanner
    },
    [types.SET_MEMBER_INFO](state, memberInfo) {
        state.memberInfo = memberInfo
    }


}

export default mutations
