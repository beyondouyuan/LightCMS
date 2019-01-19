<template>
  <el-dialog
    title="编辑广告"
    :visible.aync="showDialogBox"
    width="40%"
    center
    @close="handleCancelAdd"
  >
    <el-form
      :model="form"
      ref="updateAdvForm"
      label-position="right"
      label-width="100px"
    >
      <el-form-item
        label="标题"
        prop="title"
      >
        <el-input
          v-model="form.title"
          size="small"
          placeholder="请输入广告标题"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="描述"
        prop="desc"
      >
        <el-input
          v-model="form.desc"
          size="small"
          placeholder="请输入广告描述"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="链接"
        prop="link"
      >
        <el-input
          v-model="form.link"
          size="small"
          placeholder="请输入广告链接"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="图片"
        prop="cover"
      >
        <el-upload
          class="upload-box"
          drap
          :action="uploadAction"
          :before-upload="beforeAction"
          :http-request="handleUploadImage"
          :show-file-list="false"
        >
          <template v-if="form.cover">
            <img :src="form.cover">
          </template>
          <template v-else>
            <i class="el-icon-upload"></i>
            <div class="el-upload_text">将文件拖到此处，或<em>点击上传</em></div>
          </template>
        </el-upload>
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
        @click="handleCancelAdd"
      >取消</el-button>
      <el-button
        size="small"
        type="primary"
        @click="handleConfirmUpload"
      >确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import validator from 'validator'
  import API from '~/config/api'
  import {
    log
  } from '~/utils/util'
  const requestCode = 200
  import {
    requestUploadImage
  } from '~/api/admin'
  export default {
    data() {
      return {
        uploadAction: API.uploadImage
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
            title: '',
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
        get: function () {
          return this.dialogFormVisible
        },
        set: function () {

        }
      }
    },
    methods: {
      handleCancelAdd() {
        this.$emit('add-adv', false)
      },
      beforeAction(file) {
        const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
        const isLt1M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$message({
            message: '上传图片只能是JPG、JPEG、GIF或PNG格式!',
            type: 'error'
          })
        }
        if (!isLt1M) {
          this.$message({
            message: '上传图片大小不能超过 1MB!',
            type: 'error'
          })
        }
        return isJPG && isLt1M
      },
      handleUploadImage(content) {
        log(content)
        let formData = new FormData()
        formData.append('advertise', content.file)
        requestUploadImage('advertise', formData)
        .then(res => {
          const {
            code,
            message,
            data
          } = res
          if (code === requestCode) {
            this.$message({
              message: message,
              type: 'success'
            })
            this.form.cover = data
          } else {
            this.$message({
              message: message,
              type: 'error'
            })
          }
        })
      },
      handleConfirmUpload() {
        const data = this.form
        this.$emit('update-adv', data, this.handleUpdateSuccessCallback)
      },
      handleUpdateSuccessCallback() {
        this.$refs['updateAdvForm'].resetFields()
        this.$emit('add-adv', false)
      }
    }
  }
</script>























