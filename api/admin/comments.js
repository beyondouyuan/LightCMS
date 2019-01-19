/*
* @Author: beyondouyuan
* @Date:   2019-01-18 00:14:02
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-18 00:32:59
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import request from '~/plugins/axios'
import APIConfig from '~/config/api'

export const requestCommentList = params => {
  return request({
      url: `${APIConfig.comment}`,
      method: 'GET',
      params
    })
    .then(res => res.data)
}

export const updateSingleComment = data => {
  return request({
      url: `${APIConfig.comment}/${data.id}`,
      method: 'PUT',
      data
    })
    .then(res => res.data)
}

export const deleteSingleComment = id => {
  return request({
      url: `${APIConfig.comment}/${id}`,
      method: 'DELETE'
    })
    .then(res => res.data)
}

