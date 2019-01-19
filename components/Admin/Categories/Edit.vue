<template>
    <el-dialog title="编辑分类" :visible.aync="showDialogBox" width="40%" center @close="handleCancelUpdate">
        <el-form :model="form" ref="updateCateForm" label-position="right" label-width="100px">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name" size="small" placeholder="请输入分类名称"></el-input>
            </el-form-item>
            <el-form-item label="分类描述" prop="description">
                <el-input type="textarea" :rows="2" v-model="form.description" size="small" placeholder="请输入分类描述"></el-input>
            </el-form-item>
            <el-form-item label="SEO标示" prop="default_url">
                <el-input v-model="form.default_url" size="small" placeholder="1-32位字母、数字、-、_组成"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="enable">
                <el-switch v-model="form.enable" active-color="#13CE66" inactive-color="#FF4949"></el-switch>
            </el-form-item>
            <el-form-item label="分类排序" prop="sort_id">
                <el-input-number v-model="form.sort_id" size="small" placeholder="请输入分类名称"></el-input-number>
            </el-form-item>
            <el-form-item label="分类类型" prop="type">
                <el-select size="small" v-model="form.type" placeholder="请选择分类类型">
                    <el-option v-for="item of typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div class="dialog-footer" slot="footer">
            <el-button size="small" @click="handleCancelUpdate">取消</el-button>
            <el-button size="small" type="primary" @click="handleConfirmUpdateCate('updateCateForm')">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
            typeOptions: [{
                value: 1,
                label: '文章'
            }, {
                value: 2,
                label: '专题'
            }, {
                value: 3,
                label: '资讯'
            }]
        }
    },
    props: {
        dialogFormVisible: {
            type: Boolean,
            default: true
        },
        form: {
            type: Object,
            default: () => {
                return {
                    name: '',
                    description: '',
                    default_url: '',
                    enable: true,
                    sort_id: 1,
                    type: 1
                }
            }
        }
    },
    computed: {
        showDialogBox: {
            get: function() {
                return this.dialogFormVisible
            },
            set: function() {

            }
        }
    },
    methods: {
        handleCancelUpdate() {
            this.$emit('add-cate', false)
        },
        handleConfirmUpdateCate() {
            const data = this.form
            this.$emit('update-cate', data, this.handleUpdateSuccessCallback)
        },
        handleUpdateSuccessCallback() {
            this.$refs['updateCateForm'].resetFields()
            this.$emit('add-cate', false)
        }
    }
}
</script>
