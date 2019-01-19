<template>
	<section class="dashboard">
   <admin-action></admin-action>
   <admin-statistics :preview="preview"></admin-statistics>
   <admin-system></admin-system>
  </section>
</template>
<script>
  import siteConf from '~/config/site'
  import AdminAction from '~/components/Admin/Dashboard/Action'
  import AdminStatistics from '~/components/Admin/Dashboard/Statistics'
  import AdminSystem from '~/components/Admin/Dashboard/System'
  import {
    log,
    arrayToTree
  } from '~/utils/util'
  const requestCode = 200
  import {
      requestDataPreview
  } from '~/api/admin'
  export default {
    data() {
      return {
        preview: {}
      }
    },
    layout(context) {
      return 'admin'
    },
    fetch ({ store, params }) {
      const cateStore = {
        cateName: '仪表盘',
        routes: [{
          path: siteConf.adminPath,
          title: '首页'
        }, {
          path: siteConf.adminPath,
          title: '仪表盘'
        }]
      }
      store.commit('SET_CATE', cateStore)
    },
    mounted() {
      this.handleFetchDataPreview()
    },
    methods: {
      handleToggleAppMenu() {

      },
      handleFetchDataPreview() {
        requestDataPreview()
        .then(res => {
          const {
            code,
            message,
            data
          } = res
          if (code === requestCode) {
            this.preview = data
            console.log(this.preview)
          }
        })
      }
    },
    components: {
      AdminAction,
      AdminStatistics,
      AdminSystem
    }
  }
</script>
