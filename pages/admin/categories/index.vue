<template>
    <section class="cate-container">
        <cate-top @add-cate="handleToggleAddDialog"></cate-top>
        <cate-tree :dataSource="dataSource" @add-cate="handleToggleAddDialog" @update-cate="handleToggleUpdateDialog" @delete-cate="handleDeleteCate"></cate-tree>
        <cate-add :dialogFormVisible="dialogFormVisible" :dialogParentNode="dialogParentNode" @add-cate="handleToggleAddDialog" @create-cate="handleCreateCate">
        </cate-add>
        <cate-edit :dialogFormVisible="updateFormVisible" :form="currentCateDate" @add-cate="handleToggleUpdateDialog" @update-cate="handleUpdateCate">
        </cate-edit>
    </section>
</template>
<script>
import siteConf from '~/config/site'
import CateTop from '~/components/Admin/Categories/Top'
import CateAdd from '~/components/Admin/Categories/Add'
import CateEdit from '~/components/Admin/Categories/Edit'
import CateTree from '~/components/Admin/Categories/Tree'
import {
    log,
    arrayToTree
} from '~/utils/util'
const requestCode = 200
import {
    requestCateList,
    requestSingleCate,
    deleteSingleCate,
    updateSingleCate,
    createSingleCate,
} from '~/api/admin'
export default {
    data() {
        return {
            // 添加分类弹窗
            dialogFormVisible: false,
            dialogParentNode: {

            },
            // 分类列表
            dataSource: [],
            // 更新分类
            updateFormVisible: false,
            // 当前选中的链接对象
            currentCateDate: {}
        }
    },
    layout(context) {
        return 'admin'
    },
    fetch({ store, params }) {
        const cateStore = {
            cateName: '分类管理',
            routes: [{
                path: siteConf.adminPath,
                title: '首页'
            }, {
                path: `${siteConf.adminPath}/categories`,
                title: '分类管理'
            }]
        }
        store.commit('SET_CATE', cateStore)
    },
    // 后台不需要做SEO---则一般在客户端拉取数据即可 无需在服务端拉取数据
    mounted() {
        this.fetchCategoriesOnCilent()
    },
    methods: {
        handleDeleteCate(cate) {
            const { _id } = cate
            deleteSingleCate(_id)
                .then(res => {
                    const {
                        code,
                        message
                    } = res
                    if (code === requestCode) {
                        this.$notify({
                            title: '删除成功',
                            message: message,
                            type: 'success'
                        })
                        // 更新数据
                        this.fetchCategoriesOnCilent()
                    } else {
                        this.$notify({
                            title: '删除失败',
                            message: message,
                            type: 'danger'
                        })
                    }
                })
        },
        handleCreateCate(data, success, fail) {
            createSingleCate(data)
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
                        this.fetchCategoriesOnCilent()
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
        handleUpdateCate(data, success, fail) {
            updateSingleCate(data)
            .then(res => {
                const {
                    code,
                    message
                } = res
                // 回调函数中清空表单，所以回调函数必须在提交修改之后再执行
                if (code === requestCode) {
                    this.$notify({
                        title: '更新成功',
                        message: message,
                        type: 'success'
                    })
                    success && success()
                    // 更新数据
                    this.fetchCategoriesOnCilent()
                } else {
                    this.$notify({
                        title: '更新失败',
                        message: message,
                        type: 'danger'
                    })
                    success && success()
                }

            })
        },
        /**
         * [handleToggleAddDialog 切换显示增加分类弹窗]
         * @param  {[type]} show        [description]
         * @param  {[type]} topCateNode [父级分类ID]
         * @return {[type]}             [description]
         */
        handleToggleAddDialog(show, topCateNode) {
            if (this.dialogFormVisible === show) return false
            this.dialogFormVisible = show
            this.dialogParentNode = topCateNode || {}

        },
        /**
         * [handleToggleUpdateDialog 切换显示编辑分类弹窗]
         * @param  {[type]} show [description]
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        handleToggleUpdateDialog(show, data) {
            if (this.updateFormVisible === show) return false
            // this.updateFormVisible = show
            if (show) {
                // 拉取详情成功后，显示弹窗，注入数据
                this.fetchCategoryById(data._id)
                    .then(res => {
                        const {
                            data
                        } = res
                        this.currentCateDate = data
                        this.updateFormVisible = show
                    })
            } else {
                this.updateFormVisible = show
            }
        },
        fetchCategoryById(id) {
            // 返回一个promise来代替callback
            return new Promise((resolve, reject) => {
                requestSingleCate(id)
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
        fetchCategoriesOnCilent() {
            const params = {
                mode: 'simple',
                pageSize: 10
            }
            requestCateList(params)
                .then(res => {
                    const {
                        code,
                        data: { lastPage, list, page, pageSize, total }
                    } = res
                    if (code === requestCode) {
                        const tree = arrayToTree(list)
                        this.dataSource = tree
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    components: {
        CateTop,
        CateAdd,
        CateEdit,
        CateTree
    }
}
</script>
