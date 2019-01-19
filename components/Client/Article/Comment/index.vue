<template>
    <section class="comment-container">
        <template v-if="show">
            <h2>发表评论</h2>
            <div class="comment-post">
                <el-input type="textarea" :rows="5" :placeholder="loginState.hasLogin ? '请输入评论内容' : '登陆后才能评论...'" v-model="form.content">
                </el-input>
                <div class="footer flex-row">
                    <p v-if="!loginState.hasLogin">
                        <nuxt-link :to="'/login'">登陆</nuxt-link>后发表评论
                    </p>
                    <p v-else>{{ form.content.length }}/200</p>
                    <el-button class="btn-submit" type="primary" size="small" @click="handlePostComment('')">发表</el-button>
                </div>
            </div>
        </template>
        <h2>评论列表
          <span v-if="commentList.length > 0">（{{ commentList.length }}条）</span>
        </h2>
        <div class="comment-list">
            <template v-if="commentList.length > 0">
                <div class="comment-item flex-row" v-for="(item, index) of commentList" :key="index">
                    <div class="avatar-box">
                        <img v-if="item.owner.avatar" :src="item.owner.avatar" :alt="item.owner.nickname">
                        <img v-else src="~/assets/img/avatar.png" :alt="item.owner.nickname">
                </div>
                        <div class="comment-content flex-1">
                            <div class="comment-header flex-row">
                                <div class="flex-row" style="align-items: center">
                                    <nuxt-link :to="`/user/${item.owner._id}`">{{ item.owner.nickname }}</nuxt-link>
                                    <template v-if="item.replyer">
                                        <span>回复</span>
                                        <nuxt-link :to="`/user/${item.replyer._id}`">{{ item.replyer.nickname }}</nuxt-link>
                                    </template>
                                    <i>{{ item.create_time }}</i>
                                </div>
                                <el-button v-if="!item.showReplyBox" class="btn-reply" type="text" size="mini" @click="showReplyBox(index, true)">回复</el-button>
                                <el-button v-else class="btn-reply" type="text" size="mini" @click="showReplyBox(index, false)">取消回复</el-button>
                            </div>
                            <div class="comment-body">
                                <p>{{ item.content }}</p>
                                <!-- 回复评论框 -->
                                <div class="reply-box" v-if="item.showReplyBox">
                                    <h3 class="flex-row"><span>回复 {{ item.owner.nickname }}</span></h3>
                                    <div class="comment-post">
                                        <el-input type="textarea" :rows="5" :placeholder="loginState.hasLogin ? '请输入评论内容' : '登陆后才能评论...'" v-model="form.content">
                                        </el-input>
                                        <div class="footer flex-row">
                                            <p v-if="!loginState.hasLogin">
                                                <nuxt-link :to="'/login'">登陆</nuxt-link>后发表评论
                                            </p>
                                            <p v-else>{{ form.content.length }}/200</p>
                                            <el-button class="btn-submit" type="primary" size="small" @click="handlePostComment(item.owner._id)">发表</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </template>
            <template v-else>
                <p>还没有评论，快来做第一个评论的人吧</p>
            </template>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            show: true,
            form: {
                content: '',
                owner: '',
                replyer: ''
            },
            // 是否显示主评论框
            submiting: false
        }
    },
    props: ['loginState', 'commentList', 'postId'],
    methods: {
        handlePostComment(replyId) {
            // 判断是否登陆
            if (!this.loginState.hasLogin || !this.loginState.userInfo.id) {
                this.handleShowLogin()
                return false
            }
            // 判断是否有值
            if (this.form.content.length <= 0 || this.form.content.length > 200) {
                return false
            }

            // 是否正在提交
            if (this.submiting) return false
            this.submiting = true

            // 回调函数
            let successCallback = () => {
                this.form.content = ''
                this.form.replyer = ''
                this.submiting = false
            }
            let failedCallback = () => {
                this.submiting = false
            }

            this.form.owner = this.loginState.userInfo.id
            this.form.replyer = replyId || ''
            this.form.post = this.postId
            console.log(this.form)
            this.$emit('post-comment', this.form, successCallback, failedCallback)
        },
        // 点击回复显示回复输入框
        showReplyBox(index, show) {
            this.form = {
                content: '',
                owner: '',
                replyer: ''
            }
            this.$emit('toggle-replybox', index, show)
            if (!show) {
                this.showCommentBox = true
            } else {
                this.showCommentBox = false
            }
        },
        handleShowLogin() {
            this.$confirm('您还未登录，请登录后再进行相关操作', '请登陆', {
                    confirmButtonText: '去登陆',
                    cancelButtonText: '放弃了',
                    type: 'info',
                    center: true
                })
                .then(() => {
                    let fromUrl = '/post/' + this.postId
                    this.$router.push('/signin?fromUrl=' + fromUrl)
                })
                .catch(() => {})
        }
    }
}
</script>
<style lang="scss" scoped>
.comment-container {
    padding: 0 30px 30px 30px;
    background-color: #fff;

    h2 {
        margin: 0 0 15px;
        font-size: 18px;
        font-weight: normal;
        color: #666;
    }
}

.comment-post {
    margin-bottom: 15px;

    .footer {
        height: 50px;
        justify-content: space-between;
        align-items: center;

        p {
            margin: 0;
        }
    }
}

.comment-list {
    border-top: 1px solid #f8f8f8;
}

.comment-item {
    padding: 15px;
    justify-content: space-between;
    border-bottom: 1px solid #f8f8f8;
    transition: all 0.3s;

    &:hover {
        background-color: #f8f8f8;
    }

    .avatar-box {
        margin-right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        overflow: hidden;

        img {
            display: block;
            width: 50px;
            height: 50px;
        }
    }
}

.comment-content {
  align-items: center;
  justify-content: space-between;
  color: #999;
  span {
    margin: 0 10px;
  }
  i {
    margin-left: 10px;
    font-style: normal;
  }
  a {
    color: #409eff;
  }
}
.comment-body {
  padding: 15px 0 0 0;
  p {
    margin: 0;
    font-size: 16px;
    color: #666;
  }
}

.comment-header {
    align-items: center;
    justify-content: space-between;
    color: #999;

    span {
        margin: 0 10px;
    }

    i {
        margin-left: 10px;
        font-style: normal;
    }

    a {
        color: #409eff;
    }
}

.comment-body {
    padding: 15px 0 0 0;

    p {
        margin: 0;
        font-size: 16px;
        color: #666;
    }
}

.btn-reply {
    cursor: pointer;
}

.reply-box {
    padding-top: 15px;

    h3 {
        align-items: center;
        margin: 0 0 5px 0;
        color: #666;
        font-size: 16px;
        font-weight: normal;

        span {
            margin-right: 10px;
        }
    }

    .comment-post {
        margin-bottom: 0;

        .footer {
            p {
                font-size: 14px;
            }
        }
    }
}
</style>
