/*
* @Author: beyondouyuan
* @Date:   2018-08-21 09:46:24
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-18 20:51:36
*/

import { Router } from 'express'

import AdvController from '../../controllers/adv'
import { checkAuthSession } from '../../middleware/auth'
const router = Router()


// 获取广告列表
router.get('/adv', checkAuthSession, AdvController.getList)
// 获取单个广告
router.get('/adv/:id', checkAuthSession, AdvController.getSingleAdv)
// 创建广告
router.post('/adv', checkAuthSession, AdvController.createSingleAdv)
// 删除广告
router.delete('/adv/:id', checkAuthSession, AdvController.deleteSingleAdv)
// 更新广告
router.put('/adv/:id', checkAuthSession, AdvController.updateSingleAdv)
export default router
