<template>
    <section class="post-container">
        <section class="editor-container">
            <el-row class="container main" type="flex" justify="space-between">
                <el-col :xs="24" :sm="18">
                  <div class="title-box flex-row">
                    <el-input type="text" class="title flex-1" placeholder="输入文章标题..." v-model="postForm.title">
                      <template slot="append">{{ postForm.title.length }}/40</template>
                    </el-input>
                  </div>
                  <div class="sub-title_box flex-row">
                    <el-input type="text" class="title flex-1" placeholder="输入文章副标题..." v-model="postForm.sub_title">
                      <template slot="append">{{ postForm.sub_title.length }}/40</template>
                    </el-input>
                  </div>
                  <div class="desc-box">
                    <el-input type="text" class="desc" placeholder="输入文章简介..." v-model="postForm.description">
                      <template slot="append">{{ postForm.description.length }}/80</template>
                    </el-input>
                  </div>
                  <div class="content-box">
                    <markdown-editor :data="postForm" @insert-image="handleInsertImage"></markdown-editor>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="6" style="background: #fff">
                  <div class="sidebar">
                    <div class="box">
                      <h3>上传封面图</h3>
                      <el-upload
                        class="upload-box"
                        drag
                        :action="uploadAction"
                        :before-upload="beforeAction"
                        :http-request="handleUploadImage"
                        :show-file-list="false"
                        >
                        <template v-if="postForm.cover">
                          <img :src="postForm.cover" alt="">
                        </template>
                        <template v-else>
                          <i class="el-icon-upload"></i>
                          <p class="el-upload__text">JPG、JPEG、GIF或PNG格式</p>
                        </template>
                      </el-upload>
                    </div>
                    <div class="box">
                      <h3>选择分类</h3>
                      <el-cascader
                        class="select"
                        expand-trigger="hover"
                        :options="categoryList"
                        :props="cateProps"
                        placeholder="选择文章分类"
                        v-model="postForm.categories">
                      </el-cascader>
                    </div>
                    <div class="box">
                      <h3>选择标签</h3>
                      <el-select
                        class="select"
                        v-model="postForm.tags"
                        multiple
                        filterable
                        allow-create
                        placeholder="选择或创建标签"
                        @change="handleTagChange">
                        <el-option
                          v-for="item in tagList"
                          :key="item._id"
                          :label="item.name"
                          :value="item._id">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="box flex-row">
                            <el-button class="post-btn" size="small" @click="handleCancelAdd">取消</el-button>
                            <el-button class="post-btn" size="small" type="primary" @click="handleConfirmSubmit">保存</el-button>
                        </div>
                  </div>
                </el-col>

            </el-row>
        </section>
    </section>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex"
