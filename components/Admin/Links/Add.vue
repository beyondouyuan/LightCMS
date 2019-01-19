<template>
    <el-dialog title="添加友链" :visible.aync="showDialogBox" width="40%" center @close="handleCancelAdd">
        <el-form :model="form" ref="addLinkForm" label-position="right" label-width="100px">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" size="small" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
                <el-input v-model="form.desc" size="small" placeholder="请输入描述"></el-input>
            </el-form-item>
            <el-form-item label="链接" prop="link">
                <el-input v-model="form.link" size="small" placeholder="请输入链接地址"></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="cover">
                <el-input v-model="form.cover" size="small" placeholder="iconfont图标"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="enable">
                <el-switch v-model="form.enable" active-color="#13CE66" inactive-color="#FF4949"></el-switch>
            </el-form-item>
        </el-form>
        <div class="dialog-footer" slot="footer">
            <el-button size="small" @click="handleCancelAdd">取消</el-button>
            <el-button size="small" type="primary" @click="handleConfirmAddLink">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import validator from 'validator'

export default {
    data() {
        return {
            form: {
                name: '',
                desc: '',
                link: '',
                cover: '',
                enable: true
            },
            uploadAction: ''
        }
    },
    props: {
        dialogFormVisible: {
            type: Boolean,
            default: true
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
        handleCancelAdd() {
            this.form = {
                name: '',
                desc: '',
                link: '',
                cover: '',
                enable: true
            }
            this.$emit('add-link', false)
        },
        handleConfirmAddLink() {
            const data = this.form
            this.$emit('create-link', data, this.handleCreatedSuccessCallback)
        },
        handleCreatedSuccessCallback() {
            this.form = {
                name: '',
                desc: '',
                link: '',
                cover: '',
                enable: true
            }

            this.$emit('add-link', false)
        }
    }
}
</script>
