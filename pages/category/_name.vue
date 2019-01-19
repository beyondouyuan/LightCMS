<template>
    <section class="container">
        <article-list :articleList="articleList" :cate="cate"></article-list>
    </section>
</template>
<script>
import {
    log,
    arrayToTree
} from '~/utils/util'
import { mapState, mapActions } from 'vuex'
const requestCode = 200
import { requestArticleList } from '~/api/web'
import ArticleList from '@/components/Client/Article/List'
const serverFetchArticleListByCateName = name => {
    const condition = {
        cateName: name,
        page: 1,
        mode: 'normal',
        pageSize: 10
    }
    return requestArticleList(condition)
        .then(res => {
            const {
                code,
                message,
                data: { list }
            } = res
            if (code === requestCode) {
                return list
            }
        })
        .catch(e => {
            return []
        })
}
export default {
    layout(context) {
        return 'web'
    },
    async fetch({ store, params }) {
        const {
            name
        } = params

        store.commit('SET_CURRENT_NAME', name)
    },
    async asyncData({ params }) {
        const [articleList] = await Promise.all([
            serverFetchArticleListByCateName(params.name)
        ])
        return {
            articleList,
            cate: params.name
        }
    },
    head() {
        return {
            title: 'ligtCMS-分类'
        }
    },
    components: {
        ArticleList
    }
}
</script>
