/*
 * @Author: beyondouyuan
 * @Date:   2018-08-21 09:51:00
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-15 00:36:14
 */

import shortid from 'shortid'


import {
  log,
  renderApiData,
  renderApiError
} from '../utils'

import Notifychema from '../models/Notify'
import PostSchema from '../models/Posts'
import TagSchema from '../models/Tag'

export default {
  /**
   * [createNotify description]
   * It is not time to explain! get in the car quickly!
   * @Author    beyondouyuan
   * @DateTime  2018-11-25
   * @copyright [copyright]
   * @license   [license]
   * @version   [version]
   * @param     {[type]}     req  [description]
   * @param     {[type]}     res  [description]
   * @param     {Function}   next [description]
   * @return    {[type]}          [description]
   */
  async createSingleTag(req, res, next) {
    // 解构嵌套对象
    const {
      body: {
        name,
        alias,
        cover,
        enable
      }
    } = req
    const obj = {
      name,
      alias,
      cover,
      enable: enable ? true : false
    }

    const tag = new TagSchema(obj)

    try {
      const tagObj = await tag.save()
      return res.send(renderApiData(req, res, 200, '标签创建成功', {
        id: tagObj._id
      }))
    } catch (err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [getSingleTag description]
   * It is not time to explain! get in the car quickly!
   * @Author    beyondouyuan
   * @DateTime  2019-01-05
   * @copyright [copyright]
   * @license   [license]
   * @version   [version]
   * @param     {[type]}     req  [description]
   * @param     {[type]}     res  [description]
   * @param     {Function}   next [description]
   * @return    {[type]}          [description]
   */
  async getSingleTag(req, res, next) {
    try {
      const tagId = req.params.id
      const queryObj = {
        _id: tagId
      }
      const tag = await TagSchema.findOne(queryObj).exec()

      return res.send(renderApiData(req, res, 200, '获取广告成功', tag || {}))
    } catch(err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [getList description]
   * It is not time to explain! get in the car quickly!
   * @Author    beyondouyuan
   * @DateTime  2018-11-25
   * @copyright [copyright]
   * @license   [license]
   * @version   [version]
   * @param     {[type]}     req  [description]
   * @param     {[type]}     res  [description]
   * @param     {Function}   next [description]
   * @return    {[type]}          [description]
   */
  async getList(req, res, next) {
    try {
      log(req.query)

      const fields = req.query
      const queryObj = {}
      const page = Number(fields.page) || 1
      const pageSize = Number(fields.pageSize) || 10
      const isHot = fields.isHot

      // 排序
      let sortObj = {
        data: -1
      }
      if (isHot) {
        sortObj = {
          clicks: -1
        }
      }

      const tagList = await TagSchema.find(queryObj).sort(sortObj).skip((page - 1) * pageSize).limit(pageSize).exec()
      const total = await TagSchema.countDocuments(queryObj)

      log(tagList, total)

      const tagObj = {
        list: tagList,
        page,
        pageSize,
        total,
        lastPage: Math.ceil(total / pageSize)
      }

      return res.send(renderApiData(req, res, 200, '标签列表获取成功', tagObj))
    } catch (err) {
      return res/*.sendStatus(500)*/.send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [deleteNotify description]
   * It is not time to explain! get in the car quickly!
   * @Author    beyondouyuan
   * @DateTime  2018-11-25
   * @copyright [copyright]
   * @license   [license]
   * @version   [version]
   * @param     {[type]}     req  [description]
   * @param     {[type]}     res  [description]
   * @param     {Function}   next [description]
   * @return    {[type]}          [description]
   */
  async deleteSingleTag(req, res, next) {
    try {
      const {
        id
      } = req.params
      await TagSchema.remove({
        _id: id
      })
      return res.send(renderApiData(req, res, 200, '删除标签成功', {}))
    } catch (err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [updateSingleTag description]
   * It is not time to explain! get in the car quickly!
   * @Author    beyondouyuan
   * @DateTime  2019-01-05
   * @copyright [copyright]
   * @license   [license]
   * @version   [version]
   * @param     {[type]}     req  [description]
   * @param     {[type]}     res  [description]
   * @param     {Function}   next [description]
   * @return    {[type]}          [description]
   */
  async updateSingleTag(req, res, next) {
    const {
      body: {
        _id,
        name,
        alias,
        cover,
        enable
      }
    } = req
    const obj = {
      name,
      alias,
      cover,
      enable: enable ? true : false
    }
    log(obj)
    try {
      const tagId = _id
      await TagSchema.findOneAndUpdate({
        _id: tagId
      }, {
        $set: obj
      })
      return res.send(renderApiData(req, res, 200, '标签更新成功', {
        id: tagId
      }))
    } catch (err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }

  }
}
