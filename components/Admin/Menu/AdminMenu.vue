<template>
  <aside
    class="admin-menu"
    :style="{'width': isCollapse ? '65px' : '160px'}"
    >
      <div class="menu-top_box">
        <h1 v-if="!isCollapse">LightCMS</h1>
        <h1 v-else>M</h1>
      </div>
      <el-menu
        :defaul-active="activeIndex"
        class="el-menu-vertical-demo"
        background-color="#1F2D3D"
        text-color="#FFFFFF"
        active-text-color="#409EFF"
        :router="true"
        @open="handleOpen"
        @close="handleClosee"
        :collapse="isCollapse"
      >
        <el-menu-item :index="routePath">
          <i class="iconfont">&#xe61a;</i>
          <span slot="title">仪表盘</span>
        </el-menu-item>
        <el-menu-item :index="routePath + '/users'">
          <i class="iconfont">&#xe602;</i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item :index="routePath + '/posts'">
          <i class="iconfont">&#xe67d;</i>
          <span slot="title">文章管理</span>
        </el-menu-item>
        <el-menu-item :index="routePath + '/categories'">
          <i class="iconfont">&#xe601;</i>
          <span slot="title">分类管理</span>
        </el-menu-item>
        <el-menu-item :index="routePath + '/comments'">
          <i class="iconfont">&#xe69a;</i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item :index="routePath + '/tags'">
          <i class="iconfont">&#xe6a4;</i>
          <span slot="title">标签管理</span>
        </el-menu-item>
        <el-menu-item :index="routePath + '/adv'">
          <i class="iconfont">&#xe674;</i>
          <span slot="title">广告管理</span>
        </el-menu-item>
        <el-menu-item :index="routePath + '/links'">
          <i class="iconfont">&#xe636;</i>
          <span slot="title">链接管理</span>
        </el-menu-item>
        <!-- <el-submenu :index="routepath + '/system'">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item :index="routePath">
            站点设置
          </el-menu-item>
          <el-menu-item :index="routePath">
            banner管理
          </el-menu-item>
        </el-submenu> -->
      </el-menu>
    </aside>
</template>
<script>
  import siteConf from '~/config/site'

  export default {
    data() {
      return {
        routePath: siteConf.adminPath
      }
    },
    props: {
      activeIndex: {
        type: String,
        default: siteConf.adminPath
      },
      isCollapse: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClosee(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .admin-menu {
    margin-top: -50px;
    margin-bottom: -50px;
    min-height: 100%;
    border-right: 1px solid #E6E6E6;
    overflow-x: hidden;
    overflow-y: scroll;
    transition: all .5s;
    background-color: #1F2D3D;

    i {
      margin-right: 4px;
      font-size: 18px;
      color: #FFFFFF;
    }

    .el-menu {
      border-right: none;
      .el-menu-item.is-active {
        color: rgb(255, 200, 75)
      }
    }
  }
  .menu-top_box {
    height: 100px;
    line-height: 100px;
    background-color: #1F2D3D;

    h1 {
      margin: 0;
      font-size: 24px;
      color: #FFFFFF;
      text-align: center;
    }
  }
</style>

