/*
 * @Author: beyondouyuan
 * @Date:   2018-08-21 09:54:02
 * @AdvertisementSchema 广告
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-05 12:48:09
 */

import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'

const Schema = mongoose.Schema

const AdvertisementSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title: String, // 标题
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
  }
})

AdvertisementSchema.path('create_time').get(function(v) {
  return moment(v).utc().utcOffset(-8).format("YYYY-MM-DD")
})

export default mongoose.model('Advertisement', AdvertisementSchema)
