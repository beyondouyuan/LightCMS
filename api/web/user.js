/*
* @Author: beyondouyuan
* @Date:   2019-01-15 00:16:09
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-17 22:33:22
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import request from '~/plugins/axios'
import APIConfig from '~/config/api'

export const requestMembersList = params => {
  return request({
      url: `${APIConfig.webMember}`,
      method: 'GET',
      params
    })
    .then(res => res.data)
}

export const requestMembersLogin = data => {
  return request({
      url: `${APIConfig.webLogin}`,
      method: 'POST',
      data
    })
    .then(res => res.data)
}

export const requestMembersRegister = data => {
  return request({
      url: `${APIConfig.webRegister}`,
      method: 'POST',
      data
    })
    .then(res => res.data)
}

export const requestMembersLogout = () => {
  return request({
      url: `${APIConfig.webLogout}`,
      method: 'POST'
    })
    .then(res => res.data)
}

export const requestMembersBaseInfo = params => {
  return request({
      url: `${APIConfig.webMember}/${params.id}`,
      method: 'GET'
    })
    .then(res => res.data)
}

export const requestUpdateMemberProfile = data => {
  return request({
      url: `${APIConfig.webMember}/profile`,
      method: 'POST',
      data
    })
    .then(res => res.data)
}

export const requestUpdateMemberAvatar = data => {
  return request({
      url: `${APIConfig.webMember}/avatar`,
      method: 'POST',
      data
    })
    .then(res => res.data)
}

export const requestUploadImage = (name, data) => {
  return request({
      url: `${APIConfig.webUploadImage}?name=${name}`,
      method: 'POST',
      headers: {
        'Content-Type':'multipart/form-data'
      },
      data: data
    })
    .then(res => res.data)
}

export const requestFollowMember = data => {
  return request({
      url: `${APIConfig.webMember}/follow`,
      method: 'POST',
      data
    })
    .then(res => res.data)
}
export const requestUnFollowMember = data => {
  return request({
      url: `${APIConfig.webMember}/unfollow`,
      method: 'POST',
      data
    })
    .then(res => res.data)
}
