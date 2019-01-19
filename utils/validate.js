/*
 * @Author: beyondouyuan
 * @Date:   2018-08-22 16:13:18
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-09-12 15:07:40
 */

import validator from 'validator'

export default {
	checkUserName(name) {
		const reg = /^[a-zA-Z0-9_-]{4,16}$/
		return reg.test(name)
	},
	checkEmail(email) {
		return validator.isEmail(email)
	},
	checkPass(passwd) {
		let pattern = /^([a-zA-Z0-9!.@#$%^&*()_?<>{}]){8,16}$/
		return pattern.test(passwd)
	},
	checkMobile(phone) {
		return validator.isMobilePhone(phone, 'zh-CN')
	}
}