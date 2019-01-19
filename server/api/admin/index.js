/*
* @Author: beyondouyuan
* @Date:   2018-08-21 09:46:51
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-12 20:37:11
*/

import { Router } from 'express'

import adv from './adv'
import category from './category'
import posts from './posts'
import system from './system'
import tag from './tag'
import link from './link'
import user from './user'
import comment from './comment'

const router = Router()


router.use(adv)
router.use(category)
router.use(posts)
router.use(system)
router.use(tag)
router.use(link)
router.use(user)
router.use(comment)

export default router
