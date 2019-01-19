/*
* @Author: beyondouyuan
* @Date:   2018-08-21 09:50:33
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-05 14:06:47
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
   * [createSingleNotify description]
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
  async createSingleNotify(req, res, next) {
    // const fields = req.body
    // const {
    //     name,
    //     alias,
    //     cover,
    //     enable
    // } = fields
    // 解构嵌套对象
    const {
      body: {
        name,
        alias,
        cover,
        enable
      }
    } = req
    const notifyObj = {
      name,
      alias,
      cover,
      enable: enable ? true : false
    }

    const tag = new TagSchema()

    try {
      const tagObj = await tag.save()
      return res.send(renderApiData(req, res, 200, '标签创建成功', { id: tagObj._id }))
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
      const sortObj = { data: -1 }
      if (isHot) {
        sortObj = {clicks: -1}
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
    } catch(err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
		const cateObj = {
			user: 'irvig'
		}
		return res.send(renderApiData(req, res, 200, '分类列表获取成功', cateObj))
	},
  /**
   * [deleteSingleNotify description]
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
  async deleteSingleNotify(req, res, next) {
    try {
      const {id} = req.params
      await TagSchema.remove({_id: id})
      return res.send(renderApiData(req, res, 200, '删除标签成功', {}))
    } catch(err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
  }
}






















































