/*
* @Author: beyondouyuan
* @Date:   2019-01-15 00:16:02
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-15 00:19:38
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import request from '~/plugins/axios'
import APIConfig from '~/config/api'

export const requestTagsList = params => {
  return request({
      url: `${APIConfig.webTag}`,
      method: 'GET',
      params
    })
    .then(res => res.data)
}
