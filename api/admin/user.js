/*
* @Author: beyondouyuan
* @Date:   2019-01-11 23:40:23
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-12 16:02:22
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import request from '~/plugins/axios'
import APIConfig from '~/config/api'

export const requestUserList = params => {
  return request({
      url: `${APIConfig.user}`,
      method: 'GET',
      params
    })
    .then(res => res.data)
}

export const createSingleUser = data => {
  return request({
      url: `${APIConfig.user}`,
      method: 'POST',
      data
    })
    .then(res => res.data)
}

export const deleteSingleUser = id => {
  return request({
      url: `${APIConfig.user}/${id}`,
      method: 'DELETE'
    })
    .then(res => res.data)
}

export const requestSingleUser = id => {
  return request({
      url: `${APIConfig.user}/${id}`,
      method: 'GET'
    })
    .then(res => res.data)
}


export const updateSingleUser = data => {
  return request({
      url: `${APIConfig.user}/${data._id}`,
      method: 'PUT',
      data
    })
    .then(res => res.data)
}

export const requestUserLogin = data => {
  return request({
      url: `${APIConfig.userLogin}`,
      method: 'POST',
      data
    })
    .then(res => res.data)
}
export const requestUserLogout = () => {
  return request({
      url: `${APIConfig.userLogout}`,
      method: 'POST'
    })
    .then(res => res.data)
}
