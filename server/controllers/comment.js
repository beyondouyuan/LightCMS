/*
* @Author: beyondouyuan
* @Date:   2018-08-21 09:50:55
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-18 01:03:59
*/

import {
  log,
  renderApiData,
  renderApiError,
  getClientIP
} from '../utils'

import UserSchema from '../models/User'
import PostSchema from '../models/Posts'
import CommentSchema from '../models/Comment'

export default {
  /**
   * [createComment 发表评论]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  async createComment(req, res, next) {
    const fields = req.body
    const {
      post,
      content,
      owner,
      replyer
    } = fields
    const obj = {
      post,
      content,
      owner,
      replyer,
      create_ip: getClientIP(req)
    }


    const newComent = new CommentSchema(obj)

    try {
      const comment = await newComent.save()

      // 更新文章评论+1
      await PostSchema.findOneAndUpdate({ _id: post }, { '$inc': { commentsNum: 1 } })
      // 增加用户积分+5
      await UserSchema.findOneAndUpdate({ _id: owner }, {'$inc': { coin: 5 }})

      return res.send(renderApiData(req, res, 200, '评论成功', { id: comment._id }))
    } catch(err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [getList 获取评论列表]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  async getList(req, res, next) {
    try {
      const { session, query: fields } = req
      const queryObj = {}
      let page = Number(fields.page) || 1,
          pageSize = Number(fields.pageSize) || 10;
      const postId = fields.postId
      const ownerId = fields.ownerId
      const searchKey = fields.searchKey
      const isHot = fields.isHot
      if (!session.userInfo || session.userInfo.role === 'member') {
        queryObj.enable = true
      }
      if (postId) {
        queryObj['post'] = postId
      }
      if (ownerId) {
        queryObj['owner'] = ownerId
      }
      if (searchKey) {
        const key = new RegExp(searchKey, 'i')
        queryObj['content'] = key
      }

      // 按数整体据倒序
      let sortObj = {
        data: -1
      }

      if (isHot) {
        // 按喜欢数条件倒序
        sortObj = {
          likes_num: -1
        }
      }

      log(queryObj)

      const commentList = await CommentSchema.find(queryObj).sort(sortObj).skip((page - 1) * pageSize).limit(pageSize).populate([{
        path: 'post',
        select: '_id title'
      }, {
        path: 'owner',
        select: '_id nickname enable avatar'
      }, {
        path: 'replyer',
        select: '_id nickname enable avatar'
      }]).exec()

      const total = await CommentSchema.countDocuments(queryObj)

      const commentObj = {
        list: commentList,
        page: page,
        lastPage: Math.ceil(total / pageSize),
        pageSize: pageSize,
        total: total
      }

      return res.send(renderApiData(req, res, 200, '评论列表获取成功', commentObj))
    } catch(err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [updateSingleComment 更新单个评论]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
	async updateSingleComment(req, res, next) {
    const fields = req.body
    const { session } = req

    const obj = {
      enable: fields.enable === true ? true : false
    }
    let successMsg = obj.enable ? '已开启' : '已禁用'

    try {
      const commentId = fields.id
      await CommentSchema.findOneAndUpdate({ _id: commentId }, { $set: obj })

      return res.send(renderApiData(req, res, 200, successMsg, { id: commentId }))
    } catch(err) {
      return res.send(renderApiError(req, res, 500, err))
    }
	},
  /**
   * [deleteSingleComment 删除单个评论]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  async deleteSingleComment(req, res, next) {
    try {
      const { id } = req.params

      log(id)

      await CommentSchema.remove({ _id: id })

      return res.send(renderApiData(req, res, 200, '评论删除成功', {}))
    } catch(err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  }
}
























