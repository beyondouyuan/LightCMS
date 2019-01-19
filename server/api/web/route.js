/*
* @Author: beyondouyuan
* @Date:   2018-08-21 09:46:11
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-16 23:36:01
*/
import { Router } from 'express'

import UserController from '../../controllers/user'
import CategoryController from '../../controllers/category'
import AdvController from '../../controllers/adv'
import LinkController from '../../controllers/link'
import PostsController from '../../controllers/posts'
import CommentController from '../../controllers/comment'
import TagController from '../../controllers/tag'
import SystemController from '../../controllers/system'


const router = Router()

/**
 * 菜单相关
 */
router.get('/menu', CategoryController.getList)

router.post('/upload', SystemController.uploadImage)

/**
 * 友链相关
 */
router.get('/link', LinkController.getList)

/**
 * banner相关
 */
router.get('/banner', AdvController.getList)
router.get('/banner/:id', AdvController.getSingleAdv)

/**
 * 评论相关
 */
router.get('/comments', CommentController.getList)
router.post('/comments', CommentController.createComment)

/**
 * 文章相关
 */
router.get('/posts', PostsController.getList)
router.get('/posts/:id', PostsController.getSinglePostDetail)
router.post('/posts', PostsController.createSinglePost)

// 用户喜欢文章
router.post('/posts/like', PostsController.updateSinglePostLikeNum)
// 用户收藏文章
router.post('/posts/collect', PostsController.updateSinglePostCollectNum)

router.get('/tag', TagController.getList)
/**
 * 会员相关
 */

router.get('/member', UserController.getList)
router.get('/member/:id', UserController.getMemberBaseInfo)
router.post('/member/login', UserController.handleMemberLoginAction)
router.post('/member/logout', UserController.handleLogoutAction)
router.post('/member/register', UserController.handleMemberRegisterAction)
router.post('/member/avatar', UserController.updateMemberAvatar)
router.post('/member/profile', UserController.updateMemberProfile)

// 关注用户
router.post('/member/follow', UserController.handleFollowMember)
// 取消关注用户
router.post('/member/unfollow', UserController.handleUnFollowMember)

export default router
