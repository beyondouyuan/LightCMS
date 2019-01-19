<template>
  <el-dialog
    title="编辑标签"
    :visible.aync="showDialogBox"
    width="40%"
    center
    @close="handleCancelUpdate"
  >
    <el-form
      :model="form"
      ref="updateTagForm"
      label-position="right"
      label-width="100px"
    >
      <el-form-item
        label="标签名称"
        prop="name"
      >
        <el-input
          v-model="form.name"
          size="small"
          placeholder="请输入标签名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="标签别名"
        prop="alias"
      >
        <el-input
          v-model="form.alias"
          size="small"
          placeholder="请输入标签别名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="图标"
        prop="cover"
      >
        <el-input
          v-model="form.cover"
          size="small"
          placeholder="iconfont图标"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="是否启用"
        prop="enable"
      >
       <el-switch
        v-model="form.enable"
        active-color="#13CE66"
        inactive-color="#FF4949"
       ></el-switch>
      </el-form-item>
    </el-form>
    <div class="dialog-footer" slot="footer">
      <el-button
        size="small"
        @click="handleCancelUpdate"
      >取消</el-button>
      <el-button
        size="small"
        type="primary"
        @click="handleConfirmUpdateTag"
      >确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import validator from 'validator'

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
            name: '',
            alias: '',
            cover: '',
            enable: true
          }
        }
      }
    },
    computed: {
      showDialogBox: {
        get: function () {
          return this.dialogFormVisible
        },
        set: function () {

        }
      }
    },
    methods: {
      handleCancelUpdate() {
        this.form = {
          name: '',
          alias: '',
          cover: '',
          enable: true
        }
        this.$emit('add-tag', false)
      },
      handleConfirmUpdateTag() {
        const data = this.form
        this.$emit('update-tag', data, this.handleUpdateTagSuccessCallback)
      },
      handleUpdateTagSuccessCallback() {
        this.$refs['updateTagForm'].resetFields()
        this.$emit('add-tag', false)
      }
    }
  }
</script>
