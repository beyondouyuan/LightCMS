/*
 * @Author: beyondouyuan
 * @Date:   2018-08-21 09:50:37
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-17 21:40:43
 */
import fs from 'fs'
import xss from 'xss'
import shortid from 'shortid'
import Marked from 'Marked'

import {
  log,
  renderApiData,
  renderApiError
} from '../utils'

import PostSchema from '../models/Posts'
import TagSchema from '../models/Tag'
import CateforySchema from '../models/Category'
import UserSchema from '../models/User'

// dom配置
const highlight = require('highlight.js')
const createDompurify = require('dompurify')
const {
  JSDOM
} = require('jsdom')
const window = (new JSDOM('')).window

const DOMPurify = createDompurify(window)

// Markdown配置

const renderer = new Marked.Renderer()
renderer.codespan = (code, lang) => {
  log('codespan', code)

  return `<code class="codespan">${code.replace(/amp;/g, '')}</code>`
}

Marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: false,
  smartypants: false,
  highlight: function(code) {
    const codespan = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    return highlight.highlightAuto(codespan).value
  }
})

// XSS配置

const options = {
  whiteList: {
    a: ['id', 'class', 'target', 'href', 'title'],
    abbr: ['id', 'class', 'title'],
    address: ['id', 'class'],
    area: ['id', 'class', 'shape', 'coords', 'href', 'alt'],
    article: ['id', 'class'],
    aside: ['id', 'class'],
    audio: ['id', 'class', 'autoplay', 'controls', 'loop', 'preload', 'src'],
    b: ['id', 'class'],
    bdi: ['id', 'class', 'dir'],
    bdo: ['id', 'class', 'dir'],
    big: ['id', 'class'],
    blockquote: ['id', 'class', 'cite'],
    br: ['id', 'class'],
    caption: ['id', 'class'],
    center: ['id', 'class'],
    cite: ['id', 'class'],
    code: ['id', 'class'],
    col: ['id', 'class', 'align', 'valign', 'span', 'width'],
    dd: ['id', 'class'],
    del: ['id', 'class', 'datetime'],
    details: ['id', 'class', 'open'],
    div: ['id', 'class'],
    dl: ['id', 'class'],
    dt: ['id', 'class'],
    em: ['id', 'class'],
    font: ['id', 'class', 'color', 'size', 'face'],
    footer: ['id', 'class'],
    h1: ['id', 'class'],
    h2: ['id', 'class'],
    h3: ['id', 'class'],
    h4: ['id', 'class'],
    h5: ['id', 'class'],
    h6: ['id', 'class'],
    header: ['id', 'class'],
    hr: ['id', 'class'],
    i: ['id', 'class'],
    img: ['id', 'class', 'src', 'alt', 'title', 'width', 'height'],
    ins: ['id', 'class', 'datetime'],
    li: ['id', 'class'],
    mark: ['id', 'class'],
    nav: ['id', 'class'],
    ol: ['id', 'class'],
    p: ['id', 'class'],
    pre: ['id', 'class'],
    s: ['id', 'class'],
    section: ['id', 'class'],
    small: ['id', 'class'],
    span: ['id', 'class'],
    sub: ['id', 'class'],
    sup: ['id', 'class'],
    strong: ['id', 'class'],
    table: ['id', 'class', 'width', 'border', 'align', 'valign'],
    tbody: ['id', 'class', 'align', 'valign'],
    td: ['id', 'class', 'width', 'rowspan', 'colspan', 'align', 'valign'],
    tfoot: ['id', 'class', 'align', 'valign'],
    th: ['id', 'class', 'width', 'rowspan', 'colspan', 'align', 'valign'],
    thead: ['id', 'class', 'align', 'valign'],
    tr: ['id', 'class', 'rowspan', 'align', 'valign'],
    tt: ['id', 'class'],
    u: ['id', 'class'],
    ul: ['id', 'class'],
    video: ['id', 'class', 'autoplay', 'controls', 'loop', 'preload', 'src', 'width', 'height']

  }
}

