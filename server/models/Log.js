/*
 * @Author: beyondouyuan
 * @Date:   2018-08-21 09:54:31
 * @LogSchema 日志
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-05 12:48:31
 */

import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'

const Schema = mongoose.Schema

const LogSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  logs: {
    type: String
  },
  type: { // 日志类型
    type: String
  },
  create_time: {
    type: Date,
    default: Date.now
  }
})

LogSchema.set('toJSON', {
  getters: true,
  virtual: true
})
LogSchema.set('toObject', {
  getters: true,
  virtual: true
})


LogSchema.path('create_time').get(function(v) {
  return moment(v).utc().utcOffset(-8).format("YYYY-MM-DD HH:mm:ss")
})

export default mongoose.model('Log', LogSchema)
