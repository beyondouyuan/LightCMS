/*
* @Author: beyondouyuan
* @Date:   2019-01-05 13:51:19
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-12 01:02:45
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import request from '~/plugins/axios'
import APIConfig from '~/config/api'
import qs from 'qs'

export const requestUploadImage = (name, data) => {
  return request({
      url: `${APIConfig.uploadImage}?name=${name}`,
      method: 'POST',
      headers: {
        'Content-Type':'multipart/form-data'
      },
      data: data
    })
    .then(res => res.data)
}

export const requestDataPreview = params => {
  return request({
      url: `${APIConfig.preview}`,
      method: 'GET',
      params
    })
    .then(res => res.data)
}
