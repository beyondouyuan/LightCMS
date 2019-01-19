/*
 * @Author: beyondouyuan
 * @Date:   2018-08-22 16:09:19
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-12 20:30:31
 */

import siteConf from './site'

siteConf.baseAPIURL = siteConf.dev ? 'http://127.0.0.1:3728' : ''
const {
	baseAPIURL,
	APIVersionURL
} = siteConf

export default {
	/**
	 * 后台API配置信息
	 */
	// 数据总览
	preview: `${baseAPIURL}/admin/${APIVersionURL}/preview`,

	/**
	 * 分类相关API
	 */
	category: `${baseAPIURL}/admin/${APIVersionURL}/category`,


	/**
	 * 标签相关API
	 */
	tag: `${baseAPIURL}/admin/${APIVersionURL}/tag`,

	/**
	 * 友谊链接相关API
	 */

	link: `${baseAPIURL}/admin/${APIVersionURL}/link`,

	/**
	 * 广告相关API
	 */

	adv: `${baseAPIURL}/admin/${APIVersionURL}/adv`,

	/**
	 * 文章相关API
	 */

	posts: `${baseAPIURL}/admin/${APIVersionURL}/posts`,
	uploadImage: `${baseAPIURL}/admin/${APIVersionURL}/upload`,

	/**
	 * 评论相关API
	 */

	comment: `${baseAPIURL}/admin/${APIVersionURL}/comment`,

	/**
	 * 用户相关API
	 */
	userLogin: `${baseAPIURL}/admin/${APIVersionURL}/user/login`,
	userLogout: `${baseAPIURL}/admin/${APIVersionURL}/user/logout`,
	user: `${baseAPIURL}/admin/${APIVersionURL}/user`,



	/**
	 * 客户端API配置信息
	 */

	/**
	 * 导航菜单
	 */
	webMenu: `${baseAPIURL}/web/${APIVersionURL}/menu`,
	/**
	 * 友谊链接
	 */
	webLink: `${baseAPIURL}/web/${APIVersionURL}/link`,
	/**
	 * 广告
	 */
	webBanner: `${baseAPIURL}/web/${APIVersionURL}/banner`,
	/**
	 * 文章列表
	 */
	webPosts: `${baseAPIURL}/web/${APIVersionURL}/posts`,

	/**
	 * 文章标签
	 */
	webTag: `${baseAPIURL}/web/${APIVersionURL}/tag`,

	/**
	 * 图片上传
	 */
	webUploadImage: `${baseAPIURL}/web/${APIVersionURL}/upload`,

	/**
	 * 会员登录
	 */
	webLogin: `${baseAPIURL}/web/${APIVersionURL}/member/login`,
	webLogout: `${baseAPIURL}/web/${APIVersionURL}/member/logout`,
	webRegister: `${baseAPIURL}/web/${APIVersionURL}/member/register`,
	webMember: `${baseAPIURL}/web/${APIVersionURL}/member`,

	/**
	 * 评论
	 */
	webComments: `${baseAPIURL}/web/${APIVersionURL}/comments`,

	/**
	 * 文章喜欢、收藏
	 */
	webPostLike: `${baseAPIURL}/web/${APIVersionURL}/post/like`,
	webPostCollect: `${baseAPIURL}/web/${APIVersionURL}/post/collect`
}
