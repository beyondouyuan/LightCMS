<template>
    <section class="tag-container">
        <tag-top
            @add-tag="handleToggleAddDialog"
        ></tag-top>
        <tag-table
          :dataSource="dataSource"
          :pageSizes="sizes"
          :total="total"
          @delete-tag="handleDeleteTag"
          @update-tag="handleToggleShowUpdate"
          ></tag-table>
          <tag-add
            @add-tag="handleToggleAddDialog"
            @create-tag="handleCreateTag"
            :dialogFormVisible="dialogFormVisible"
          ></tag-add>
          <tag-edit
            @add-tag="handleToggleShowUpdate"
            @update-tag="handleUpdateTag"
            :form="editform"
            :dialogFormVisible="updateFormVisible"
          ></tag-edit>
    </section>
</template>
<script>
import siteConf from '~/config/site'

import TagTable from '~/components/Admin/Tags/Table'
import TagTop from '~/components/Admin/Tags/Top'
import TagAdd from '~/components/Admin/Tags/Add'
import TagEdit from '~/components/Admin/Tags/Edit'
import {
    log
} from '~/utils/util'
const requestCode = 200
import {
    requestTagList,
    deleteSingleTag,
    createSingleTag,
    requestSingleTag,
    updateSingleTag
} from '~/api/admin'
export default {
    data() {
        return {
            dataSource: [],
            total: 100,
            sizes: 10,
            dialogFormVisible: false,
            updateFormVisible: false,
            listQuery: {
                page: 1,
                pageSize: 10
            },
            editform: {

            }
        }
    },
    layout(context) {
        return 'admin'
    },
    fetch({ store, params }) {
        const cateStore = {
            cateName: '标签管理',
            routes: [{
                path: siteConf.adminPath,
                title: '首页'
            }, {
                path: `${siteConf.adminPath}/tags`,
                title: '标签管理'
            }]
        }
        store.commit('SET_CATE', cateStore)
    },
    mounted() {
        this.fetchTagList()
    },
    methods: {
        handleUpdateTag(data, success, fail) {
            updateSingleTag(data)
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
                    success && success()
                    this.fetchTagList()
                } else {
                    this.$message({
                        type: 'error',
                        message: message
                    })
                    success && success()
                }
            })
        },
        handleCreateTag(data, success, fail) {
            createSingleTag(data)
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
                    success && success()
                    this.fetchTagList()
                } else {
                    this.$message({
                        type: 'error',
                        message: message
                    })
                    success && success()
                }
            })

        },
        fetchTagList() {
            const params = {
                ...this.listQuery
            }
            requestTagList(params)
            .then(res => {
                const {
                    code,
                    message,
                    data: { lastPage, list, page, pageSize, total }
                } = res
                if (code === requestCode) {
                    this.dataSource = [...list]
                }
            })
        },
        handleDeleteTag(data) {
            const { _id } = data
            deleteSingleTag(_id)
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
                    this.fetchTagList()
                } else {
                    this.$message({
                        type: 'error',
                        message: message
                    })
                }
            })
        },
        requestSingleTag(id) {
            // 返回一个promise来代替callback
            return new Promise((resolve, reject) => {
                requestSingleTag(id)
                    .then(res => {
                        const {
                            code
                        } = res
                        if (code === requestCode) {
                            resolve(res)
                        } else {
                            reject(res)
                        }
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        handleToggleShowUpdate(show, data) {
            if (this.updateFormVisible === show) return false
            if (show) {
                // 拉取详情成功后，显示弹窗，注入数据
                this.requestSingleTag(data._id)
                    .then(res => {
                        const {
                            data
                        } = res
                        this.editform = data
                        this.updateFormVisible = show
                    })
            } else {
                this.updateFormVisible = show
            }
        },
        handleToggleAddDialog(show) {
            if (this.dialogFormVisible === show) return false
            this.dialogFormVisible = show
        }
    },
    components: {
        TagTable,
        TagTop,
        TagAdd,
        TagEdit
    }
}
</script>
