/*
 * @Author: beyondouyuan
 * @Date:   2018-08-21 09:54:56
 * @CategorySchema 分类
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-12-30 19:20:53
 */

import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  // 数据库中存储ID
  _id: {
    type: String,
    default: shortid.generate
  },
  // 分类类别 1: 文章分类 2. 专题分类 3. 快讯分类
  type: {
    type: Number,
    default: 1
  },
  // 排序 正整数
  sort_id: {
    type: Number,
    default: 1
  },
  // 父级分类 默认为0：顶级分类
  parent_id: {
    type: String,
    default: '0'
  },
  name: String, // 分类名称
  description: String, // 分类描述
  // seo link
  default_url: {
    type: String,
    default: ''
  },
  // 存储所有父节点结构路径 ","分割
  sort_path: {
    type: String,
    default: '0'
  },
  // 是否激活
  enable: {
    type: Boolean,
    default: true
  },
  create_time: {
    type: Date,
    default: Date.now
  }
})

CategorySchema.path('create_time').get(function(v) {
  return moment(v).utc().utcOffset(-8).format("YYYY-MM-DD")
})

export default mongoose.model('Category', CategorySchema)
