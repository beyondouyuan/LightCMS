/*
 * @Author: beyondouyuan
 * @Date:   2018-08-21 09:50:48
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-05 01:33:11
 */

import {
  log,
  renderApiData,
  renderApiError
} from '../utils'

import CategorySchema from '../models/Category'

export default {
  /**
   * [createSingleCate 创建分类]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  async createSingleCate(req, res, next) {
    const fields = req.body
    const {
      type,
      sort_id,
      parent_id,
      name,
      description,
      default_url,
      enable
    } = fields
    const obj = {
      type,
      sort_id,
      parent_id,
      name,
      description,
      default_url,
      enable: enable ? true : false
    }
    const newCategory = new CategorySchema(obj)

    try {
      const cateObj = await newCategory.save()
      const queryObj = {}
      if (fields.parent_id === '0') {
        queryObj.sort_path = `0,${cateObj._id}`
      } else {
        const parentObj = await CategorySchema.findOne({
          _id: parent_id
        }, 'sort_path default_url')

        log('parentObj ', parentObj)

        queryObj.sort_path = `${parentObj.sort_path},${cateObj._id}`
        queryObj.default_url = `${parentObj.default_url}-${default_url}`
      }
      await CategorySchema.findOneAndUpdate({
        _id: cateObj._id
      }, {
        $set: queryObj
      })

      return res.send(renderApiData(req, res, 200, '分类创建成功', {
        id: cateObj._id
      }))
    } catch (err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [getList 获取分类列表]
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
      let page = Number(fields.page) || 1,
        pageSize = Number(fields.pageSize) || 10;
      const mode = fields.mode // full / simple
      const parent_id = fields.parent_id
      const type = fields.type
      const enable = fields.enable
      if (parent_id) {
        queryObj['parent_id'] = parent_id
      }
      if (enable) {
        queryObj['enable'] = true
      }
      if (type) {
        queryObj['type'] = type
      }
      if (mode === 'full') {
        page = 1,
          pageSize = 100
      }

      log(queryObj)

      const cateList = await CategorySchema.find(queryObj).sort({
        sort_id: -1
      }).skip((page - 1) * pageSize).limit(pageSize).exec()
      const total = await CategorySchema.countDocuments(queryObj)

      const cateObj = {
        list: cateList,
        page: page,
        lastPage: Math.ceil(total / pageSize),
        pageSize: pageSize,
        total: total
      }
      return res.send(renderApiData(req, res, 200, '分类列表获取成功', cateObj))
    } catch (err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [deleteSingleCate 删除单个分类]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  async deleteSingleCate(req, res, next) {
    try {
      const {
        id
      } = req.params

      log(id)

      await CategorySchema.remove({
        _id: id
      })

      return res.send(renderApiData(req, res, 200, '分类删除成功', {}))
    } catch (err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [updateSingleCate 更新单个分类]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  async updateSingleCate(req, res, next) {
    const fields = req.body
    const {
      type,
      sort_id,
      parent_id,
      name,
      description,
      default_url,
      enable
    } = fields
    const obj = {
      type,
      sort_id,
      parent_id,
      name,
      description,
      default_url,
      enable: enable ? true : false
    }

    log(obj)
    try {
      const cateId = fields._id
      await CategorySchema.findOneAndUpdate({
        _id: cateId
      }, {
        $set: obj
      })
      return res.send(renderApiData(req, res, 200, '分类更新成功', {
        id: cateId
      }))
    } catch (err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }

  },
  /**
   * [getSingleCate 获取单个分类]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  async getSingleCate(req, res, next) {
    try {
      const {
        id
      } = req.params
      const queryObj = {
        _id: id
      }
      const cateObj = await CategorySchema.findOne(queryObj).exec()

      return res.send(renderApiData(req, res, 200, '分类获取成功', cateObj))
    } catch (err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
  }
}
