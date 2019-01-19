/*
 * @Author: beyondouyuan
 * @Date:   2018-08-17 01:03:24
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-18 20:59:08
 */


import siteConf from '~/config/site'

export default function ({ route, store, req, redirect }) {
  const routerPath = route.path
  if (routerPath.indexOf(siteConf.adminPath) > -1) {
    const { loginState } = store.state
    if (!loginState.hasLogin || !loginState.userInfo.id || (loginState.userInfo.role !== 'admin' && loginState.userInfo.role !== 'superAdmin')) {
      delete req.session.userLogined
      delete req.session.userInfo
      return redirect(`${siteConf.adminPath}/login`)
    }
  } else if (routerPath.indexOf('/posts/add') > -1) {
    const { loginState } = store.state
    if (!loginState.hasLogin || !loginState.userInfo.id) {
      delete req.session.userLogined
      delete req.session.userInfo
      return redirect('/register')
    }
  }
}
