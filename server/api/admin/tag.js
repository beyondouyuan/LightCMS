/*
* @Author: beyondouyuan
* @Date:   2018-08-21 09:47:34
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-18 20:53:50
*/

import { Router } from 'express'

import TagController from '../../controllers/tag'
import { checkAuthSession } from '../../middleware/auth'

const router = Router()

/* 顶部菜单 */
router.get('/tag', checkAuthSession, TagController.getList)
router.post('/tag', checkAuthSession, TagController.createSingleTag)
router.delete('/tag/:id', checkAuthSession, TagController.deleteSingleTag)
router.put('/tag/:id', checkAuthSession, TagController.updateSingleTag)
router.get('/tag/:id', checkAuthSession, TagController.getSingleTag)
export default router
