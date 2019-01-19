/*
 * @Author: beyondouyuan
 * @Date:   2018-08-21 09:51:13
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-17 22:37:56
 */


import fs from 'fs'
import {
  log,
  renderApiData,
  renderApiError,
  getClientIP
} from '../utils'
import shortid from 'shortid'
import UserSchema from '../models/User'

import xss from 'xss'
import bcrypt from 'bcryptjs'
// 加密等级
const passLevel = 10

export default {
  async createSingleUser(req, res, next) {
    const {
      body: fields
    } = req
    const obj = {
      username: fields.username,
      nickname: fields.nickname,
      email: fields.email,
      password: fields.password,
      role: fields.role,
      enable: fields.enable ? true : false
    }

    try {
      // 加密
      const hash = await bcrypt.hash(obj.password, passLevel)
      if (hash) {
        obj.password = hash
        const newUser = new UserSchema(obj)
        const userObj = await newUser.save()

        return res.send(renderApiData(req, res, 200, '用户创建成功', {
          id: userObj._id
        }))
      } else {
        return res.send(renderApiError(req, res, 500, '秘密啊加密出错'))
      }
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async getList(req, res, next) {
    try {
      log(req.query)

      const {
        query: fields
      } = req

      const queryObj = {}
      // 按创建时间倒序
      const sortObj = {
        create_time: -1
      }
      let page = Number(fields.page) || 1,
        pageSize = Number(fields.pageSize) || 10;
      const role = fields.role
      const sortBy = fields.sortBy

      if (role === 'superAdmin' || role === 'admin' || role === 'member') {
        queryObj['role'] = role
      }
      if (sortBy) {
        sortObj[sortBy] = -1
      }
      log(queryObj)
      // 不返回password
      const userList = await UserSchema.find(queryObj, {
        password: 0
      }).sort(sortObj).skip((page - 1) * pageSize).limit(pageSize).exec()
      const total = await UserSchema.countDocuments(queryObj)

      log(userList, total)
      const userObj = {
        list: userList,
        page: page,
        lastPage: Math.ceil(total / pageSize),
        pageSize: pageSize,
        total: total
      }

      return res.send(renderApiData(req, res, 200, '用户列表获取成功', userObj))
    } catch (e) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async getSingleUser(req, res, next) {
    try {
      const {
        id: userId
      } = req.params
      // 按ID查询
      const queryObj = {
        _id: userId
      }

      const user = await UserSchema.findOne(queryObj).exec()

      return res.send(renderApiData(req, res, 200, '用户获取成功', user))
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async deleteSingleUser(req, res, next) {
    try {
      const {
        id
      } = req.params

      log(id)

      await UserSchema.remove({
        _id: id
      })

      return res.send(renderApiData(req, res, 200, '用户删除成功', {}))
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async updateSingleUser(req, res, next) {
    const {
      body: fields
    } = req
    if (!shortid.isValid(fields._id)) {
      return res.send(renderApiErr(req, res, 500, '数据校验失败'))
    }
    const obj = {
      nickname: fields.nickname,
      email: fields.email,
      password: fields.password,
      enable: fields.enable ? true : false
    }

    try {
      const userId = fields._id
      await UserSchema.findOneAndUpdate({
        _id: userId
      }, {
        $set: obj
      })
      return res.send(renderApiData(req, res, 200, '用户资料更新成功', {
        id: userId
      }))
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async handleLoginAction(req, res, next) {
    const {
      body: fields
    } = req
    const userObj = {
      email: fields.email
    }
    const purePassword = fields.password

    try {
      // 查询用户
      const user = await UserSchema.findOne(userObj).exec()
      if (user) {
        // 用户已冻结
        if (!user.enable) {
          return res.send(renderApiError(req, res, 401, '账号已被禁用'))
        }
        // 会员账号无法登陆后台
        if (user.role === 'member') {
          return res.send(renderApiError(req, res, 404, '账号不存在'))
        }
        // 对比密码是否一致
        const hashPassword = await bcrypt.compare(purePassword, user.password)
        // 用户或者密码错误
        if (!hashPassword) {
          return res.send(renderApiError(req, res, 401, '用户名或密码错误'))
        }

        log(user)

        // 设置session
        req.session.userLogined = true,
          req.session.userInfo = {
            username: user.username,
            id: user._id,
            email: user.email,
            nickname: user.nickname,
            role: user.role,
            avatar: user.avatar
          }
        // req.session.token = 'xxxx'
        req.session.save()
        log('logSession -> ', req.session)
        // 更新登陆信息
        const ip = getClientIP(req)
        user.last_login_ip = ip
        user.last_login_time = Date.now()
        return res.send(renderApiData(req, res, 200, '登陆成功'))
      } else {
        // 用户不存在
        return res.send(renderApiError(req, res, 404, '账号不存在'))
      }
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async handleLogoutAction(req, res, next) {
    // 删除session。清除登陆状态
    delete req.session.userLogined
    delete req.session.userInfo

    return res.send(renderApiData(req, res, 200, '登出成功'))
  },

  /*********************** 会员相关API ***********************/
  async handleMemberLoginAction(req, res, next) {
    const {
      body: fields
    } = req
    const userObj = {
      email: fields.email
    }
    const purePassword = fields.password

    try {
      // 查询用户
      const user = await UserSchema.findOne(userObj).exec()
      if (user) {
        // 用户已冻结
        if (!user.enable) {

        }
        // 对比密码是否一致
        const hashPassword = await bcrypt.compare(purePassword, user.password)
        // 用户或者密码错误
        if (!hashPassword) {

        }

        log(user)

        // 设置session
        req.session.userLogined = true,
          req.session.userInfo = {
            username: user.username,
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            role: user.role,
            avatar: user.avatar
          }
        // req.session.token = 'xxxx'
        req.session.save()
        log('logSession -> ', req.session)
        // 更新登陆信息
        const ip = getClientIP(req)
        user.last_login_ip = ip
        user.last_login_time = Date.now()

        return res.send(renderApiData(req, res, 200, '登陆成功'))
      } else {
        // 用户不存在
      }
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async handleMemberRegisterAction(req, res, next) {
    const {
      body: fields
    } = req
    const obj = {
      username: fields.username,
      nickname: fields.nickname,
      email: fields.email,
      password: fields.password,
      role: 'member'
    }

    try {
      // 查询数据库中是否已经存在邮箱
      const user = await UserSchema.findOne({
        email: obj.email
      }, {
        password: 0
      })
      if (user) {
        return res.send(renderApiError(req, res, 500, '邮箱已被占用'))
      }
      // 加密
      const hash = await bcrypt.hash(obj.password, passLevel)
      if (hash) {
        obj.password = hash
        const newUser = new UserSchema(obj)
        const userObj = await newUser.save()

        return res.send(renderApiData(req, res, 200, '用户创建成功', {
          id: userObj._id
        }))
      } else {
        return res.send(renderApiError(req, res, 500, '秘密啊加密出错'))
      }
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },

  async getMemberBaseInfo(req, res, next) {
    try {

      const {
        params: {
          id: userId
        },
        session: _session
      } = req
      log(_session, userId)
      let files = {
        _id: 1,
        username: 1,
        nickname: 1,
        avatar: 1,
        signature: 1,
        sex: 1,
        age: 1,
        province: 1,
        city: 1,
        postsNum: 1,
        followsNum: 1,
        fansNum: 1,
        follow_users: 1,
        fans_users: 1
      }
      if (_session.userLogined && _session.userInfo.id === userId) {
        // 登陆用户请求自己的个人资料
        req.session.userLogined = _session.userLogined
        req.session.userInfo = _session.userInfo
        req.session.save()
        files = {
          _id: 1,
          username: 1,
          nickname: 1,
          avatar: 1,
          signature: 1,
          email: 1,
          phone: 1,
          role: 1,
          enable: 1,
          sex: 1,
          age: 1,
          province: 1,
          city: 1,
          address: 1,
          coin: 1,
          postsNum: 1,
          followsNum: 1,
          fansNum: 1,
          follow_users: 1,
          fans_users: 1
        }
      }
      const queryObj = {
        _id: userId
      }
      let userResult = await UserSchema.findOne(queryObj, files).populate([{
        path: 'follow_users',
        select: 'nickname _id avatar signature',
        model: UserSchema,
        options: {
          limit: 5
        }
      }, {
        path: 'fans_users',
        select: 'nickname _id avatar signature',
        model: UserSchema,
        options: {
          limit: 5
        }
      }]).exec()
      userResult = userResult.toObject()

      // 判断用户间状态返回是否关注的信息
      if (_session.userLogined && _session.userInfo.id !== userId) {
        let targetUser = await UserSchema.findOne({
          _id: userId
        })
        if (targetUser.fans_users.indexOf(_session.userInfo.id) > -1) {
          // 说明该登陆用户已经关注了访问的用户
          userResult.hasFollow = true
        } else {
          userResult.hasFollow = false
        }
      } else {
        userResult.hasFollow = false
      }

      log(userResult)
      return res.send(renderApiData(req, res, 200, '获取成功', userResult || {}))
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async updateMemberProfile(req, res, next) {
    const {
      body: fields,
      session: _session
    } = req
    try {
      if (!shortid.isValid(fields._id) || !_session.userLogined || _session.userInfo.id !== fields._id) {
        return res.send(renderApiError(req, res, 500, '更新失败'))
      }
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }

    const obj = {
      nickname: fields.nickname,
      signature: xss(fields.signature),
      sex: parseInt(fields.sex) === 2 ? 2 : 1,
      age: parseInt(fields.age),
      province: fields.province,
      city: fields.province,
      address: xss(fields.address)
    }

    try {
      let userId = fields._id
      await UserSchema.findOneAndUpdate({
        _id: userId
      }, {
        $set: obj
      })
      return res.send(renderApiData(req, res, 200, '资料更新成功', {
        id: userId
      }))
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async updateMemberAvatar(req, res, next) {
    const {
      body: fields,
      session: _session
    } = req
    if (!shortid.isValid(fields._id) || !_session.userLogined || _session.userInfo.id !== fields._id) {
      return res.send(renderApiError(req, res, 500, '更新失败'))
    } else if (!fields.avatar || fields.avatar.length > 300) {
      return res.send(renderApiError(req, res, 500, '更新失败'))
    }

    const obj = {
      avatar: fields.avatar
    }

    try {
      let userId = fields._id

      let oldUser = await UserSchema.findOne({
        _id: userId
      })
      // 如果新传来的图片路径和之前的图片路径不同，则删掉之前的图片并更新
      if (oldUser.cover !== obj.cover) {
        if (oldUser.cover.indexOf('/upload/images/') >= 0) {
          // 文件存储于服务器
          let _path = process.cwd() + '/static' + oldUser.cover
          log('imgpath -> ', _path)
          if (fs.existsSync(_path)) {
            // 存在，删掉
            fs.unlinkSync(_path)
          }
        }
      }

      await UserSchema.findOneAndUpdate({
        _id: userId
      }, {
        $set: obj
      })
      // 更新session
      req.session.userInfo.avatar = fields.avatar
      req.session.save()
      return res.send(renderApiData(req, res, 200, '头像更新成功', {
        id: userId
      }))
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }

  },
  async handleFollowMember(req, res, next) {
    const targetId = req.body.id
    const userId = req.session.userInfo.id
    // 校验数据
    if (!shortid.isValid(targetId) || !shortid.isValid(userId)) {
      return res.send(renderApiError(req, res, 500, '参数错误'))
    }
    try {
      const oldTargetUser = await UserSchema.findOne({
        _id: targetId
      })
      if (!oldTargetUser) {
        return res.send(renderApiError(req, res, 500, '用户不存在'))
      } else if ((oldTargetUser.fans_users).indexOf(userId) > -1) {
        return res.send(renderApiError(req, res, 500, '您已经关注了对方'))
      } else {
        const newTargetUser = await UserSchema.findOneAndUpdate({
          _id: targetId
        }, {
          '$inc': {
            'fansNum': 1
          },
          '$push': {
            'fans_users': userId
          }
        })
        const newUser = await UserSchema.findOneAndUpdate({
          _id: userId
        }, {
          '$inc': {
            'followsNum': 1
          },
          '$push': {
            'follow_users': newTargetUser._id
          }
        })
        return res.send(renderApiData(req, res, 200, '关注成功'))
      }
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  async handleUnFollowMember(req, res, next) {
    const targetId = req.body.id
    const userId = req.session.userInfo.id
    // 校验数据
    if (!shortid.isValid(targetId) || !shortid.isValid(userId)) {
      return res.send(renderApiError(req, res, 500, '参数错误'))
    }
    try {
      const oldTargetUser = await UserSchema.findOne({
        _id: targetId
      })
      if (!oldTargetUser) {
        return res.send(renderApiError(req, res, 500, '用户不存在'))
      } else if ((oldTargetUser.fans_users).indexOf(userId) < 0) {
        return res.send(renderApiError(req, res, 500, '您还没有关注对方'))
      } else {
        const newTargetUser = await UserSchema.findOneAndUpdate({
          _id: targetId
        }, {
          '$inc': {
            'fansNum': -1
          },
          '$pull': {
            'fans_users': userId
          }
        })
        const newUser = await UserSchema.findOneAndUpdate({
          _id: userId
        }, {
          '$inc': {
            'followsNum': -1
          },
          '$pull': {
            'follow_users': newTargetUser._id
          }
        })
        return res.send(renderApiData(req, res, 200, '取消关注成功'))
      }
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  }
}
