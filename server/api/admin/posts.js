/*
* @Author: beyondouyuan
* @Date:   2018-08-21 09:46:59
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-18 20:53:13
*/

import { Router } from 'express'

import PostsController from '../../controllers/posts'
import { checkAuthSession } from '../../middleware/auth'

const router = Router()

/*********************************** 顶部菜单 ***********************************/

// 获取文章列表
router.get('/posts', checkAuthSession, PostsController.getList)
// 获取文章详情
router.get('/posts/:id', checkAuthSession, PostsController.getSinglePostDetail)
// 创建文章
router.post('/posts', checkAuthSession, PostsController.createSinglePost)
// 删除文章
router.delete('/posts/:id', checkAuthSession, PostsController.deleteSinglePost)
// 更新文章
router.put('/posts/:id', checkAuthSession, PostsController.updateSinglePost)

export default router
