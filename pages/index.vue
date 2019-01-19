<template>
    <section class="main-container">
        <article-carousel :carouselList="topArticleList"></article-carousel>
        <article-tab :articleList="newArticleList"></article-tab>
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
import ArticleTab from '@/components/Client/Article/Tab'
import ArticleCarousel from '@/components/Client/Article/Carousel'
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
// 推荐文章
const serverFetchTopArticleList = () => {
    const condition = {
        mode: 'normal',
        page: 1,
        isTop: true,
        pageSize: 6
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
// 最新文章
const serverFetchNewArticleList = () => {
    const condition = {
        mode: 'normal',
        page: 1,
        isTop: false,
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
            newArticleList: [],
            topArticleList: [],
            hotArticleList: [],
            hotTagList: [],

            // 首页广告位
            indexAdvertise: null,
            // 热门创作人
            hotCreaters: []
        }
    },
    async asyncData() {
        const [
            newArticleList,
            topArticleList
        ] = await Promise.all([
            serverFetchNewArticleList(),
            serverFetchTopArticleList()
        ])
        return {
            newArticleList,
            topArticleList
        }
    },

    async fetch({ store, params }) {
        const menus = await serverFetchMenuList()
        const links = await serverFetchLinkList()
        const hotArticleList = await serverFetchHotArticleList()
        const hotTagList = await serverFetchHotTags()
        store.commit('SET_TOP_MENUS', menus)
        store.commit('SET_FRIEND_LINK', links)
        store.commit('SET_CURRENT_NAME', '首页')
        store.commit('SET_HOT_ARTICLE', hotArticleList)
        store.commit('SET_HOT_TAGS', hotTagList)
    },
    layout(context) {
        return 'web'
    },
    head() {
        return {
            title: 'ligtCMS-首页'
        }
    },
    computed: mapState(['loginState', 'menus']),
    mounted() {
        this.fetchHotMembersOnCLient()
        this.fetchHotBannersOnCLient()
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
        ArticleTab,
        ArticleCarousel
    }
}
</script>
<style scoped>
.title {
    margin: 30px 0;
}

.users {
    list-style: none;
    margin: 0;
    padding: 0;
}

.user {
    margin: 10px 0;
}
</style>
