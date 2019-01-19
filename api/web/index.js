/*
* @Author: beyondouyuan
* @Date:   2019-01-12 21:01:43
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-17 23:18:07
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

/**
 * 菜单接口
 */
import {
  requestMenuList
} from './menu'

/**
 * 友链接口
 */
import {
  requestLinkList
} from './link'

/**
 * 文章接口
 */
import {
  requestArticleList,
  requestArticleDetail,
  createSingleArticle,
  requestArticleLike,
  requestArticleCollect
} from './posts'

/**
 * 标签接口
 */
import {
  requestTagsList
} from './tags'

/**
 * 评论接口
 */
import {
  requestComment,
  requestCommentList
} from './comments'

/**
 * 标签接口
 */
import {
  requestMembersList,
  requestMembersLogin,
  requestMembersRegister,
  requestMembersLogout,
  requestMembersBaseInfo,
  requestFollowMember,
  requestUnFollowMember,
  requestUpdateMemberProfile,
  requestUpdateMemberAvatar,
  requestUploadImage
} from './user'


import {
  requestBannerList
} from './banner'

export {
  requestMenuList,
  requestLinkList,
  requestArticleList,
  requestArticleDetail,
  createSingleArticle,
  requestArticleLike,
  requestArticleCollect,
  requestTagsList,
  requestMembersList,
  requestMembersLogin,
  requestMembersRegister,
  requestMembersLogout,
  requestMembersBaseInfo,
  requestFollowMember,
  requestUnFollowMember,
  requestUpdateMemberProfile,
  requestUpdateMemberAvatar,
  requestUploadImage,
  requestBannerList,
  requestComment,
  requestCommentList
}
