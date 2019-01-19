<template>
    <aside class="sidebar-box">
        <section class="hot-banner">
            <profile :memberInfo="memberInfo" :loginState="loginState" @follow-user="handleFollowUser" @unfollow-user="handleUnFollowUser"></profile>
        </section>
        <section class="hot-article">
            <follow :memberInfo="memberInfo" :loginState="loginState"></follow>
        </section>
        <section class="hot-member">
            <fans :memberInfo="memberInfo" :loginState="loginState"></fans>
        </section>
    </aside>
</template>
<script>
import {
    log,
    arrayToTree
} from '~/utils/util'
import { mapGetters, mapState, mapActions } from "vuex"
const requestCode = 200
import {
    requestFollowMember,
    requestUnFollowMember,
    requestMembersBaseInfo
} from '~/api/web'
import Fans from '~/components/Client/Fans'
import Follow from '~/components/Client/Follow'
import Profile from '~/components/Client/Profile'
export default {
    name: 'Sidebar',
    data() {
        return {}
    },
    props: ['memberInfo', 'loginState'],
    components: {
        Fans,
        Follow,
        Profile
    },
    methods: {
        ...mapActions(['setMemberInfo']),
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
        handleUnFollowUser(id) {
            requestUnFollowMember({ id })
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
                        console.log(this.loginState.userInfo.id)
                        console.log(this.loginState.userInfo)
                        this.handleFetchMemberInfoOnClient(this.loginState.userInfo.id)
                    } else {
                        this.$notify({
                            title: '失败',
                            message: message,
                            type: 'error'
                        })
                    }
                })
                .catch(err => {
                    log(err)
                    this.$notify({
                        title: '错误',
                        message: err.message,
                        type: 'danger'
                    })
                })
        },
        handleFollowUser(id) {
            requestFollowMember({ id })
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
                        console.log(this.loginState.userInfo.id)
                        console.log(this.loginState.userInfo)
                      this.handleFetchMemberInfoOnClient(this.loginState.userInfo.id)
                    } else {
                        this.$notify({
                            title: '失败',
                            message: message,
                            type: 'error'
                        })
                    }
                })
                .catch(err => {
                    log(err)
                    this.$notify({
                        title: '错误',
                        message: err.message,
                        type: 'danger'
                    })
                })
        }
    }
}
</script>
