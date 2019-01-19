<template>
    <section class="user-container">
        <user-top
            @add-user="handleToggleAddDialog"
        ></user-top>
        <user-table
            :dataSource="dataSource"
            :pageSizes="sizes"
            :total="total"
            @delete-user="handleDeleteUser"
            @update-user="handleToggleShowUpdate"></user-table>
        <user-add
            @add-user="handleToggleAddDialog"
            @create-user="handleCreateUser"
            :dialogFormVisible="dialogFormVisible"></user-add>
        <user-edit
            @add-user="handleToggleShowUpdate"
            :form="editform"
            @update-user="handleUpdateUser"
            :dialogFormVisible="updateFormVisible"></user-edit>
    </section>
</template>
<script>
import siteConf from '~/config/site'

import UserTable from '~/components/Admin/Users/Table'
import UserTop from '~/components/Admin/Users/Top'
import UserAdd from '~/components/Admin/Users/Add'
import UserEdit from '~/components/Admin/Users/Edit'
import {
    log
} from '~/utils/util'
const requestCode = 200
import {
    requestUserList,
    deleteSingleUser,
    createSingleUser,
    requestSingleUser,
    updateSingleUser
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
        this.handleFetchUserList()
    },
    methods: {
        handleFetchUserList() {
            const condition = {
                ...this.listQuery
            }
            requestUserList(condition)
            .then(res => {
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
        },
        handlefetchUserById(id){
            // 返回一个promise来代替callback
            return new Promise((resolve, reject) => {
                requestSingleUser(id)
                .then(res => {
                    console.log(res)
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
        handleCreateUser(data, success, fail) {
            createSingleUser(data)
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
                    this.handleFetchUserList()
                } else {
                    this.$message({
                        type: 'error',
                        message: message
                    })
                    success && success()
                }
            })
        },
        handleDeleteUser(data) {
            const { _id } = data
            deleteSingleUser(_id)
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
                    this.handleFetchUserList()
                } else {
                    this.$message({
                        type: 'error',
                        message: message
                    })
                }
            })
        },
        handleUpdateUser(data, success, fail) {
            updateSingleUser(data)
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
                    this.handleFetchUserList()
                } else {
                    this.$message({
                        type: 'error',
                        message: message
                    })
                    success && success()
                }
            })
        },
        handleToggleShowUpdate(show, data) {
            if (this.updateFormVisible === show) return false
            if (show) {
                this.updateFormVisible = show
                // 拉取详情成功后，显示弹窗，注入数据
                this.handlefetchUserById(data._id)
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
            cateName: '用户管理',
            routes: [{
                path: siteConf.adminPath,
                title: '首页'
            }, {
                path: `${siteConf.adminPath}/users`,
                title: '用户管理'
            }]
        }
        store.commit('SET_CATE', cateStore)
    },
    components: {
        UserTable,
        UserTop,
        UserAdd,
        UserEdit
    }
}
</script>
