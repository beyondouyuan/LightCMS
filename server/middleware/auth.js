/*
* @Author: beyondouyuan
* @Date:   2019-01-18 20:45:16
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-18 20:48:29
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import {
  renderApiError,
} from '../utils'

export const checkAuthSession = (req, res, next) => {
  if (req.session.userLogined && req.session.userInfo.id) {
    next()
  } else {
    res.send(renderApiError(req, res, 401, '用户未登陆，授权失败'))
  }
}
