<template>
  <div class="page-title">
    <h1>{{cate.cateName}}</h1>
    <el-breadcrumb separator="/" class="page-title_bread">
      <el-breadcrumb-item
        v-if="cate.routes.length > 0"
        v-for="(item, index) of cate.routes"
        :key="index"
        :to="{path: item.path}"
      >
        {{item.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
  import siteConf from '~/config/site'

  export default {
    props: {
      cate: {
        type: Object,
        default: () => {
          return {
            cateName: '仪表盘',
            routes: [
              {
                path: siteConf.adminPath,
                title: '首页'
              }, {
                path: '',
                title: '仪表盘'
              }
            ]
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .page-title {
    display: flex;
    justify-content: space-between;
    line-height: 50px;
    border-bottom: 1px solid #DDDDDD;
    h1 {
      margin: 0;
      height: 50px;
      font-size: 18px;
      color: #475669
    }
  }
  .page-title_bread {
    display: flex;
    align-items: center;
  }
</style>



