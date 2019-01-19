<template>
    <section>
        <base-info :loginState="loginState" :memberInfo="memberInfo" @edit-profile="handleToggleUpdateDialog" @update-avatar="handleUpdateAvatar"></base-info>
        <article-tab :articleList="articleList"></article-tab>
        <update-info :form="memberInfo" :dialogFormVisible="dialogFormVisible" @edit-profile="handleToggleUpdateDialog" @update-user="handleUpdateUserInfo"></update-info>
    </section>
</template>
<script>
import siteConf from '~/config/site'
import API from '~/config/api'
import ArticleTab from '@/components/Client/Article/Tab'
import BaseInfo from '@/components/Client/BaseInfo'
import UpdateInfo from '@/components/Client/UpdateInfo'
import {
    log
} from '~/utils/util'
const requestCode = 200
import {
    requestMembersBaseInfo,
    requestArticleList,
    requestUpdateMemberProfile,
    requestUpdateMemberAvatar
} from '~/api/web'
import { mapGetters, mapState, mapActions } from "vuex"
const serverFetchMemberData = id => {
    const condition = {
        id
    }
    return requestMembersBaseInfo(condition)
        .then(res => {
            const {
                code,
                message,
                data
            } = res
            if (code === requestCode) {
                return data
            }
        })
        .catch(e => {
            return {}
        })
}
// 个人文章
const serverFetchMemberArticleList = userId => {
    const condition = {
        mode: 'normal',
        user: userId,
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
    data() {
        return {
            dialogFormVisible: false,
            uploadAction: API.webUploadImage
        }
    },
    layout(context) {
        return 'user'
    },
    async fetch({ store, params }) {
        const [memberInfo] = await Promise.all([
            serverFetchMemberData(params.id)
        ])
        store.commit('SET_MEMBER_INFO', memberInfo)
    },
    async asyncData({ params }) {
        const [memberArticleList] = await Promise.all([
            serverFetchMemberArticleList(params.id)
        ])
        return {
            articleList: memberArticleList,
            userId: params.id
        }
    },
    head() {
        return {
            title: `${this.loginState.userInfo.username}-个人中心`
        }
    },
    computed: mapState(['loginState', 'memberInfo']),
    methods: {
        ...mapActions(['setMemberInfo']),
        handleToggleUpdateDialog(show) {
            this.dialogFormVisible = show
        },
        handleUpdateUserInfo(data, success) {
            requestUpdateMemberProfile(data)
                .then(res => {
                    const {
                        code,
                        message
                    } = res
                    if (code === requestCode) {
                        this.$message({
                            type: 'success',
                            message: message
                        })
                        success && success()
                        this.handleFetchMemberInfoOnClient(this.userId)
                    } else {
                        this.$message({
                            type: 'error',
                            message: message
                        })
                        success && success()
                    }
                })
        },
        handleUpdateAvatar(data) {
            requestUpdateMemberAvatar(data)
                .then(res => {
                    const {
                        code,
                        message
                    } = res
                    if (code === requestCode) {
                        this.$message({
                            message: message,
                            type: 'success'
                        })
                        this.handleFetchMemberInfoOnClient(this.userId)
                    } else {
                        this.$message({
                            message: message,
                            type: 'error'
                        })
                    }
                })
        },
        handleFetchMemberInfoOnClient(userId) {
            requestMembersBaseInfo({id: userId})
                .then(res => {
                    const {
                        code,
                        message,
                        data
                    } = res
                    if (code === requestCode) {
                        this.setMemberInfo(data)
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        },
    },
    components: {
        ArticleTab,
        BaseInfo,
        UpdateInfo
    }
}
</script>
