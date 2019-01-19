/*
* @Author: beyondouyuan
* @Date:   2019-01-11 22:10:13
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-11 23:44:16
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import request from '~/plugins/axios'
import APIConfig from '~/config/api'

export const requestLinkList = params => {
  return request({
      url: `${APIConfig.link}`,
      method: 'GET',
      params
    })
    .then(res => res.data)
}

export const deleteSingleLink = id => {
  return request({
      url: `${APIConfig.link}/${id}`,
      method: 'DELETE'
    })
    .then(res => res.data)
}

export const requestSingleLink = id => {
  return request({
      url: `${APIConfig.link}/${id}`,
      method: 'GET'
    })
    .then(res => res.data)
}


export const createSingleLink = data => {
  return request({
      url: `${APIConfig.link}`,
      method: 'POST',
      data
    })
    .then(res => res.data)
}
export const updateSingleLink = data => {
  return request({
      url: `${APIConfig.link}/${data._id}`,
      method: 'PUT',
      data
    })
    .then(res => res.data)
}
