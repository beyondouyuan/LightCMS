/*
* @Author: beyondouyuan
* @Date:   2018-10-05 22:41:53
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-11 23:44:10
*/

import request from '~/plugins/axios'
import APIConfig from '~/config/api'

export const requestCateList = params => {
  return request({
      url: `${APIConfig.category}`,
      method: 'GET',
      params
    })
    .then(res => res.data)
}


export const requestSingleCate = id => {
  return request({
      url: `${APIConfig.category}/${id}`,
      method: 'GET'
    })
    .then(res => res.data)
}


export const updateSingleCate = data => {
  return request({
      url: `${APIConfig.category}/${data._id}`,
      method: 'PUT',
      data
    })
    .then(res => res.data)
}


export const deleteSingleCate = id => {
  return request({
      url: `${APIConfig.category}/${id}`,
      method: 'DELETE'
    })
    .then(res => res.data)
}

export const createSingleCate = data => {
  return request({
      url: `${APIConfig.category}`,
      method: 'POST',
      data
    })
    .then(res => res.data)
}
