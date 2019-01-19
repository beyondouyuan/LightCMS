/*
* @Author: beyondouyuan
* @Date:   2018-09-17 14:35:19
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-12 13:18:32
*/
import axios from 'axios'

// 解决服务端发送请求无法获得cookie的问题
export default function (ctx) {
  if (ctx.isServer) {
    axios.defaults.headers.common = {}
    Object.keys(ctx.req.headers).map((key) => {
      axios.defaults.headers.common[key] = ctx.req.headers[key]
    })
  }
}
