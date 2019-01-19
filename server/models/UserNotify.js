/*
 * @Author: beyondouyuan
 * @Date:   2018-08-21 09:54:21
 * @UserNotifySchema 用户通知
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-05 12:49:10
 */

import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'

import Notify from './Notify'
import User from './User'

const Schema = mongoose.Schema

const UserNotifySchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  notify: {
    type: String,
    ref: 'Notify'
  },
  user: { // 信息所属者
    type: String,
    ref: 'User'
  },
  sender: { // 发送者
    type: String,
    ref: 'User'
  },
  is_read: {
    type: Boolean,
    default: false
  },
  create_time: {
    type: Date,
    default: Date.now
  },
})

UserNotifySchema.set('toJSON', {
  getters: true,
  virtual: true
})
UserNotifySchema.set('toObject', {
  getters: true,
  virtual: true
})


UserNotifySchema.path('create_time').get(function(v) {
  return moment(v).utc().utcOffset(-8).format("YYYY-MM-DD")
})

export default mongoose.model('UserNotify', UserNotifySchema)
