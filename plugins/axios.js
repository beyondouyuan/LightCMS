/*
 * @Author: beyondouyuan
 * @Date:   2018-09-11 15:57:33
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-02-21 23:29:24
 */
import axios from 'axios'
import siteConf from '~/config/site'

/**
 * [创建axios 实例]
 * @type {[type]}
 */
// 初始化请求配置


const service = axios.create({
  baseURL: siteConf.baseAPIURL,
  timeout: 60000,
  withCredentials: true,
  // method: 'POST',
  // headers: {
  //   'Authorization': 'irving-token'
  // },
})

/**
 * [统一拦截请求]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8'
  return config
}, error => {
  console.log(error) // 打印测试
  Promise.reject(error)
})
/**
 * [统一拦截响应]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
service.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    console.log('error response ' + error) // 打印测试
    return Promise.reject(error)
  }

)

export default service