import siteConf from '~/config/site'
import API from '~/config/api'
import PostAddTop from '~/components/Admin/Posts/AddTop'
import MarkdownEditor from '~/components/Common/Markdown'
import {
    log,
    arrayToTree
} from '~/utils/util'
const requestCode = 200
import {
    requestMenuList,
    requestTagsList,
    requestUploadImage,
    createSingleArticle
} from '~/api/web'
export default {
    data() {
        return {
            // 文章属性
            postForm: {
                title: '',
                sub_title: '',
                cover: '',
                description: '',
                content: '',
                author: '',
                auth: 'public',
                state: 'published',
                isTop: false,
                source: 0,
                categories: [],
                tags: [],
                content_type: 'M'
            },
            listQuery: {
                mode: 'full'
            },
            categoryList: [],
            // 分类属性
            cateProps: {
                value: '_id',
                label: 'name',
                children: 'children'
            },
            // 标签列表
            tagList: [],
            // 图片上传
            uploadAction: API.uploadImage
        }
    },
    layout(context) {
        return 'edit'
    },
    computed: {
      ...mapState([
          'loginState'
        ])
    },
    fetch({ store, params }) {
        const cateStore = {
            cateName: '新增文章',
            routes: [{
                path: `${siteConf.adminPath}/posts/`,
                title: '文章管理'
            }, {
                path: `${siteConf.adminPath}/posts/add`,
                title: '新增文章'
            }]
        }
        store.commit('SET_CATE', cateStore)
    },
    mounted() {
        this.fetchCategoriesOnCilent()
        this.fetchTagList()
    },
    methods: {
        fetchCategoriesOnCilent() {
            const params = {
                mode: 'simple',
                pageSize: 10
            }
            requestMenuList(params)
                .then(res => {
                    const {
                        code,
                        data: { lastPage, list, page, pageSize, total }
                    } = res
                    if (code === requestCode) {
                        const tree = arrayToTree(list)
                        this.categoryList = tree
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        },
        fetchTagList() {
            const params = {
                ...this.listQuery
            }
            requestTagsList(params)
                .then(res => {
                    const {
                        code,
                        message,
                        data: { lastPage, list, page, pageSize, total }
                    } = res
                    if (code === requestCode) {
                        this.tagList = [...list]
                    }
                })
        },
        handleSwitchContentType() {

        },
        handleTagChange(item) {
            if (item.length > 3) {
                this.$message({
                    message: '每篇文章最多能添加3个标签'
                })
                this.postForm.tags = item.slice(0, 3)
            }
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
        handleInsertImage(data, success) {
            requestUploadImage('cover', data)
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
                        let _url = data
                        success && success(_url)
                    } else {
                        this.$message({
                            message: message,
                            type: 'error'
                        })
                    }
                }).catch(err => {
                    log(err)
                })
        },
        handleUploadImage(content) {
            log(content)
            let formData = new FormData()
            formData.append('cover', content.file)
            requestUploadImage('cover', formData)
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
                        this.postForm.cover = data
                    } else {
                        this.$message({
                            message: message,
                            type: 'error'
                        })
                    }
                })
        },
        handleCancelAdd() {

        },
        handleConfirmSubmit() {
            let success = () => {
                this.postForm = {
                  title: '',
                  sub_title: '',
                  cover: '',
                  description: '',
                  content: '',
                  author: '',
                  auth: 'public',
                  state: 'published',
                  isTop: false,
                  from: 0,
                  categories: [],
                  tags: [],
                  content_type: 'M'
                }
                setTimeout(() => {
                  this.$router.push(`${siteConf.webPath}`)
                }, 300)
              }
            const data = {
                ...this.postForm,
                fakemark: 'lightCMS_post_mark_' + Date.now(),
                author: this.loginState.userInfo.id
            }
            console.log(data)
            createSingleArticle(data)
            .then(res => {
                const {
                    code,
                    message
                } = res
                if (code === requestCode) {
                    this.$notify({
                      title: '成功',
                      message: message,
                      type: 'success'
                    })
                    success && success()
                }
            })
        }
    },
    components: {
        PostAddTop,
        MarkdownEditor
    }
}
</script>
<style lang="scss" scoped>
.editor-container {
    background-color: #FFFFFF;


}

.upload-box {
    width: 100%;
    height: 100%;

    .el-upload {
        width: 100%;
    }

    .el-upload-dragger {
        width: 100% !important;
        height: 145px;
        background-color: #EEEEEE;

        .el-upload__text {
            line-height: 1.8;
        }
    }
}

.sidebar {
  background-color: #fff;
  padding: 0 15px 15px 15px;
  border-left: 1px solid #f8f8f8;
  @media screen and (max-width: 767px) {
    padding-left: 0;
  }
}
.title-box {
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  .title {
    font-size: 28px;
    /deep/ .el-input__inner {
      padding-left: 0;
      border: none;
    }
    /deep/ .el-input-group__append {
      background-color: #fff;
      border: none;
      font-size: 16px;
    }
  }
}
.sub-title_box {
    justify-content: space-between;
      align-items: center;
      padding: 15px;
      background-color: #fff;
      .title {
        font-size: 18px;
        /deep/ .el-input__inner {
          padding-left: 0;
          border: none;
        }
        /deep/ .el-input-group__append {
          background-color: #fff;
          border: none;
          font-size: 14px;
        }
      }
}
.desc-box {
  padding: 0 15px 15px 15px;
  background-color: #fff;
  .desc {
    font-size: 16px;
    /deep/ .el-input__inner {
      padding-left: 0;
      border: none;
    }
    /deep/ .el-input-group__append {
      background-color: #fff;
      border: none;
      font-size: 16px;
    }
  }
}

// 右侧边栏
.box {
  padding: 15px 0 0 0;
  h3 {
    margin: 0 0 15px 0;
    color: #666;
  }
  .upload-box {
    width: 100%;
    height: 100%;
    /deep/ .el-upload {
      width: 100%;
    }
    /deep/ .el-upload-dragger {
      width: 100% !important;
      height: 146px;
      background-color: #f8f8f8;
      border-radius: 0 !important;
      .el-upload__text {
        margin: 0;
        line-height: 1.8;
        color: #999;
      }
    }
  }
  .el-cascader,
  .select {
    width: 100%;
  }
  .post-btn {
    display: block;
    width: 50%;
  }
}
</style>
