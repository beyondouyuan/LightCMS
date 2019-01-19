<template>
  <header class="admin-header">
    <el-row>
      <el-col :span="24" class="header-right">
        <span
          class="btn-collapse"
          @click="handleAppMenu"
          :style="{'margin-left': spanPosition + 'px'}"
          >
          <i class="iconfont">&#xe601;</i>
        </span>
        <div class="box">
          <div
            class="avatar"
            @click="handleTogglePanel"
            v-click-outside="handleClickMenu"
            >
            <img src="https://beyondouyuan.github.io/img/ouyuan.jpg">
            <span>beyondouyuan</span>
          </div>
        </div>
        <transition name="fade">
          <el-card
            v-show="showPanel"
            class="panel"
            :body-style="{padding: '0px'}"
            >
              <img src="https://beyondouyuan.github.io/img/ouyuan.jpg">
              <h2>{{loginState.userInfo.nickname}}</h2>
              <p>{{ loginState.userInfo.role === 'superAdmin' ? '超级管理员' : loginState.userInfo.role === 'admin' ? '管理员' : '会员' }}</p>
              <div class="footer">
                <el-button type="text" class="button" @click="handlePrivewFrontEnd">前台</el-button>
                <el-button type="text" class="button" @click="handleLogout">登出</el-button>
              </div>
          </el-card>
        </transition>
      </el-col>
    </el-row>
  </header>
</template>
<script>
  import siteConf from '~/config/site'
  import {
    log
  } from '~/utils/util'
  const requestCode = 200
  import {
      requestUserLogout
  } from '~/api/admin'
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        showPanel: false
      }
    },
    props: ['spanPosition', 'loginState'],
    methods: {
      ...mapActions(['setLogoutStateAction']),
      handleTogglePanel() {
        this.showPanel = !this.showPanel
      },
      handleClickMenu() {
        if (this.showPanel) {
          this.showPanel = false
        }
      },
      handleAppMenu() {
        this.$emit('toggle-appmenu')
      },
      handleLogout() {
        requestUserLogout()
        .then(res => {
          // 最好手动清除vuex状态，否则刷新页面也可以触发nuxtServerInit清除vuex
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
            this.setLogoutStateAction()
            setTimeout(() => {
                location.href = `${siteConf.webPath}`
            }, 300)
          } else {
            this.$notify({
              title: '失败',
              message: message,
              type: 'error'
            })
          }
        })
      },
      handlePrivewFrontEnd() {
        location.href = '/'
      }
    }
  }
</script>
<style lang="scss" scoped>
  .admin-header {
    padding: 0 15px;
    background-color: #FFFFFF;
  }
  .logo,
  .welcome {
    margin: 0;
    line-height: 50px;
    color: #409EFF;
  }
  .header-right {
    position: relative;
    display: flex;
    justify-content: space-between;

    .btn-collapse {
      display: block;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      cursor: pointer;
      transition: all .5s;

      &:hover {
        color: #409EFF
      }

      i {
        font-size: 20px;
      }
    }
  }
  .box {
    display: flex;
    justify-content: flex-end;
    height: 50px;
    color: #409EFF;


    i {
      position: relative;
      display: block;
      width: 40px;
      line-height: 50px;
      font-size: 18px;
      text-align: center;
      transition: all .3s;
      cursor: pointer;

      span {
        display: block;
        position: absolute;
        right: 6px;
        top: 14px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #FF0000;
      }

      &:hover {
        background-color: #F8F8F8;
      }
    }
  }
  .avatar {
    display: flex;
    align-content: center;
    padding: 0 10px;
    transition: all .3s;
    cursor: pointer;

    &:hover {
      background-color: #F8F8F8;
    }

    > img {
      display: block;
      width: 30px;
      height: 30px;
      margin-top: 10px;
      border-radius: 50%;
    }

    > span {
      display: block;
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
      margin-left: 5px;
    }
  }
  .panel {
    position: absolute;
    top: 55px;
    right: 0;
    width: 150px;
    z-index: 10;

    img {
      display: block;
      width: 50px;
      height: 50px;
      margin: 20px auto;
      border-radius: 50%;
    }

    h2 {
      margin: 20px 0;
      text-align: center;
    }

    p {
      text-align: center;
    }

    div.footer {
      display: flex;
      justify-content: space-around;
      background-color: #F8F8F8;
    }
  }
</style>

