/**
 * [description]
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @DateTime  2018-11-25
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {[type]}     formData [description]
 * @param     {[type]}     req      [description]
 * @return    {[type]}              [description]
 */
const checkCreatePostField = (formData, req) => {
  const hasLogin = req.session.userLogined
  const userInfo = req.session.userInfo

  if (!hasLogin || userInfo.id != formData.author) {
    return {
      status: false,
      msg: '身份验证失败'
    }
  }

  if (!/^cms_post_mark_\d{13}$/.test(formData.fakemark)) {
    return {
      status: false,
      msg: '参数错误'
    }
  }

  if (formData.title.length === 0 ||
    formData.title > 40 ||
    (formData.sub_title && formData.sub_title.length > 40) ||
    formData.description.length === 0 ||
    formData.description.length > 80 ||
    formData.content.length === 0
  ) {
    return {
      status: false,
      msg: '输入内容格式不符合'
    }
  }
  return {
    status: true,
    msg: '校验通过'
  }
}

export default {
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
      const page = Number(fields.page) || 1
      const pageSize = Number(fields.pageSize) || 10
      const {
        isTop,
        sortBy,
        mode,
        cateId,
        cateName,
        tagName,
        state,
        user,
        source,
        searchKey
      } = fields

      let queryObj = {
          auth: 'public',
        },
        sortObj = {
          create_time: -1
        },
        files = null,
        postList = [],
        total = 0;

      log(`type of is Top ==>>`, typeof(isTop))
      // isTop 参数为可选，所以可能是true false undefind
      if (isTop === 'true') {
        queryObj.isTop = true
      } else if (isTop === 'false') {
        queryObj.isTop = false
      }
      if (sortBy) {
        delete sortObj.create_time
        sortObj[sortBy] = -1
      }

      if (searchKey) {
        const reKey = new new RegExp(searchKey, 'i')
        queryObj.content = {
          $regex: reKey
        }
        queryObj.source = 0
      }

      if (cateId && cateId !== 'AppIndex') {
        queryObj.categories = cateId
      }

      if (cateName && cateName !== '首页') {
        const targetCateName = await CateforySchema.findOne({
          name: cateName
        })

        if (targetCateName) {
          queryObj.categories = targetCateName._id
        }
      }

      if (tagName) {
        const targetTag = await TagSchema.findOneAndUpdate({
          name: tagName
        }, {
          '$inc': {
            'clicks': 1
          }
        })
        if (targetTag) {
          queryObj.tags = targetTag._id
          // 若有标签，则查询全部类别
          delete queryObj.categories
        }
      }

      if (state === 'draft') {
        queryObj.state = 'draft'
      } else {
        queryObj.state = 'published'
      }
      // 文章类型
      if (source === 1 || source === 0) {
        queryObj.source = source
      }

      // 返回字段格式
      if (mode === 'simple') {
        files = {
          _id: 1,
          title: 1,
          cover: 1,
          create_time: 1
        }
      } else if (mode === 'normal') {
        files = {
          _id: 1,
          title: 1,
          cover: 1,
          description: 1,
          author: 1,
          categories: 1,
          tags: 1,
          likesNum: 1,
          clicksNum: 1,
          collectionsNum: 1,
          create_time: 1
        }
      }

      if (user) {
        queryObj.author = user
      }

      log(`queryObj==>>`, queryObj)

      if (mode === 'simple') {
        postList = await PostSchema.find(queryObj, files).sort(sortObj).skip((page - 1) * pageSize).limit(pageSize).exec()
      } else {
        postList = await PostSchema.find(queryObj, files).sort(sortObj).skip((page - 1) * pageSize).limit(pageSize).populate([{
          path: 'author',
          select: 'nickname _id avatar'
        }, {
          path: 'categories',
          select: 'name _id'
        }, {
          path: 'tags',
          select: 'name _id'
        }]).exec()
      }

      total = await PostSchema.countDocuments(queryObj)

      const postObj = {
        list: postList,
        page,
        pageSize,
        lastPage: Math.ceil(total / pageSize),
        searchKey: searchKey || '',
        total
      }

      return res.send(renderApiData(req, res, 200, '文章列表获取成功', postObj))
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [createSinglePost description]
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
  async createSinglePost(req, res, next) {
    const {
      body: fields
    } = req

    const postObj = {
      title: fields.title.trim(),
      sub_title: fields.sub_title || '',
      description: fields.description,
      cover: fields.cover,
      content: fields.content,
      auth: fields.auth === 'secret' ? 'secret' : 'public',
      state: fields.state === 'draft' ? 'draft' : 'published',
      isTop: fields.isTop === true ? true : false,
      source: fields.source === '1' ? 1 : 0,
      categories: fields.categories,
      tags: fields.tags,
      content_type: fields.content_type === 'T' ? 'T' : 'M',
      author: fields.author
    }

    // 处理用户自定义添加的标签
    if (postObj.tags.length > 0) {
      const tagArr = []
      for (let i = 0; i < postObj.tags.length; i++) {
        tagArr.push((async (index) => {
          // 如果不是合法id，则进行校验存储
          if (!shortid.isValid(postObj.tags[i])) {
            if (postObj.tags[index].length <= 20) {
              try {
                // 存储到数据库
                const _obj = new TagSchema({
                  name: postObj.tags[index]
                })
                const newTag = await _obj.save()
                return newTag._id
              } catch (err) {
                log(`创建标签失败`, err)
                return ''
              }
            } else {
              return ''
            }
          } else {
            // 如果是，则查询数据库是否存在
            try {
              let _tag = await TagSchema.findOne({ _id: postObj.tags[index] })
              if (_tag && _tag._id === postObj.tags[index]) {
                return _tag._id
              } else {
                return ''
              }
            } catch (err) {
              log('查询存在的标签出问题', err)
              return ''
            }
          }
        })(i))
      }



      let resultTagArr = await Promise.all(tagArr)

      resultTagArr = resultTagArr.filter(item => {
        return item !== ''
      })
      postObj.tags = resultTagArr
    }

    log(postObj)

    const newPost = new PostSchema(postObj)

    try {
      const _postObj = await newPost.save()
      // 更新用户发帖数
      await UserSchema.findOneAndUpdate({
        _id: postObj.author
      }, {
        '$inc': { // inc 增加
          postsNum: 1
        }
      })

      return res.send(renderApiData(req, res, 200, '文章创建成功', {
        id: _postObj._id
      }))
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }

  },
  /**
   * [updateSinglePost description]
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
  async updateSinglePost(req, res, next) {
    const {
      body: fields
    } = req
    const postObj = {
      title: fields.title.trim(),
      sub_title: fields.sub_title || '',
      description: fields.description,
      cover: fields.cover,
      content: fields.content,
      auth: fields.auth === 'secret' ? 'secret' : 'public',
      state: fields.state === 'draft' ? 'draft' : 'published',
      isTop: fields.isTop === true ? true : false,
      source: fields.source === '1' ? 1 : 0,
      categories: fields.categories,
      tags: fields.tags,
      content_type: fields.content_type === 'T' ? 'T' : 'M'
    }

    log(postObj)

    try {
      const itemId = fields._id
      const oldPost = await PostSchema.findOne({
        _id: itemId
      })
      // 若新传入图片路径与之前图片不一致，则删除之前图片并更新
      if (oldPost.cover !== postObj.cover) {
        if (oldPost.cover.indexOf('/upload/images') >= 0) {
          // 文件储存于服务器
          const _path = `${process.cwd()}/static${oldPost.cover}`
          log(`imgpath==>>`, _path)
          if (fs.existsSync(_path)) {
            // 存在则删掉
            fs.unlinkSync(_path)
          }
        }
      }

      await PostSchema.findOneAndUpdate({
        _id: itemId
      }, {
        $set: postObj
      })

      return res.send(renderApiData(req, res, 200, '文章更新成功', {
        id: itemId
      }))
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [getSinglePostDetail description]
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
  async getSinglePostDetail(req, res, next) {
    const _session = req.session
    log('======>>>>>>')
    log(_session)
    try {
      const targetId = req.params.id
      const getFrom = req.query.getFrom
      const queryObj = {
        _id: targetId
      }
      let updateObj = {
        '$inc': {
          'clicksNum': 1
        }
      }

      // 若详情拉取来自管理后台，则不进行点击数增加
      if (getFrom === 'admin') {
        updateObj = {}
      }
      let content = await PostSchema.findOneAndUpdate(queryObj, updateObj).populate([{
        path: 'author',
        select: 'nickname _id'
      }, {
        path: 'tags',
        select: 'name _id'
      }, {
        path: 'categories',
        select: 'name _id'
      }]).exec()
      content = content.toObject()

      if (getFrom !== 'admin') {
        if (content.content) {
          const tok = Marked.lexer(content.content)
          const text = Marked.parser(tok).replace(/<pre>/ig, '<pre class="hljs">')
          content.content = xss(text, options)
        }

        // 根据session判断用户是否登陆。若登陆状态则判断是否已经点赞此文章
        if (_session.userLogined) {
          // log('======>>>>>>')
          log(_session)

          const userId = _session.userInfo.id
          if (userId && content.like_users.indexOf(userId) > -1) {
            content.hasLiked = true
          } else {
            content.hasLogin = false
          }
          // 收藏
          if (userId && content.collect_users.indexOf(userId) > -1) {
            content.hasCollected = true
          } else {
            content.hasCollected = false
          }
        } else {
          content.hasLiked = false
          content.hasCollected = false
        }
      }

      log(content.content)

      return res.send(renderApiData(req, res, 200, '文章详情获取成功', content || {}))
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [deleteSinglePost description]
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
  async deleteSinglePost(req, res, next) {
    try {
      const {
        id
      } = req.params

      const postAuthor = await PostSchema.findOne({
        _id: id
      }, 'author')

      log(postAuthor)
      if (postAuthor.author) {
        await PostSchema.remove({
          _id: id
        })
        await UserSchema.findOneAndUpdate({
          _id: postAuthor.author
        }, {
          '$inc': {
            postsNum: -1
          }
        })
        return res.send(renderApiData(req, res, 200, '文章删除成功', {}))
      } else {
        return res.send(renderApiError(req, res, 500, '文章删除失败'))
      }

    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [updateSinglePostLikeNum description]
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
  async updateSinglePostLikeNum(req, res, next) {
    const postId = req.body.id
    const userId = req.session.userInfo.id

    try {
      const oldPost = await PostSchema.findOne({
        _id: postId
      })
      if (!oldPost || (oldPost.like_users).indexOf(userId) > -1) {
        return res.send(renderApiError(req, res, 500, '更新失败'))
      } else {
        const newPost = await PostSchema.findOneAndUpdate({
          _id: postId
        }, {
          '$inc': {
            'likesNum': 1
          },
          '$push': {
            'like_users': userId
          }
        })
        return res.send(renderApiData(req, res, 200, '更新成功', {
          likesNum: newPost.likesNum + 1,
          hasLiked: true
        }))
      }
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [updateSinglePostCollectNum description]
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
  async updateSinglePostCollectNum(req, res, next) {
    const postId = req.body.id
    const userId = req.session.userInfo.id

    try {
      const oldPost = await PostSchema.findOne({
        _id: postId
      })
      if (!oldPost || (oldPost.collect_users).indexOf(userId) > -1) {
        return res.send(renderApiError(req, res, 500, '更新失败'))
      } else {
        const newPost = await PostSchema.findOneAndUpdate({
          _id: postId
        }, {
          '$inc': {
            'collectionsNum': 1
          },
          '$push': {
            'collect_users': userId
          }
        })
        return res.send(renderApiData(req, res, 200, '更新成功', {
          collectionsNum: newPost.collectionsNum + 1,
          hasCollected: true
        }))
      }
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  }
}
