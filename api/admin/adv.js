/*
* @Author: beyondouyuan
* @Date:   2019-01-05 12:57:19
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-12 21:00:57
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import request from '~/plugins/axios'
import APIConfig from '~/config/api'

export const requestAdvList = params => {
  return request({
      url: `${APIConfig.adv}`,
      method: 'GET',
      params
    })
    .then(res => res.data)
}

export const requestSingleAdv = id => {
  return request({
      url: `${APIConfig.adv}/${id}`,
      method: 'GET'
    })
    .then(res => res.data)
}

export const updateSingleAdv = data => {
  return request({
      url: `${APIConfig.adv}/${data._id}`,
      method: 'PUT',
      data
    })
    .then(res => res.data)
}

export const deleteSingleAdv = id => {
  return request({
      url: `${APIConfig.adv}/${id}`,
      method: 'DELETE'
    })
    .then(res => res.data)
}

export const createSingleAdv = data => {
  return request({
      url: `${APIConfig.adv}`,
      method: 'POST',
      data
    })
    .then(res => res.data)
}
