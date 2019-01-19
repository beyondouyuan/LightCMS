/*
* @Author: beyondouyuan
* @Date:   2019-01-17 23:13:21
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-17 23:14:03
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import request from '~/plugins/axios'
import APIConfig from '~/config/api'

export const requestCommentList = async (params) => {
  return request({
      url: `${APIConfig.webComments}`,
      method: 'GET',
      params
    })
    .then(res => res.data)
}
export const requestComment = async (data) => {
  return request({
      url: `${APIConfig.webComments}`,
      method: 'POST',
      data
    })
    .then(res => res.data)
}
