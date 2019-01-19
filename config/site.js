/*
 * @Author: beyondouyuan
 * @Date:   2018-08-22 16:09:29
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-16 21:34:26
 */


export default {
	/**
	 * 站点基本信息
	 */
	// 站点环境
	dev: (process.env.NODE_ENV !== 'production'),
	// 站点名称
	name: 'nuxt-cms',
	// 站点描述
	description: 'a nodejs with nuxt cms appliation project',
	// 站点关键字
	keywords: 'nuxt cms',
	// 站点域名
	host: '0.0.0.0',
	// 站点端口
	port: 3728,
	// api版本
	APIVersionURL: 'api/v1',
	// api路径
	baseAPIURL: '',

	/**
	 * 后台设置信息
	 */

	// 管理后台路径
	adminPath: '/admin',
	webPath: '/',
	// 日志路径
	logDir: '/',

	/**
	 * 数据库配置
	 */
	TEST_DB_URL: 'mongodb://127.0.0.1:27017/nuxt-cms-test',
	PROD_DB_URL: 'mongodb://127.0.0.1:27017/nuxt-cms-prod',
	DB_NAME: 'nuxtcms',
	DB_HOST: '127.0.0.1',
	DB_PORT: 27017,
	DB_USERNAME: 'ouyuan',
	DB_PASSWORD: 'ouyuan',


	/**
	 * 七牛第三方配置
	 */

	openqn: false,
	accesskey: 'your accesskey',
	secretkey: 'your secretkey',
	bucket: 'nuxt-cms',
	computerRoom: '华南',
	origin: 'http://paktmj0gu.bkt.clouddn.com',
	fsizeLimit: 1024 * 1024 * 1,
	assetsCDN: false,

	/**
	 * cookie配置
	 */

	secret: 'lightcms',
	resave: false,
	saveUninitialized: false,
	maxAge: 1000 * 60 * 60 * 24,

	/**
	 * 广告配置 ID
	 */

	indexAd: 'radv_irg'
}
