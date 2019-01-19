<template>
    <section class="post-container">
        <post-add-top @switch-content-type="handleSwitchContentType" :postForm="postForm">
        </post-add-top>
        <section class="editor-container">
            <el-form :model="postForm" ref="addPostForm" label-position="left" label-width="100px">
                <div class="flex-column">
                    <el-form-item label="标题" prop="title">
                        <el-input class="short-title" v-model="postForm.title" size="small" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="副标题" prop="sub_title">
                        <el-input class="short-title" v-model="postForm.sub_title" size="small" placeholder="请输入副标题"></el-input>
                    </el-form-item>
                    <el-form-item label="简介" prop="description">
                        <el-input class="short-title" v-model="postForm.description" type="textarea" row="3" size="small" placeholder="请输入简介"></el-input>
                    </el-form-item>
                </div>
                <div class="flex-row">
                    <el-form-item label="文章分类" prop="categories">
                        <el-cascader class="select" expand-trigger="hover" :options="categoryList" :props="cateProps" placeholder="请选择文章分类" v-model="postForm.categories"></el-cascader>
                    </el-form-item>
                    <el-form-item label="文章标签" prop="tags">
                        <el-select class="select" v-model="postForm.tags" multiple filterable allow-create placeholder="请选择文章标签" @change="handleTagChange">
                            <el-option v-for="item of tagList" :key="item._id" :label="item.name" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <!-- 上传文章图片 -->
                <el-form-item label="配图" prop="cover">
                    <el-upload class="upload-box" drag :action="uploadAction" :before-upload="beforeAction" :http-request="handleUploadImage" :show-file-list="false">
                        <template v-if="postForm.cover">
                            <img :src="postForm.cover">
          </template>
                            <template v-else>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload_text">将文件拖到此处，或<em>点击上传</em></div>
                            </template>
                    </el-upload>
                </el-form-item>
                <markdown-editor :data="postForm"></markdown-editor>
                <div class="form-footer flex-row">
                    <el-button size="small" @click="handleCancel">取消</el-button>
                    <el-button size="small" type="primary" @click="handleConfirmSubmit">保存</el-button>
                </div>
            </el-form>
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
    requestCateList,
    requestTagList,
    requestUploadImage,
    requestSingleArticle,
    updateSingleArticle
} from '~/api/admin'
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
        return 'admin'
    },
    computed: {
      ...mapState([
          'loginState'
        ])
    },
    fetch({ store, params }) {
        const cateStore = {
            cateName: '编辑文章',
            routes: [{
                path: `${siteConf.adminPath}/posts/`,
                title: '文章管理'
            }, {
                path: `${siteConf.adminPath}/posts/:id`,
                title: '编辑文章'
            }]
        }
        store.commit('SET_CATE', cateStore)
    },
    async asyncData({ params }) {
        return {
            postId: params.id
        }
    },
    mounted() {
        this.fetchCategoriesOnCilent()
        this.fetchTagList()
        this.handleFetchPostDetail(this.postId)
    },
    methods: {
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
            requestTagList(params)
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
        handleFetchPostDetail(id) {
          const params = {
            getFrom: 'admin',
            id
          }
          requestSingleArticle(params)
          .then(res => {
            const {
              code,
              message,
              data
            } = res
            if (code === requestCode) {
              if (data.categories.length > 0) {
                let _ids = []
                data.categories.forEach(item => {
                  _ids.push(item._id)
                })
                data.categories = _ids
              }
              if (data.tags.length > 0) {
                let _ids = []
                data.tags.forEach(item => {
                  _ids.push(item._id)
                })
                data.tags = _ids
              }
              this.postForm = data
            }
            console.log(res)
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
        handleUploadImage() {
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
        handleCancel() {
            this.$router.go(-1)
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
                this.$refs['addPostForm'].resetFields()

                setTimeout(() => {
                  this.$router.push(`${siteConf.adminPath}/posts`)
                }, 300)
              }
            const data = {
                ...this.postForm,
                fakemark: 'lightCMS_post_mark_' + Date.now(),
                author: this.loginState.userInfo.id
            }
            updateSingleArticle(data)
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
    padding: 15px 30px;
    background-color: #FFFFFF;

    .flex-column {
        .el-form-item {
            width: 48%;
        }
    }

    .flex-row {
        justify-content: space-between;

        .el-form-item {
            width: 48%;

            .select {
                width: 100%;
            }
        }
    }

    .form-footer {
        padding: 15px 0;
        justify-content: flex-start;

        .btn {
            margin-right: 20px;
        }
    }
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
</style>
