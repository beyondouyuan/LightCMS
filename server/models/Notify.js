/*
 * @Author: beyondouyuan
 * @Date:   2018-08-21 09:54:16
 * @NotifySchema 通知
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-05 12:48:40
 */

import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'

import Post from './Posts'
import User from './User'

const Schema = mongoose.Schema

const NotifySchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title: String, // 标题
  content: String, // 通知内容
  // 通知类型 notice 公告 | remind 提醒 | message 信息
  type: {
    type: String,
    enum: ['notice', 'remind', 'message']
  },
  target: { // 通知指向
    type: String,
    ref: 'Post'
  },
  sender: { // 发送者
    type: String,
    ref: 'User'
  },
  systemSender: { // 发送系统
    type: String
  },
  create_time: {
    type: Date,
    default: Date.now
  }
})
NotifySchema.set('toJSON', {
  getters: true,
  virtuals: true
})
NotifySchema.set('toObject', {
  getters: true,
  virtuals: true
})

NotifySchema.path('create_time').get(function(v) {
  return moment(v).utc().utcOffset(-8).format("YYYY-MM-DD HH:mm:ss")
})

export default mongoose.model('Notify', NotifySchema)
