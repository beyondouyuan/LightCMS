/*
* @Author: beyondouyuan
* @Date:   2018-08-21 09:51:08
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-12 01:12:12
*/
import multer from 'multer'

import {
  log,
  renderApiData,
  renderApiError
} from '../utils'

import PostSchema from '../models/Posts'
import TagSchema from '../models/Tag'
import CateforySchema from '../models/Category'
import UserSchema from '../models/User'
import CommentSchema from '../models/Comment'

export default {
  async uploadImage(req, res, next) {
    try {
      const { name } = req.query
      log(name)

      if (name !== 'cover' && name !== 'avatar' && name !== 'advertise') {
        // 读写文件流会有异步问题存在 setHeader即sendStatus需要在send之前发送，否则报错，此处去掉sendStatus
        return res/*.sendStatus(500)*/.send(renderApiError(req, res, 500, '参数错误'))
      }
      // 根据name决定上传至哪个文件夹
      const lastDir = name
      const storage = multer.diskStorage({
        destination: `static/upload/images/${lastDir}`,
        // 只允许上传jpg|png|jpeg|gif格式的文件
        fileFilter: (req, files, callback) => {
            const type = '|' + files.mimetype.slice(files.mimetype.lastIndexOf('/') + 1) + '|'
            const fileTypeValid = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1
            return callback(null, !!fileTypeValid)
        },
        filename: (req, file, callback) => {
          const fileFormat = (file.originalname).split(".")
          return callback(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1])
        }
      })
      const upload = multer({storage: storage})

      upload.single(name)(req, res, function(err) {
        if (err) {
          return res/*.sendStatus(500)*/.send(renderApiError(req, res, 500, err))
        }
        if (req.file) {
          log(req.file)
          // 未开启七牛云，返回服务器上的图片链接
          return res.send(renderApiData(req, res, 200, '图片上传成功', `/upload/images/${lastDir}/${req.file.filename}`))
        }
      })
    } catch(err) {
      return res/*.sendStatus(500)*/.send(renderApiError(req, res, 500, err))
    }
  },
  async dataPreview(req, res, next) {
    try {
      const queryPostObj = { state: 'published' }
      const queryUserObj = { role: 'member' }
      // 文档统计
      const docsCount = await PostSchema.countDocuments(queryPostObj)
      // 用户统计
      const usersCount = await UserSchema.countDocuments(queryUserObj)
      // 留言统计
      const commentsCount = await CommentSchema.countDocuments()
      // 标签统计
      const tagsCount = await TagSchema.countDocuments()
      const result = {
        docsCount,
        usersCount,
        commentsCount,
        tagsCount
      }
      return res.send(renderApiData(req, res, 200, '总览数据获取成功', result))
    } catch (err) {
      return res.status(500).send(renderApiError(req, res, 500, err))
    }
  }
}
