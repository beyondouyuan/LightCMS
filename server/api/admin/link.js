/*
* @Author: beyondouyuan
* @Date:   2018-08-21 09:46:43
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-18 20:52:55
*/

import { Router } from 'express'

import LinkController from '../../controllers/link'
import { checkAuthSession } from '../../middleware/auth'
const router = Router()

// 获取友链列表
router.get('/link', checkAuthSession, LinkController.getList)
// 获取单个友链
router.get('/link/:id', checkAuthSession, LinkController.getSingleLink)
// 创建友链
router.post('/link', checkAuthSession, LinkController.createSingleLink)
// 删除友链
router.delete('/link/:id', checkAuthSession, LinkController.deleteSingleLink)
// 更新友链
router.put('/link/:id', checkAuthSession, LinkController.updateSingleLink)
export default router
