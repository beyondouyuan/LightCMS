/*
* @Author: beyondouyuan
* @Date:   2018-08-21 09:46:04
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-08-21 10:32:22
*/
import { Router } from 'express'

import route from './route'

const router = Router()


router.use(route)

export default router