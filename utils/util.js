/*
 * @Author: beyondouyuan
 * @Date:   2018-08-22 16:12:56
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-05 01:10:44
 */
import shortid from 'shortid'
import siteConf from '../config/site'

export const log = siteConf.dev ? console.log.bind(console) : () => { }
/**
 * 检测ID是否合法
 * @param  {[type]} ids [description]
 * @return {[type]}     [description]
 */
export const checkCurrentID = ids => {
	if (!ids) return false
	let idState = true
	let idsArr = ids.split(',')
	if (typeof idsArr === 'object' && idsArr.length > 0) {
		for (let i = 0; i < idsArr.length; i++) {
			if (!shortid.isValid(idsArr[i])) {
				idState = false
				break;
			}
		}
	} else {
		idState = false
	}
	return idState
}

/**
 * 格式化API响应数据
 * @param  {[type]} req             [description]
 * @param  {[type]} res             [description]
 * @param  {[type]} responseCode    [description]
 * @param  {[type]} responseMessage [description]
 * @param  {Object} data            [description]
 * @return {[type]}                 [description]
 */
export const renderApiData = (req, res, responseCode, responseMessage, data = {}) => {
	const responseData = {
		status: responseCode,
		code: responseCode,
		success: true,
		message: responseMessage,
		request_time: (new Date()).getTime(),
		data
	}
	return responseData
}
/**
 * 格式化API错误响应数据
 * @param  {[type]} req             [description]
 * @param  {[type]} res             [description]
 * @param  {[type]} responseCode    [description]
 * @param  {[type]} responseMessage [description]
 * @return {[type]}                 [description]
 */
export const renderApiError = (req, res, responseCode, responseMessage) => {
	// 若为开发环境返回具体信息用于调试，若为生产模式，不返回具体的报错信息
	if (typeof responseMessage == 'object') {
		responseMessage = siteConf.dev ? responseMessage : '发生未知错误！'
	}

	const responseData = {
		status: responseCode,
		code: responseCode,
		success: false,
		message: responseMessage,
		request_time: (new Date()).getTime(),
		data: {}

	}
	return responseData
}

/**
 * 数组转树形结构
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
export const arrayToTree = arr => {
	if (arr.length < 2) return arr

	const result = arr.filter((item, index) => {
		return item.parent_id === '0'
	})

	const subArr = arr.filter((item, index) => {
		return item.parent_id !== '0'
	})

	result.forEach(item => {
		item.children = []
		subArr.forEach(child => {
			if (child.parent_id === item._id) {
				item.children.push(child)
			}
		})
	})

	return result
}


/**
 * 获取客户端IP
 * @param  {[type]} req [description]
 * @return {[type]}     [description]
 */
export const getClientIP = req => {
	return req.headers['x-forwarded-for'] ||
	 req.connection.remoteAddress ||
	 req.socket.remoteAddress ||
	 req.connection.socket.remoteAddress ||
	 ''
}
/**
 * 接口中间件 检测是否登录状态
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const checkUserSession = (req, res, next) => {
	if(req.session.userLogined && req.session.userInfo.id) {
		next()
	} else {
		res.status(401).send(renderApiError(req, res, 401, '用户未登录，授权失败'))
	}
}
