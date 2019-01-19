/*
 * @Author: beyondouyuan
 * @Date:   2018-08-21 09:54:09
 * @LinksSchema 友情链接
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-05 12:48:26
 */

import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'

const Schema = mongoose.Schema

const LinksSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  name: String, // 链接名称
  // 描述
  desc: {
    type: String,
    default: ''
  },
  cover: String, // 图片 / 图标
  link: String, // 链接
  create_time: {
    type: Date,
    default: Date.now
  },
  // 是否激活
  enable: {
    type: Boolean,
    default: true
  },
  // 点击量
  clicks: {
    type: Number,
    default: 0
  }
})

LinksSchema.path('create_time').get(function(v) {
  return moment(v).utc().utcOffset(-8).format("YYYY-MM-DD")
})

export default mongoose.model('Links', LinksSchema)
