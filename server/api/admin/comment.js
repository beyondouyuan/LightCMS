/*
* @Author: beyondouyuan
* @Date:   2018-08-21 09:47:25
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-18 20:52:36
*/

import { Router } from 'express'

import CommentController from '../../controllers/comment'
import { checkAuthSession } from '../../middleware/auth'
const router = Router()

// 评论列表
router.get('/comment', checkAuthSession, CommentController.getList)
router.put('/comment/:id', checkAuthSession, CommentController.updateSingleComment)
router.delete('/comment/:id', checkAuthSession, CommentController.deleteSingleComment)

export default router
