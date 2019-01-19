<template>
    <section class="link-container">
        <link-top
            @add-link="handleToggleAddDialog"
        ></link-top>
        <link-table
          :dataSource="dataSource"
          :pageSizes="sizes"
          :total="total"
          @delete-link="handleDeleteLink"
          @update-link="handleToggleShowUpdate"></link-table>
          <link-add
            @add-link="handleToggleAddDialog"
            @create-link="handleCreateLink"
            :dialogFormVisible="dialogFormVisible"
          ></link-add>
          <link-edit
            @add-link="handleToggleShowUpdate"
            :form="editform"
            @update-link="handleUpdateLink"
            :dialogFormVisible="updateFormVisible"
          ></link-edit>
    </section>
</template>
<script>
import siteConf from '~/config/site'

import LinkTable from '~/components/Admin/Links/Table'
import LinkTop from '~/components/Admin/Links/Top'
import LinkAdd from '~/components/Admin/Links/Add'
import LinkEdit from '~/components/Admin/Links/Edit'
import {
    log,
    arrayToTree
} from '~/utils/util'
const requestCode = 200
import {
    requestLinkList,
    deleteSingleLink,
    createSingleLink,
    updateSingleLink,
    requestSingleLink
} from '~/api/admin'
export default {
    data() {
        return {
            dataSource: [],
            total: 100,
            sizes: 10,
            dialogFormVisible: false,
            updateFormVisible: false,
            editform: {
                _id: '',
                name: '',
                desc: '',
                link: '',
                cover: '',
                enable: true
            },
            listQuery: {
                page: 1,
                pageSize: 10
            }
        }
    },
    layout(context) {
        return 'admin'
    },
    mounted() {
        this.handlefetchLinkList()
    },
    methods: {
        handlefetchLinkList() {
            const condition = {
                ...this.listQuery
            }
            requestLinkList(condition)
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
        },
        handlefetchLinkById(id) {
            // 返回一个promise来代替callback
            return new Promise((resolve, reject) => {
                requestSingleLink(id)
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
        handleCreateLink(data, success, fail) {
            createSingleLink(data)
                .then(res => {
                    const {
                        code,
                        message
                    } = res
                    if (code === requestCode) {
                        this.$notify({
                            title: '添加成功',
                            message: message,
                            type: 'success'
                        })
                        success && success()
                        // 更新数据
                        this.handlefetchLinkList()
                    } else {
                        this.$notify({
                            title: '添加失败',
                            message: message,
                            type: 'danger'
                        })
                        success && success()
                    }
                })
        },
        handleUpdateLink(data, success, fail) {
            updateSingleLink(data)
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
                    this.handlefetchLinkList()
                } else {
                    this.$message({
                        type: 'error',
                        message: message
                    })
                    success && success()
                }
            })
        },
        handleDeleteLink(data) {
            const { _id } = data
            deleteSingleLink(_id)
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
                    this.handlefetchLinkList()
                } else {
                    this.$message({
                        type: 'error',
                        message: message
                    })
                }
            })
        },
        handleToggleShowUpdate(show, data) {
            if (this.updateFormVisible === show) return false
            if (show) {
                this.updateFormVisible = show
                // 拉取详情成功后，显示弹窗，注入数据
                this.handlefetchLinkById(data._id)
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
    fetch({ store, params }) {
        const cateStore = {
            cateName: '友链管理',
            routes: [{
                path: siteConf.adminPath,
                title: '首页'
            }, {
                path: `${siteConf.adminPath}/links`,
                title: '友链管理'
            }]
        }
        store.commit('SET_CATE', cateStore)
    },
    components: {
        LinkTable,
        LinkTop,
        LinkAdd,
        LinkEdit
    }
}
</script>
