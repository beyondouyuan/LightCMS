/*
 * @Author: beyondouyuan
 * @Date:   2018-08-21 09:55:05
 * @CommentSchema 评论
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-18 00:09:19
 */

import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'

import Post from './Posts'
import User from './User'

moment.locale('zh-cn')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  _id: { // 评论ID
    type: String,
    default: shortid.generate
  },
  // 评论目标文章
  post: {
    type: String,
    ref: 'Post'
  },
  // 评论用户ID
  owner: {
    type: String,
    ref: 'User'
  },
  // 被回复用户ID
  replyer: {
    type: String,
    ref: 'User'
  },
  // 评论内容
  content: {
    type: String,
    default: ''
  },
  // 该评论被点赞数
  likes_num: {
    type: Number,
    default: 0
  },
  // 喜欢该评论的用户列表
  like_users: [{
    type: String,
    default: []
  }],
  //创建时间
  create_time: {
    type: Date,
    default: Date.now
  },
  // 是否显示
  enable: {
    type: Boolean,
    default: true
  },
  create_ip: String // 表表评论的IP
})

CommentSchema.set('toJSON', {
  getters: true,
  virtual: true
})
CommentSchema.set('toObject', {
  getters: true,
  virtual: true
})


CommentSchema.path('create_time').get(function(v) {
  return moment(v).utc().utcOffset(-8).format("YYYY-MM-DD")
})

export default mongoose.model('Comment', CommentSchema)
