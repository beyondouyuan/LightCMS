/*
* @Author: beyondouyuan
* @Date:   2019-01-12 21:47:40
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-12 21:48:35
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import request from '~/plugins/axios'
import APIConfig from '~/config/api'


export const requestLinkList = async (params) => {
  return request({
      url: `${APIConfig.webLink}`,
      method: 'GET',
      params
    })
    .then(res => res.data)
}
