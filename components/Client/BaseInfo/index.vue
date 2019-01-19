<template>
    <section class="user-head flex-column" :style="backgroundAvatar">
        <div class="avatar">
          <template v-if="loginState.hasLogin && loginState.userInfo.id === memberInfo._id">
                <el-upload
                  class="upload-box"
                  :action="uploadAction"
                  :before-upload="beforeAction"
                  :http-request="handleUploadImage"
                  :show-file-list="false"
                >
                  <img v-if="!memberInfo.avatar" src="~assets/img/avatar.png" :alt="memberInfo.nickname">
                    <img v-else :src="memberInfo.avatar" :alt="memberInfo.nickname">
                </el-upload>

          </template>
          <template v-else>
            <img v-if="!memberInfo.avatar" src="~assets/img/avatar.png" :alt="memberInfo.nickname">
            <img v-else :src="memberInfo.avatar" :alt="memberInfo.nickname">
          </template>
        </div>
        <div class="info">
            <h1>{{ memberInfo.nickname }}</h1>
            <p>{{ memberInfo.signature ? memberInfo.signature : '该用户还没有个性签名' }}</p>
        </div>
        <i v-if="loginState.hasLogin && loginState.userInfo.id === memberInfo._id" class="icon el-icon-setting" @click="handleUpdateProfile"></i>
    </section>
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
} from '~/api/web'
export default {
    data() {
        return {
            backgroundAvatar: {
                backgroundImage: 'url(' + require('~/assets/img/userbg.jpeg') + ')'
            }
        }
    },
    props: {
        memberInfo: {
            type: Object,
            default: function() {
                return {
                    _id: '',
                    username: '',
                    nickname: '',
                    avatar: '',
                    signature: ''
                }
            }
        },
        uploadAction: {
            type: String,
            default: ''
        },
        loginState: {
            type: Object,
            default: function() {
                return {
                    hasLogin: false,
                    userInfo: {
                        _id: ''
                    }
                }
            }
        }
    },
    methods: {
      handleUpdateProfile() {
        this.$emit('edit-profile', true)
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
        formData.append('avatar', content.file)
        requestUploadImage('avatar', formData)
        .then(res => {
          const {
            code,
            message,
            data
          } = res
          if (code === requestCode) {
            const consdition = {
              _id: this.memberInfo._id,
              avatar: data
            }
            this.$emit('update-avatar', consdition)
          } else {
            this.$message({
              message: message,
              type: 'error'
            })
          }
        })
      },
    }
}
</script>
<style lang="scss" scoped>
.user-head {
    position: relative;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    background-color: #fff;
    background-size: cover;
    background-position: center;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    overflow: hidden;

    /deep/ .el-upload {
        display: block !important;
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
    }
}

.info {
    text-align: center;

    h1 {
        margin: 15px;
        color: #fff;
        font-size: 22px;
    }

    p {
        margin: 0;
        color: #fff;
        font-size: 14px;
    }
}

.icon {
    display: block;
    position: absolute;
    right: 15px;
    top: 15px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
}
</style>
