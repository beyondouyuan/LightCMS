<template>
    <section class="article-tab_container flex-column">
        <div class="tab-header flex-row">
            <h1>{{ cate }} <span v-if="isTag">相关的文章</span></h1>
        </div>
        <div class="tab-body">
            <div class="article-list">
                <div class="article-item flex-row" v-for="item of articleList" :key="item._id">
                    <div class="article-poster">
                        <nuxt-link :to="`/article/${item._id}`" tag="a" target="_blank">
                            <img  v-if="!item.cover" src="~/assets/img/place.png" :alt="item.title">
                            <img  v-else :src="item.cover" :alt="item.title">
                        </nuxt-link>
                    </div>
                    <div class="article-preview flex-column flex-1">
                        <h2>
                        <nuxt-link tag="a" target="_blank" :to="`/article/${item._id}`">{{ item.title }}</nuxt-link>
                      </h2>
                        <div class="article-description">{{ item.description }}</div>
                        <div class="footer-list flex-row">
                            <nuxt-link tag="a" target="_blank" :to="'/user/' + item.author._id" class="author-box flex-row hidden-xs-only">
                                <img v-if="!item.author.avatar" src="~/assets/img/avatar.png" alt="">
                                <img v-else :src="item.author.avatar" :alt="item.author.nickname">
                                <span>{{ item.author.nickname }}</span>
                            </nuxt-link>
                            <div class="action-box">
                                <span>{{ item.create_time }}</span>
                                <span><i class="iconfont">&#xe603;</i>{{ item.clicksNum }}</span>
                                <span><i class="iconfont">&#xe606;</i>{{ item.likesNum }}</span>
                                <span><i class="iconfont">&#xe8f8;</i>{{ item.collectionsNum }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'ArticleList',
    props: {
        cate: {
            type: String,
            default: '最新文章'
        },
        articleList: {
            type: Array,
            default: () => []
        },
        isTag: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style lang="scss" scoped>
.article-tab_container {
    padding: 0 15px;
    box-sizing: border-box;
    background-color: #FFFFFF;
}

.tab-header {
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #f8f8f8;
    // background-color: #FFFFFF;
    .tab-item {
        margin-right: 20px;
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        font-size: 16px;
        color: #666;
    }

    .active {
        color: #409eff;
        font-weight: bold;
        border-bottom: 2px solid #409eff;
    }
}

.article-list {
    .article-item {
        justify-content: space-between;
        padding: 20px 0;
        border-bottom: 1px solid #f8f8f8;
        transition: all .3s;
        // margin-bottom: 20px;
        // background-color: #FFFFFF;

        @media screen and (max-width: 767px) {
          flex-direction: column;
        }
        &:hover{
          background-color: #fafafa;
        }
    }
}

.article-poster {
    margin-right: 20px;
    width: 245px;
    overflow: hidden;

    &:hover {
        img {
            transform: scale(1.05);
        }
    }

    img {
        display: block;
        width: 100%;
        height: 153px;
        transform: scale(1);
        transition: all .5s;
    }

    @media screen and (max-width: 767px) {
        margin-bottom: 10px;
        width: 100%;
        margin-right: 0;
    }
}

.article-preview {
    justify-content: space-between;
    overflow: hidden;

    h2 {
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        transition: all .3s;

        &:hover {
            color: #409eff;

            a {
                color: #409eff;
            }
        }

        a {
            transition: all .3s;
            font-size: 20px;
            color: #333;
        }
    }

    .article-description {
        margin: 10px 0;
        line-height: 1.8;
        color: #666;
        overflow: hidden;
        line-height: 1.4em;
        height: 4.2em;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        &::after {
            content: "...";
            font-weight: bold;
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 0 20px 1px 45px;

        }
    }

    .footer-list {
        justify-content: flex-start;
        height: 30px;
        line-height: 30px;
        color: #999;
    }
}

.author-box {
    margin-right: 30px;

    span {
        color: #999;
    }

    img {
        margin-right: 10px;
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 100%;
    }
}

.action-box {
    span {
        margin-right: 15px;

        i {
            margin-right: 5px;
        }
    }
}
</style>
