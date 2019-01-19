<template>
    <el-dialog title="更新资料" :visible.sync="showDialog" width="40%" center @close="handleCancelUpdate">
        <el-form :model="form" ref="updateUserForm" label-position="left" label-width="60px">
            <el-form-item label="昵 称" prop="nickname">
                <el-input v-model="form.nickname" size="small" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="签 名" prop="signature">
                <el-input v-model="form.signature" size="small" placeholder="请输入个性签名"></el-input>
            </el-form-item>
            <el-form-item label="性 别" prop="sex">
                <el-radio v-model="form.sex" :label="1">男</el-radio>
                <el-radio v-model="form.sex" :label="2">女</el-radio>
            </el-form-item>
            <el-form-item label="年 龄" prop="age">
                <el-input type="number" v-model="form.age" size="small" placeholder="请输入年龄"></el-input>
            </el-form-item>
            <el-form-item label="省 份" prop="province">
                <el-input type="text" v-model="form.province" size="small" placeholder="请输入省份"></el-input>
            </el-form-item>
            <el-form-item label="城 市" prop="city">
                <el-input type="text" v-model="form.city" size="small" placeholder="请输入城市"></el-input>
            </el-form-item>
            <el-form-item label="地 址" prop="address">
                <el-input type="text" v-model="form.address" size="small" placeholder="请输入地址"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="handleCancelUpdate">取 消</el-button>
            <el-button size="small" type="primary" @click="handleUpdateUserInfo">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {

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
                  nickname: '',
                  signature: '',
                  phone: '',
                  sex: '',
                  age: '',
                  province: '',
                  city: '',
                  address: ''
                }

            }
        }
    },
    computed: {
        showDialog: {
            get: function() {
                return this.dialogFormVisible
            },
            set: function() {}
        }
    },
    methods: {
        handleUpdateUserInfo() {
            const data = {
                ...this.form,
                fakemark: `LightCMS_user_mark_${Date.now()}`
            }
            this.$emit('update-user', data, this.handleUpdateSuccess)
        },
        handleCancelUpdate() {
            this.$emit('edit-profile', false)
        },
        handleUpdateSuccess() {
            this.$refs['updateUserForm'].resetFields()
            this.$emit('edit-profile', false)
        }
    }
}
</script>
