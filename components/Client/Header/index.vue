<template>
    <header class="web-header">
        <el-row class="header-container flex-row">
            <el-col :span="18" class="header-left flex-row">
                <nav class="navigation flex-row flex-1 hidden-xs-only">
                    <nuxt-link :class="{'nav-link': true, 'active': current === '首页'}" to="/">首页</nuxt-link>
                    <template v-for="item of menus">
                        <nuxt-link :class="{'nav-link': true, 'active': current === item.name}" v-if="!item.children || item.children.length <= 0" :to="`/category/${item.name}`" :key="item._id">{{ item.name }}</nuxt-link>
                        <el-dropdown v-else :key="item._id">
                            <nuxt-link :class="{'nav-link': true, 'el-dropdown-link': true, 'active': current === item.name}"  :to="`/category/${item.name}`">
                                {{ item.name }}<i class="el-icon-arrow-down el-icon--right"></i>
                            </nuxt-link>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="child of item.children" :key="child._id">
                                    <nuxt-link class="nav-link" :to="`/category/${child.name}`">{{ child.name }}</nuxt-link>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </nav>
            </el-col>
            <el-col :span="6" class="header-right flex-row">
                <el-button type="primary" size="mini" class="btn-write" @click="handleSwitchArticle">写文章</el-button>
                <div v-if="!loginState.hasLogin" class="unloigin-box flex-row">
                    <el-button type="text" class="btn" @click="handleSwitchLogin">登录</el-button>
                    <el-button type="text" class="btn" @click="handleSwitchRegister">注册</el-button>
                </div>
                <div v-else class="login-box flex-row">
                    <el-dropdown>
                        <div class="avatar">
                            <img v-if="loginState.userInfo.avatar" :src="loginState.userInfo.avatar" :alt="loginState.userInfo.nickname">
                            <img v-else src="~/assets/img/avatar.png" :alt="loginState.userInfo.nickname">
                        </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <nuxt-link :to="`/user/${loginState.userInfo.id}`">我的主页</nuxt-link>
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="handleLogout">
                                    <span>退出</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
    </header>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import siteConf from '~/config/site'
import {
    log
} from '~/utils/util'
const requestCode = 200
import {
    requestMembersLogout
} from '~/api/web'
export default {
    data() {
        return {

        }
    },
    props: ['menus', 'loginState', 'current'],
    methods: {
        ...mapActions(['setMemberInfo']),
        handleSwitchLogin() {
            this.$router.push('/login')
        },
        handleSwitchRegister() {
            this.$router.push('/register')
        },
        handleSwitchArticle() {
            this.$router.push('/article')
        },
        handleLogout() {
            requestMembersLogout()
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
                        this.setMemberInfo({})
                        setTimeout(() => {
                            location.href = siteConf.webPath
                        }, 300)
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
<style lang="scss" scoped>
.web-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
    z-index: 100;
    overflow: hidden;
}

.header-container {
    box-sizing: border-box;
    align-items: center;
}

.header-left {
    align-items: center;
}

.header-right {
    position: relative;
    align-items: center;
    justify-content: flex-end;
}

.head-right {
    position: relative;
    align-items: center;
    justify-content: flex-end;
}

.unloigin-box {
    margin-left: 15px;
    align-items: center;
    height: 60px;
}

.navigation {
    margin-left: 20px;

    .nav-link {
        border: none;
        background: none;
        display: block;
        height: 60px;
        line-height: 60px;
        padding: 0 15px;
        font-size: 15px;
        transition: all 0.3s;
        color: #333;

        &:hover {
            color: #409eff;
        }
    }

    .active {
        color: #409eff;
    }
}
.login-box {
  margin-left: 15px;
  height: 60px;
  align-items: center;
  .avatar {
    cursor: pointer;
    height: 28px;
    width: 28px;
    img {
      display: block;
    }
  }
}
</style>
