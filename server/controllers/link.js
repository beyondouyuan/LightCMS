/*
 * @Author: beyondouyuan
 * @Date:   2018-08-21 09:50:23
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-12 01:10:28
 */

import {
  log,
  renderApiData,
  renderApiError,
  checkCurrentID
} from '../utils'

import LinksSchema from '../models/Link'

export default {
  /**
   * [createSingleLink description]
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
  async createSingleLink(req, res, next) {
    const fields = req.body
    const {
      name,
      desc,
      cover,
      link,
      enable
    } = fields
    const obj = {
      name,
      desc,
      cover,
      link,
      enable: enable ? true : false
    }

    const newLink = new LinksSchema(obj)

    try {
      const linkObj = await newLink.save()

      return res.send(renderApiData(req, res, 200, '友链创建成功', {
        id: linkObj._id
      }))
    } catch (err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }

  },
  /**
   * [getList 获取友链列表]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  async getList(req, res, next) {
    try {
      log(req.query)

      const fields = req.query
      const queryObj = {}
      const page = Number(fields.page) || 1,
        pageSize = Number(fields.pageSize) || 10;
      const sortObj = {
        data: -1
      }

      const linkList = await LinksSchema.find(queryObj).sort(sortObj).skip((page - 1) * pageSize).limit(pageSize).exec()
      const total = await LinksSchema.countDocuments(queryObj)

      log(linkList, total)

      const linkObj = {
        list: linkList,
        page: page,
        lastPage: Math.ceil(total / pageSize),
        pageSize: pageSize,
        total: total
      }

      return res.send(renderApiData(req, res, 200, '友链列表获取成功', linkObj))
    } catch (err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [getSingleLink 获取单条友链]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  async getSingleLink(req, res, next) {
    try {
      const linkId = req.params.id
      const queryObj = {
        _id: linkId
      }
      const link = await LinksSchema.findOne(queryObj).exec()

      return res.send(renderApiData(req, res, 200, '友链获取成功', link || {}))
    } catch (err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [deleteSingleLink 删除单条友链]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  async deleteSingleLink(req, res, next) {
    try {
      const {
        id
      } = req.params
      await LinksSchema.remove({
        _id: id
      })

      return res.send(renderApiData(req, res, 200, '友链删除成功', {}))
    } catch (err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [updateSingleLink 更新单条友链]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  async updateSingleLink(req, res, next) {
    const fields = req.body
    const {
      name,
      desc,
      cover,
      link,
      enable
    } = fields
    const obj = {
      name: name,
      desc: desc,
      cover: cover,
      link: link,
      enable: enable ? true : false
    }

    log(obj)
    try {
      const linkId = fields._id
      await LinksSchema.findOneAndUpdate({ _id: linkId }, { $set: obj })

      return res.send(renderApiData(req, res, 200, '友链更新成功', { id: linkId }))
    } catch (err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
  }
}

































