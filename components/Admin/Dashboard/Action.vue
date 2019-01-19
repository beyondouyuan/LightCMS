<template>
  <section class="action-container">
    <h2>操作</h2>
    <div class="action-box">
      <el-button
        class="btn"
        v-for="item of actions"
        :key="item.id"
        :type="item.type"
        @click="handleAction(item)"
        size="mini"
      >
        {{item.name}}
      </el-button>
    </div>
  </section>
</template>
<script>
  import siteConf from '~/config/site'

  export default {
    data() {
      return {
        actions: [{
          id: 1,
          name: '添加文章',
          type: 'primary',
          url: `${siteConf.adminPath}/posts/add`
        },{
          id: 2,
          name: '查看用户',
          type: 'success',
          url: `${siteConf.adminPath}/users`
        },{
          id: 3,
          name: '查看分类',
          type: 'info',
          url: `${siteConf.adminPath}/categories`
        },{
          id: 4,
          name: '查看评论',
          type: 'warning',
          url: `${siteConf.adminPath}/comments`
        }]
      }
    },
    methods: {
      handleAction(item) {
        if(!item.url) return false
        this.$router.push(item.url)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .action-container {

    h2 {
      font-size: 16px;
      color: #909399;
    }
  }
  .action-box {
    padding: 30px 0;
    background-color: #FFFFFF;

    .btn {
      border-radius: 0;
    }
  }
</style>























