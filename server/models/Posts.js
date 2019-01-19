/*
 * @Author: beyondouyuan
 * @Date:   2018-08-21 09:54:46
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-05 12:48:47
 */

import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'

import Category from './Category'
import User from './User'
import Tag from './Tag'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title: String, // 标题
  sub_title: String, // 副标题
  description: String, // 简述
  cover: String, // 文章图片
  content: String, // 文章内容
  content_type: { // 内容格式 M：markdown T： text
    type: String,
    default: 'M'
  },
  author: {
    type: String,
    ref: 'User'
  },
  categories: [{
    type: String,
    ref: 'Category'
  }],
  auth: { // 权限 public: 公开 secret： 私有
    type: String,
    default: 'public'
  },
  state: { // 状态 published： 已发布 draft： 草稿
    type: String,
    default: 'published'
  },
  isTop: { // 是否置顶
    type: Boolean,
    default: false
  },
  source: { // 文章来源 0 原创 1 转载
    type: Number,
    default: 0
  },
  tags: [ // 文章标签
    {
      type: String,
      ref: 'Tag'
    }
  ],
  // 评论数
  commentsNum: {
    type: Number,
    default: 0
  },
  // 喜欢数
  likesNum: {
    type: Number,
    default: 0
  },
  // 浏览次数
  clicksNum: {
    type: Number,
    default: 0
  },
  // 收藏次数
  collectionsNum: {
    type: Number,
    default: 0
  },
  // 喜欢该文章的用户列表
  like_users: [{
    type: String,
    default: []
  }],
  // 收藏该文章的用户列表
  collect_users: [{
    type: String,
    default: []
  }],
  create_time: {
    type: Date,
    default: Date.now
  },
  update_time: {
    type: Date,
    default: Date.now
  }
})


PostSchema.set('toJSON', {
  getters: true,
  virtuals: true
})
PostSchema.set('toObject', {
  getters: true,
  virtuals: true
})

PostSchema.path('create_time').get(function(v) {
  return moment(v).utc().utcOffset(-8).format("YYYY-MM-DD")
})

PostSchema.path('update_time').get(function(v) {
  return moment(v).utc().utcOffset(-8).format("YYYY-MM-DD")
})

export default mongoose.model('Post', PostSchema)
