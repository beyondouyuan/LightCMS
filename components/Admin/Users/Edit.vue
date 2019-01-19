<template>
    <el-dialog title="编辑用户" :visible.aync="showDialogBox" width="40%" center @close="handleCancelUpdate">
        <el-form :model="form" ref="updateUserForm" label-position="right" label-width="100px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" disabled size="small" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="form.nickname" size="small" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" size="small" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" size="small" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="enable">
                <el-switch v-model="form.enable" active-color="#13CE66" inactive-color="#FF4949"></el-switch>
            </el-form-item>
            <el-form-item label="用户角色" prop="role">
                <el-select size="small" v-model="form.role" placeholder="请选择用户角色">
                    <el-option v-for="item of roleOptions" :disabled="item.value !== form.role" :key="item.value" :label="item.label" :value="item.value">
                        <span>{{ item.label }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div class="dialog-footer" slot="footer">
            <el-button size="small" @click="handleCancelUpdate">取消</el-button>
            <el-button size="small" type="primary" @click="handleConfirmUpdateUser">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import validator from 'validator'

export default {
    data() {
        return {
            roleOptions: [{
                value: 'admin',
                label: '管理员',
                id: '1'
            }, {
                value: 'member',
                label: '普通会员',
                id: '2'
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
                    _id: '',
                    username: '',
                    email: '',
                    password: '',
                    nickname: '',
                    enable: true,
                    role: 'member'
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
            this.$emit('add-user', false)
        },
        handleConfirmUpdateUser() {
            const data = this.form
            this.$emit('update-user', data, this.handleUpdateSuccessCallback)
        },
        handleUpdateSuccessCallback() {
            this.$refs['updateUserForm'].resetFields()
            this.$emit('add-user', false)
        }
    }
}
</script>
