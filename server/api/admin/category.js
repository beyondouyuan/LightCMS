/*
* @Author: beyondouyuan
* @Date:   2018-08-21 09:47:11
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-18 20:52:19
*/

import { Router } from 'express'

import CategoryController from '../../controllers/category'
import { checkAuthSession } from '../../middleware/auth'
const router = Router()

/*********************************** 顶部菜单 ***********************************/

// 获取分类列表
router.get('/category', checkAuthSession, CategoryController.getList)
// 获取单个分类
router.get('/category/:id', checkAuthSession, CategoryController.getSingleCate)
// 创建分类
router.post('/category', checkAuthSession, CategoryController.createSingleCate)
// 删除分类
router.delete('/category/:id', checkAuthSession, CategoryController.deleteSingleCate)
// 更新分类
router.put('/category/:id', checkAuthSession, CategoryController.updateSingleCate)

export default router
