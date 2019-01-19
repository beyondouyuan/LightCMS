<template>
    <section class="comments-container">
        <comment-table :dataSource="dataSource" :pageSizes="sizes" :total="total" @delete-comment="handleDeleteComment" @update-comment="handleUpdateComment"></comment-table>
    </section>
</template>
<script>
import siteConf from '~/config/site'

import CommentTable from '~/components/Admin/Comments/Table'
import {
    log
} from '~/utils/util'
const requestCode = 200
import {
    requestCommentList,
    updateSingleComment,
    deleteSingleComment
} from '~/api/admin'
export default {
    data() {
        return {
            total: 100,
            sizes: 10,
            dataSource: []
        }
    },
    layout(context) {
        return 'admin'
    },
    fetch({ store, params }) {
        const cateStore = {
            cateName: '评论管理',
            routes: [{
                path: siteConf.adminPath,
                title: '首页'
            }, {
                path: `${siteConf.adminPath}/comments`,
                title: '评论管理'
            }]
        }
        store.commit('SET_CATE', cateStore)
    },
    mounted() {
        this.fetchCommentList()
    },
    methods: {
        handleDeleteComment(data) {
            const { id } = data
            deleteSingleComment(id)
                .then(res => {
                    const {
                        code,
                        message
                    } = res
                    if (code === requestCode) {
                        this.$notify({
                            title: '成功',
                            message: message,
                            type: 'success'
                        })
                        this.fetchCommentList()
                    } else {
                        this.$notify({
                            title: '失败',
                            message: message,
                            type: 'error'
                        })
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        },
        handleUpdateComment(data) {
            const { id, enable } = data
            const condition = {
                id,
                enable: !enable
            }
            updateSingleComment(condition)
                .then(res => {
                    const {
                        code,
                        message
                    } = res
                    if (code === requestCode) {
                        this.$notify({
                            title: '成功',
                            message: message,
                            type: 'success'
                        })
                        this.fetchCommentList()
                    } else {
                        this.$notify({
                            title: '失败',
                            message: message,
                            type: 'error'
                        })
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        },
        fetchCommentList() {
            const condition = {
                page: 1,
                pageSize: 10
            }
            requestCommentList(condition)
                .then(res => {
                    const {
                        code,
                        data: { lastPage, list, page, pageSize, total }
                    } = res
                    if (code === requestCode) {
                        this.dataSource = list
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    components: {
        CommentTable
    }
}
</script>
