/*
* @Author: beyondouyuan
* @Date:   2018-10-05 22:55:19
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-01-18 00:18:44
*/

/**
 * 分类接口
 */
import {
  requestCateList,
  requestSingleCate,
  deleteSingleCate,
  updateSingleCate,
  createSingleCate
} from './category'

/**
 * 广告banner接口
 */
import {
  requestAdvList,
  requestSingleAdv,
  deleteSingleAdv,
  updateSingleAdv,
  createSingleAdv
} from './adv'

/**
 * 文章接口
 */
import {
  createSingleArticle,
  requestArticleList,
  updateSingleArticle,
  requestSingleArticle,
  deleteSingleArticle
} from './posts'

/**
 * 标签接口
 */
import {
  requestTagList,
  deleteSingleTag,
  createSingleTag,
  updateSingleTag,
  requestSingleTag
} from './tag'

/**
 * 友链接口
 */
import {
  requestLinkList,
  deleteSingleLink,
  createSingleLink,
  updateSingleLink,
  requestSingleLink
} from './link'

/**
 * 用户接口
 */
import {
  requestUserList,
  requestSingleUser,
  deleteSingleUser,
  updateSingleUser,
  createSingleUser,
  requestUserLogin,
  requestUserLogout
} from './user'

/**
 * 图片上传接口
 */
import {
  requestUploadImage,
  requestDataPreview
} from './sys'

/**
 * 评论相关
 */
import {
  requestCommentList,
  updateSingleComment,
  deleteSingleComment
} from './comments'


export {
  requestCateList,
  requestSingleCate,
  deleteSingleCate,
  updateSingleCate,
  createSingleCate,
  requestAdvList,
  requestSingleAdv,
  deleteSingleAdv,
  updateSingleAdv,
  createSingleAdv,
  createSingleArticle,
  requestArticleList,
  updateSingleArticle,
  requestSingleArticle,
  deleteSingleArticle,
  requestTagList,
  deleteSingleTag,
  createSingleTag,
  updateSingleTag,
  requestSingleTag,
  requestLinkList,
  deleteSingleLink,
  createSingleLink,
  updateSingleLink,
  requestSingleLink,
  requestUserList,
  requestSingleUser,
  deleteSingleUser,
  updateSingleUser,
  createSingleUser,
  requestUserLogin,
  requestUserLogout,
  requestUploadImage,
  requestDataPreview,
  requestCommentList,
  updateSingleComment,
  deleteSingleComment
}
