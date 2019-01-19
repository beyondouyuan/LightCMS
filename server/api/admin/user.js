/*
* @Author: beyondouyuan
* @Date:   2018-08-21 09:47:49
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-18 20:54:39
*/

import { Router } from 'express'

import UserController from '../../controllers/user'
import { checkAuthSession } from '../../middleware/auth'

const router = Router()

/* 顶部菜单 */

router.get('/user', checkAuthSession, UserController.getList)
router.get('/user/:id', checkAuthSession, UserController.getSingleUser)
router.post('/user', checkAuthSession, UserController.createSingleUser)
router.delete('/user/:id', checkAuthSession, UserController.deleteSingleUser)
router.put('/user/:id', checkAuthSession, UserController.updateSingleUser)
/* 用户登陆 */
router.post('/user/login', UserController.handleLoginAction)
router.post('/user/logout', UserController.handleLogoutAction)
export default router
