/*
* @Author: beyondouyuan
* @Date:   2019-01-14 20:52:00
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-17 23:14:25
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import request from '~/plugins/axios'
import APIConfig from '~/config/api'

export const createSingleArticle = data => {
  return request({
      url: `${APIConfig.webPosts}`,
      method: 'POST',
      data
    })
    .then(res => res.data)
}

export const requestArticleList = async (params) => {
  return request({
      url: `${APIConfig.webPosts}`,
      method: 'GET',
      params
    })
    .then(res => res.data)
}

export const requestArticleDetail = async (params) => {
  return request({
      url: `${APIConfig.webPosts}/${params.id}`,
      method: 'GET',
      params
    })
    .then(res => res.data)
}

export const requestArticleLike = async (data) => {
  return request({
      url: `${APIConfig.webPosts}/like`,
      method: 'POST',
      data
    })
    .then(res => res.data)
}


export const requestArticleCollect = async (data) => {
  return request({
      url: `${APIConfig.webPosts}/collect`,
      method: 'POST',
      data
    })
    .then(res => res.data)
}

