/*
 * @Author: beyondouyuan
 * @Date:   2019-01-05 21:59:28
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-11 23:47:06
 * @E-mail: beyondouyuan@gmail.com
 * @Github: https://beyondouyuan.github.io/
 * @description: 写代码就像写诗一样
 * @version: 1.0.0
 */

import request from '~/plugins/axios'
import APIConfig from '~/config/api'

export const requestTagList = params => {
  return request({
      url: `${APIConfig.tag}`,
      method: 'GET',
      params
    })
    .then(res => res.data)
}

export const deleteSingleTag = id => {
  return request({
      url: `${APIConfig.tag}/${id}`,
      method: 'DELETE'
    })
    .then(res => res.data)
}

export const requestSingleTag = id => {
  return request({
      url: `${APIConfig.tag}/${id}`,
      method: 'GET'
    })
    .then(res => res.data)
}


export const createSingleTag = data => {
  return request({
      url: `${APIConfig.tag}`,
      method: 'POST',
      data
    })
    .then(res => res.data)
}
export const updateSingleTag = data => {
  return request({
      url: `${APIConfig.tag}/${data._id}`,
      method: 'PUT',
      data
    })
    .then(res => res.data)
}
