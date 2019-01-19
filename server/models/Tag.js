/*
 * @Author: beyondouyuan
 * @Date:   2018-08-21 09:54:37
 * @TagSchema 文章标签
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-05 12:48:54
 */

import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'

const Schema = mongoose.Schema

const TagSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  name: String, // 标签名
  alias: String, // 标签别名
  cover: String, // 标签图片
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

TagSchema.path('create_time').get(function(v) {
  return moment(v).utc().utcOffset(-8).format("YYYY-MM-DD")
})

export default mongoose.model('Tag', TagSchema)
