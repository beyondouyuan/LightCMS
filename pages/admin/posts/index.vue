<template>
    <section class="post-container">
        <post-top @switch-add-page="handleSwitchAddPosts">
        </post-top>
        <post-table :dataSource="dataSource" @delete-post="handleDeletePost"></post-table>
    </section>
</template>
<script>
import siteConf from '~/config/site'

import PostTable from '~/components/Admin/Posts/Table'
import PostTop from '~/components/Admin/Posts/Top'
import {
    log,
    arrayToTree
} from '~/utils/util'
const requestCode = 200
import {
    requestArticleList,
    deleteSingleArticle
} from '~/api/admin'
export default {
    data() {
        return {
            dataSource: []
        }
    },
    layout(context) {
        return 'admin'
    },
    fetch({ store, params }) {
        const cateStore = {
            cateName: '文章管理',
            routes: [{
                path: siteConf.adminPath,
                title: '首页'
            }, {
                path: `${siteConf.adminPath}/posts`,
                title: '文章管理'
            }]
        }
        store.commit('SET_CATE', cateStore)
    },
    mounted() {
        this.fetchArticleListOnCilent()
    },
    methods: {
        handleSwitchAddPosts() {
            this.$router.push(`${siteConf.adminPath}/posts/add`)
        },
        handleDeletePost(data) {
            const { _id } = data
            deleteSingleArticle(_id)
            .then(res => {
                const {
                    code,
                    message
                } = res
                if (code === requestCode) {
                    this.$message({
                        type: 'success',
                        message: message
                    })
                    this.fetchArticleListOnCilent()
                } else {
                    this.$message({
                        type: 'error',
                        message: message
                    })
                }
            })
            console.log(data)
        },
        fetchArticleListOnCilent() {
            const params = {
                // mode: 'simple',
                page: 1,
                pageSize: 10
            }
            requestArticleList(params)
                .then(res => {
                    console.log(res)
                    const {
                        code,
                        data: { lastPage, list, page, pageSize, total }
                    } = res
                    if (code === requestCode) {
                        this.dataSource = [...list]
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    components: {
        PostTable,
        PostTop
    }
}
</script>
