<template>
    <section class="container">
        <article-list :articleList="articleList" :isTag="isTag" :cate="cate"></article-list>
    </section>
</template>
<script>
import {
    log,
    arrayToTree
} from '~/utils/util'
import { mapState, mapActions } from 'vuex'
const requestCode = 200
import { requestMenuList, requestLinkList, requestArticleList, requestTagsList, requestMembersList, requestBannerList } from '~/api/web'
import ArticleList from '@/components/Client/Article/List'
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
// 标签文章
const serverFetchArticleListByTagName = name => {
    const condition = {
        tagName: name,
        page: 1,
        mode: 'normal',
        pageSize: 10
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
            isTag: true,
            hotTagList: [],
            // 热门创作人
            hotCreaters: []
        }
    },
    layout(context) {
        return 'web'
    },
    async fetch({ store, params }) {
        const {
            tag
        } = params
        const menus = await serverFetchMenuList()
        const links = await serverFetchLinkList()
        const hotTagList = await serverFetchHotTags()
        store.commit('SET_TOP_MENUS', menus)
        store.commit('SET_FRIEND_LINK', links)
        store.commit('SET_CURRENT_NAME', '首页')
        store.commit('SET_HOT_TAGS', hotTagList)
        store.commit('SET_CURRENT_NAME', tag)
    },
    async asyncData({ params }) {
        const [articleList] = await Promise.all([
            serverFetchArticleListByTagName(params.tag)
        ])
        return {
            articleList,
            cate: params.tag
        }
    },
    head() {
        return {
            title: `ligtCMS-${this.cate}`
        }
    },
    mounted() {
        this.fetchHotMembersOnCLient()
    },
    methods: {
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
        }
    },
    components: {
        ArticleList
    }
}
</script>
