<template>
    <section class="advs-container">
        <adv-top
            @add-adv="handleToggleAddDialog"
        ></adv-top>
        <adv-table
          :dataSource="dataSource"
          :pageSizes="sizes"
          :total="total"
          @delete-adv="handleDeleteAdv"
          @update-adv="handleToggleShowUpdate"></adv-table>
          <adv-add
            @add-adv="handleToggleAddDialog"
            :dialogFormVisible="dialogFormVisible"
            @create-adv="handleCreateAdv"
          ></adv-add>
          <adv-edit
            @add-adv="handleToggleShowUpdate"
            :form="editform"
            :dialogFormVisible="updateFormVisible"
            @update-adv="handleUpdateAdv"
          ></adv-edit>
    </section>
</template>
<script>
import siteConf from '~/config/site'
import { mapActions } from 'vuex'
import AdvTable from '~/components/Admin/Advs/Table'
import AdvTop from '~/components/Admin/Advs/Top'
import AdvAdd from '~/components/Admin/Advs/Add'
import AdvEdit from '~/components/Admin/Advs/Edit'

import {
    log
} from '~/utils/util'
const requestCode = 200
import {
    requestAdvList,
    requestSingleAdv,
    deleteSingleAdv,
    updateSingleAdv,
    createSingleAdv,
} from '~/api/admin'

export default {
    data() {
        return {
            listQuery: {
                page: 1,
                pageSize: 10
            },
            dataSource: [{
                _id: 1,
                title: 'test title',
                desc: 'test desc',
                link: 'https://beyondouyuan.github.io/img/ouyuan.jpg',
                cover: 'https://beyondouyuan.github.io/img/ouyuan.jpg',
                enable: true
            }],
            total: 100,
            sizes: 10,
            dialogFormVisible: false,
            updateFormVisible: false,
            editform: {
                _id: '',
                title: '',
                desc: '',
                link: '',
                cover: '',
                enable: true
            }
        }
    },
    layout(context) {
        return 'admin'
    },
    mounted() {
        this.fetchAdvsOnCilent()
    },
    methods: {
        fetchSingleAdv(id) {
            // 返回一个promise来代替callback
            return new Promise((resolve, reject) => {
                requestSingleAdv(id)
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
        fetchAdvsOnCilent() {
            const params = {
                ...this.listQuery
            }
            requestAdvList(params)
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
        handleUpdateAdv(data, success, fail) {
            updateSingleAdv(data)
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
                    this.fetchAdvsOnCilent()
                } else {
                    this.$message({
                        type: 'error',
                        message: message
                    })
                    success && success()
                }
            })
        },
        handleCreateAdv(data, success, fail) {
            createSingleAdv(data)
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
                    this.fetchAdvsOnCilent()
                } else {
                    this.$message({
                        type: 'error',
                        message: message
                    })
                    success && success()
                }
            })
        },
        handleDeleteAdv(data) {
            const { _id } = data
            deleteSingleAdv(_id)
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
                    this.fetchAdvsOnCilent()
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
                // 拉取详情成功后，显示弹窗，注入数据
                this.fetchSingleAdv(data._id)
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
            cateName: '广告管理',
            routes: [{
                path: siteConf.adminPath,
                title: '首页'
            }, {
                path: `${siteConf.adminPath}/adv`,
                title: '广告管理'
            }]
        }
        store.commit('SET_CATE', cateStore)
    },
    components: {
        AdvTable,
        AdvTop,
        AdvAdd,
        AdvEdit
    }
}
</script>
