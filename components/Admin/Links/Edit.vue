<template>
    <el-dialog title="编辑友链" :visible.aync="showDialogBox" width="40%" center @close="handleCancelUpdate">
        <el-form :model="form" ref="updateLinkForm" label-position="right" label-width="100px">
            <el-form-item label="名称" prop="title">
                <el-input v-model="form.name" size="small" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
                <el-input v-model="form.desc" size="small" placeholder="请输入描述"></el-input>
            </el-form-item>
            <el-form-item label="链接" prop="link">
                <el-input v-model="form.link" size="small" placeholder="请输入广告链接"></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="cover">
                <el-input v-model="form.cover" size="small" placeholder="iconfont图标"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="enable">
                <el-switch v-model="form.enable" active-color="#13CE66" inactive-color="#FF4949"></el-switch>
            </el-form-item>
        </el-form>
        <div class="dialog-footer" slot="footer">
            <el-button size="small" @click="handleCancelUpdate">取消</el-button>
            <el-button size="small" type="primary" @click="handleConfirmUpdateLink">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import validator from 'validator'

export default {
    data() {
        return {
            uploadAction: ''
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
                    _id: '',
                    name: '',
                    desc: '',
                    link: '',
                    cover: '',
                    enable: true
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
            this.$emit('add-link', false)
        },
        handleConfirmUpdateLink() {
            const data = this.form
            this.$emit('update-link', data, this.handleUpdateSuccessCallback)
        },
        handleUpdateSuccessCallback() {
            this.$refs['updateLinkForm'].resetFields()
            this.$emit('add-link', false)
        }
    }
}
</script>
