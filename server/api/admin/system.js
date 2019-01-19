/*
* @Author: beyondouyuan
* @Date:   2018-08-21 09:47:44
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-18 20:53:32
*/

import { Router } from 'express'

import SystemController from '../../controllers/system'
import { checkAuthSession } from '../../middleware/auth'

const router = Router()

/* 顶部菜单 */
router.post('/upload', checkAuthSession, SystemController.uploadImage)
router.get('/preview', checkAuthSession, SystemController.dataPreview)

export default router
