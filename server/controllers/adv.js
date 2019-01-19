/*
* @Author: beyondouyuan
* @Date:   2018-08-21 09:50:17
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-05 14:06:14
*/
import fs from 'fs'
import {
  log,
	renderApiData,
  renderApiError,
  checkCurrentID
} from '../utils'

import Advertisement from '../models/Adv'

export default {
  /**
   * [createAdv 创建广告]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  async createSingleAdv(req, res, next) {
    const fields = req.body
    const {
      title,
      desc,
      cover,
      link,
      enable
    } = fields
    const obj = {
      title,
      desc,
      cover,
      link,
      enable: enable ? true : false
    }

    // 格式化数据模型
    const newAdv = new Advertisement(obj)

    try {
      // 保存数据
      const advObj = await newAdv.save()
      return res.send(renderApiData(req, res, 200, '广告创建成功', { id: advObj._id }))
    } catch(err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [getList 获取广告列表]
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
      const page =  Number(fields.page) || 1,
            pageSize = Number(fields.pageSize) || 10;
      const sortObj = { data: -1 }
      const advList = await Advertisement.find(queryObj).sort(sortObj).skip((page - 1) * pageSize).limit(pageSize).exec()
      const total = await Advertisement.countDocuments(queryObj)

      log(advList, total)

      const advObj = {
        list: advList,
        page: page,
        lastPage: Math.ceil(total / pageSize),
        pageSize: pageSize,
        total: total
      }
      return res.send(renderApiData(req, res, 200, '广告列表换取成功', advObj))
    } catch(err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
	},
  /**
   * [getSingleAdv 获取单条广告]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  async getSingleAdv(req, res, next) {
    try {
      const advId = req.params.id
      const queryObj = {
        _id: advId
      }
      const adv = await Advertisement.findOne(queryObj).exec()

      return res.send(renderApiData(req, res, 200, '获取广告成功', adv || {}))
    } catch(err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [deleteSingleAdv 删除单条广告]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  async deleteSingleAdv(req, res, next) {
    try {
      const id = req.params.id

      // 数据库移除该广告
      await Advertisement.remove({_id: id})
      return res.send(renderApiData(req, res, 200, '删除广告成功', {}))
    } catch(err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [updateSingleAdv 更新单条广告]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  async updateSingleAdv(req, res, next) {
    const fields = req.body

    // 校验
    // try {
    // } catch(e) {
    //   console.log(e);
    // }
    const {
      title,
      desc,
      cover,
      link,
      enable
    } = fields
    const obj = {
      title: title,
      desc: desc,
      cover: cover,
      link: link,
      enable: enable ? true : false
    }

    log(obj)

    try {
      const advId = fields._id

      const oldAdv = await Advertisement.findOne({_id: advId})
      // 若新上传的图片路径与此前的图片路径不一致，则删除之前的图片并更新

      if (oldAdv.cover !== obj.cover) {
        if (oldAdv.cover.indexOf('/upload/images/') >= 0) {
          // 文件上传到服务器
          const path = process.cwd() + '/static' + oldAdv.cover
          log('images path ===>>> ', path)
          if (fs.existsSync(path)) {
            // 若存在，则删除再保存
            fs.unlinkSync(path)
          }
        }
      }

      await Advertisement.findOneAndUpdate({ _id: advId }, { $set: obj })

      return res.send(renderApiData(req, res, 200, '广告更新成功', { id: advId }))
    } catch(err) {
      return res.sendStatus(500).send(renderApiError(req, res, 500, err))
    }
  }
}





