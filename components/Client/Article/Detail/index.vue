<template>
    <article class="article-detail">
        <header class="header">
            <h2>{{articleDetail.title}}</h2>
            <div class="footer flex-row">
                <nuxt-link :to="`/user/${articleDetail.author._id}`">{{ articleDetail.author.nickname }}</nuxt-link>
                <span v-if="articleDetail.categories.length > 0">{{ articleDetail.categories[articleDetail.categories.length - 1]['name'] }}</span>
                <span>{{ articleDetail.create_time }}</span>
                <span><i class="iconfont">&#xe603;</i>{{ articleDetail.clicksNum }}</span>
                <span><i class="iconfont">&#xe606;</i>{{ articleDetail.likesNum }}</span>
                <span><i class="iconfont">&#xe8f8;</i>{{ articleDetail.collectionsNum }}</span>
            </div>
        </header>
        <div class="cover-box" v-if="articleDetail.cover">
            <img :src="articleDetail.cover" alt="">
        </div>
            <div class="article-content" v-html="articleDetail.content"></div>
            <footer class="article-footer">
                <div class="tag-list" v-if="articleDetail.tags.length > 0">
                    <nuxt-link v-for="(item, index) of articleDetail.tags" :key="index" :to="`/tag/${item.name}`" tag="a" target="_blank">
                        <el-button class="tag-item" type="primary" size="mini">{{ item.name }}</el-button>
                    </nuxt-link>
                </div>
            </footer>
            <div class="action-sheet flex-row">
                <div class="share-box flex-row">
                    <a
              :href="'http://www.baidu.com/'" target="_blank"
              class="share-item flex-column weibo">
              <i class="iconfont">&#xe611;</i>
              <span>分享至微博</span>
            </a>
                    <a
              :href="'http://www.baidu.com/'" target="_blank"
              class="share-item flex-column weixin">
              <i class="iconfont">&#xe605;</i>
              <span>分享至微信</span>
            </a>
                    <a
              :href="'http://www.baidu.com/'" target="_blank"
              class="share-item flex-column twitter">
              <i class="iconfont">&#xe600;</i>
              <span>分享至Twitter</span>
            </a>
                    <a
              :href="'http://www.baidu.com/'" target="_blank"
              class="share-item flex-column facebook">
              <i class="iconfont">&#xe669;</i>
              <span>分享至Facebook</span>
            </a>
                </div>
                <div class="action-item like-box flex-column" @click="handleLike">
                    <span>
                <i class="iconfont">&#xe606;</i>
              </span>
                    <b v-if="articleDetail.hasLiked">已喜欢</b>
                    <b v-else>{{ articleDetail.likesNum }}人喜欢</b>
                </div>
                <div class="action-item collect-box flex-column" @click="handleCollect">
                    <span>
                <i class="iconfont">&#xe8f8;</i>
              </span>
                    <b v-if="articleDetail.hasCollected">已收藏</b>
                    <b v-else>{{ articleDetail.collectionsNum }}人收藏</b>
                </div>
            </div>
    </article>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: ['articleDetail', 'loginState'],
    methods: {
        handleLike() {
            console.log(this.loginState)
            // 判断是否登陆
            if (!this.loginState.hasLogin || !this.loginState.userInfo.id) {
                this.handleShowLogin()
                return false
            }

            // 判断是否已经赞了
            if (this.articleDetail.hasLiked) {
                this.$notify({
                    title: '温馨提示',
                    message: '你已喜欢过啦！',
                    type: 'success'
                })
                return false
            }

            let successCallback = (data) => {
                this.articleDetail.likesNum = data.likesNum
                this.articleDetail.hasLiked = data.hasLiked
            }
            this.$emit('like-post', this.articleDetail._id, successCallback)
        },
        handleCollect() {
            // 判断是否登陆
            if (!this.loginState.hasLogin || !this.loginState.userInfo.id) {
                this.handleShowLogin()
                return false
            }

            // 判断是否已经收藏
            if (this.articleDetail.hasCollected) {
                this.$notify({
                    title: '温馨提示',
                    message: '你已收藏过啦！',
                    type: 'success'
                })
                return false
            }

            let successCallback = (data) => {
                this.articleDetail.collectionsNum = data.collectionsNum
                this.articleDetail.hasCollected = data.hasCollected
            }
            this.$emit('collect-post', this.articleDetail._id, successCallback)
        },
        // 提示登陆注册
        handleShowLogin() {
            this.$confirm('您还未登录，请登录后再进行相关操作', '请登陆', {
                    confirmButtonText: '去登陆',
                    cancelButtonText: '放弃了',
                    type: 'info',
                    center: true
                })
                .then(() => {
                    let fromUrl = '/article/' + this.postData._id
                    this.$router.push('/login?fromUrl=' + fromUrl)
                })
                .catch(() => {})
        }
    }
}
</script>
<style lang="scss">
.article-detail {
    padding: 30px;
    background-color: #fff;

    @media screen and (max-width: 767px) {
        padding: 30px 15px;
        margin-left: -15px;
        margin-right: -15px;
    }
}

.header {
    h1 {
        margin: 0 0 15px 0;
        font-size: 26px;
        color: #3d464d;
    }

    .footer {
        align-items: center;
        color: #999;

        a {
            color: #409eff;
        }

        a,
        span {
            margin-right: 15px;

            i {
                margin-right: 5px;
            }
        }
    }
}

.article-content,
.cover-box {
    margin: 30px 0 0 0;

    img {
        margin: 15px 0;
        transform: scale(1);
        transition: all .5s;
    }

    &:hover {
        img {
            transform: scale(1.05);
        }
    }
}

.cover-box {
    img {
        display: block;
        width: 100%;
        margin: 0 auto;
    }
}

.article-footer {
    text-align: left;

    .tag-list {
        padding: 15px 0;

        .tag-item {
            margin: 0 5px;
            background-color: transparent;
            border-color: #666;
            color: #666;
            border-radius: 20px;
            transition: all .3s;

            &:hover {
                border-color: #409eff;
                color: #409eff;
            }
        }
    }
}

.action-sheet {
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 10px solid #f8f8f8;

    .action-item {
        margin: 0 15px;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        span {
            margin-bottom: 5px;
            display: block;
            width: 30px;
            height: 30px;
            line-height: 30px;
            border-radius: 100%;
            background-color: #409eff;
            color: #fff;
            transition: all .3s;
            opacity: 1;

            &:hover {
                opacity: 0.9;
            }

            i {
                font-size: 16px;
            }
        }

        b {
            font-weight: normal;
            color: #409eff;
        }
    }
}

.share-item {
    margin: 0 15px;
    color: #999;
    transition: all .3s;

    i {
        margin-bottom: 5px;
        font-size: 30px;
    }

    span {
        font-size: 12px;
    }
}

.weibo {
    &:hover {
        color: #d81e06;
    }
}

.weixin {
    &:hover {
        color: #38AE37;
    }
}

.twitter {
    &:hover {
        color: #1296db;
    }
}

.facebook {
    &:hover {
        color: #2D598F;
    }
}
</style>
