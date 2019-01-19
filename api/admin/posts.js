/*
* @Author: beyondouyuan
* @Date:   2018-12-01 15:33:03
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-12 19:02:37
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/


import request from '~/plugins/axios'
import APIConfig from '~/config/api'

export const createSingleArticle = data => {
  return request({
      url: `${APIConfig.posts}`,
      method: 'POST',
      data
    })
    .then(res => res.data)
}

export const requestArticleList = params => {
  return request({
      url: `${APIConfig.posts}`,
      method: 'GET',
      params
    })
    .then(res => res.data)
}

export const requestSingleArticle = params => {
  return request({
      url: `${APIConfig.posts}/${params.id}`,
      method: 'GET',
      params
    })
    .then(res => res.data)
}

export const updateSingleArticle = data => {
  return request({
      url: `${APIConfig.posts}/${data._id}`,
      method: 'PUT',
      data
    })
    .then(res => res.data)
}

export const deleteSingleArticle = id => {
  return request({
      url: `${APIConfig.posts}/${id}`,
      method: 'DELETE'
    })
    .then(res => res.data)
}
