<template>
    <section class="article-container">
        <article-detail :articleDetail="articleDetail" @like-post="handleLikePost" @collect-post="handleCollectPost" :loginState="loginState"></article-detail>
        <article-comment
            :loginState="loginState"
            :commentList="commentList"
            :postId="postId"
            @post-comment="handlePostComment"
            @toggle-replybox="handleToggleReplybox"></article-comment>
    </section>
</template>
<script>
import {
    log,
    arrayToTree
} from '~/utils/util'
import { mapState, mapActions } from 'vuex'
const requestCode = 200
import {
    requestMenuList,
    requestLinkList,
    requestArticleList,
    requestTagsList,
    requestMembersList,
    requestBannerList,
    requestArticleDetail,
    requestArticleLike,
    requestArticleCollect,
    requestCommentList,
    requestComment
} from '~/api/web'
import ArticleDetail from '@/components/Client/Article/Detail'
import ArticleComment from '@/components/Client/Article/Comment'
const serverFetchArticleDetail = id => {
    const condition = {
        id: id
    }
    return requestArticleDetail(condition)
        .then(res => {
            const {
                code,
                message,
                data
            } = res
            if (code === requestCode) {
                return data
            }
        })
        .catch(e => {
            return {}
        })
}
// 顶部菜单
const serverFetchMenuList = () => {
    const condition = {
        mode: 'full'
    }
    return requestMenuList(condition)
        .then(res => {
            const {
                code,
                data: { list }
            } = res
            if (code === requestCode) {
                const tree = arrayToTree(list)
                tree.forEach(item => {
                    if (item.children.length === 0) {
                        delete item.children
                    }
                })
                return tree
            }
        })
        .catch(e => {
            return []
        })
}
// 友谊链接
const serverFetchLinkList = () => {
    const condition = {
        mode: 'full'
    }
    return requestLinkList(condition)
        .then(res => {
            const {
                code,
                data: { list }
            } = res
            if (code === requestCode) {
                return list
            }
        })
        .catch(e => {
            return []
        })
}
// 热门文章
const serverFetchHotArticleList = () => {
    const condition = {
        sortBy: 'clicks',
        mode: 'simple',
        page: 1,
        pageSize: 5
    }
    return requestArticleList(condition)
        .then(res => {
            const {
                code,
                message,
                data: { list }
            } = res
            if (code === requestCode) {
                return list
            }
        })
        .catch(e => {
            return []
        })
}
// 热门标签
const serverFetchHotTags = () => {
    const condition = {
        isHot: true,
        // page: 1,
        pageSize: 5
    }
    return requestTagsList(condition)
        .then(res => {
            const {
                code,
                message,
                data: { list }
            } = res
            if (code === requestCode) {
                return list
            }
        })
        .catch(e => {
            return []
        })
}
export default {
    data() {
        return {
            postId: '',
            commentList: []
        }
    },
    layout(context) {
        return 'web'
    },
    async fetch({ store, params }) {
        const {
            name
        } = params
        const menus = await serverFetchMenuList()
        const links = await serverFetchLinkList()
        const hotArticleList = await serverFetchHotArticleList()
        const hotTagList = await serverFetchHotTags()
        store.commit('SET_TOP_MENUS', menus)
        store.commit('SET_FRIEND_LINK', links)
        store.commit('SET_HOT_ARTICLE', hotArticleList)
        store.commit('SET_HOT_TAGS', hotTagList)
        store.commit('SET_CURRENT_NAME', name)
    },
    async asyncData({ params }) {
        const [articleDetail] = await Promise.all([
            serverFetchArticleDetail(params.id)
        ])
        console.log(articleDetail)
        return {
            postId: params.id,
            articleDetail
        }
    },
    head() {
        return {
            title: `${this.articleDetail.title}`
        }
    },
    computed: mapState(['loginState']),
    mounted() {
        this.fetchHotMembersOnCLient()
        this.fetchHotBannersOnCLient()
        this.fetchCommentListOnClient()
    },
    methods: {
        fetchCommentListOnClient() {
            requestCommentList({postId: this.postId})
            .then(res => {
                const {
                    code,
                    message,
                    data: { list }
                } = res
                if (code === requestCode) {
                    this.commentList = [...list]
                }
            })
            .catch(e => {
                console.log(e)
            })
        },
        handleLikePost(id, success) {
            requestArticleLike({ id })
                .then(res => {
                    const {
                        code,
                        message,
                        data
                    } = res
                    if (code === requestCode) {
                        success && success(data)
                    }
                })
                .catch(e => {
                    log(e)
                })
        },
        handleCollectPost(id, success) {
            requestArticleCollect({ id })
                .then(res => {
                    const {
                        code,
                        message,
                        data
                    } = res
                    if (code === requestCode) {
                        success && success(data)
                    }
                })
                .catch(e => {
                    log(e)
                })
        },
        ...mapActions(['setHotMembersAction', 'setHotBannerAction']),
        fetchHotBannersOnCLient() {
            const condition = {
                page: 1,
                pageSize: 1
            }
            requestBannerList(condition)
                .then(res => {
                    const {
                        code,
                        message,
                        data: { list }
                    } = res
                    if (code === requestCode) {
                        this.setHotBannerAction(list[0])
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        },
        fetchHotMembersOnCLient() {
            const condition = {
                role: 'member',
                sortBy: 'postsNum',
                pageSize: 5
            }
            requestMembersList(condition)
                .then(res => {
                    const {
                        code,
                        message,
                        data: { list }
                    } = res
                    if (code === requestCode) {
                        this.setHotMembersAction(list)
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        },
        handlePostComment(data, success, fail) {
            requestComment(data)
            .then(res => {
                    const {
                        code,
                        message
                    } = res
                    if (code === requestCode) {
                        success && success()
                    }
                })
                .catch(e => {
                    fail && fail()
                })
        },
        handleToggleReplybox(index, show) {
            let list = this.commentList
            list.forEach((item, idx) => {
                item.showReplyBox = false
                if (idx === index) {
                  item.showReplyBox = bool
                }
            })
        }
    },
    components: {
        ArticleDetail,
        ArticleComment
    }
}
</script>
