/*
 * @Author: beyondouyuan
 * @Date:   2018-08-20 11:03:04
 * @Last Modified by:   liyuan
 * @Last Modified time: 2018-08-20 11:03:36
 */
module.exports = {
	webpack: (config, options, webpack) => {
		config.entry.main = './server/index.js'
		return config
	}
}