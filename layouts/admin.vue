<template>
  <section class="admin-container">
    <admin-header
      :spanPosition="menuSetting.btnPosition"
      :loginState="loginState"
      @toggle-appmenu="handleToggleAppMenu"
    >
    </admin-header>
    <section class="admin-main_content">
      <admin-menu
        :isCollapse="menuSetting.isCollapse"
      >
      </admin-menu>
      <main class="admin-main_wrapper">
        <admin-page-title :cate="cateStore"></admin-page-title>
        <nuxt />
      </main>
    </section>
    <admin-footer></admin-footer>
  </section>
</template>
<script>
  import { mapGetters, mapState, mapActions } from "vuex"
  import siteConf from '~/config/site'

  import AdminHeader from '~/components/Admin/Header/AdminHeader'
  import AdminFooter from '~/components/Admin/Footer/AdminFooter'
  import AdminMenu from '~/components/Admin/Menu/AdminMenu'
  import AdminPageTitle from '~/components/Admin/Page/AdminPageTitle'

  export default {
    data() {
      return {
        menuSetting: {
          btnPosition: 145,
          isCollapse: false
        }
      }
    },
    middleware: ['auth', 'cookies'],
    computed: {
      ...mapGetters([
          'cateStore'
        ]),
      ...mapState([
          'loginState'
        ])
    },
    methods: {
      handleToggleAppMenu() {
        this.menuSetting.isCollapse = !this.menuSetting.isCollapse
        if (this.menuSetting.isCollapse) {
          this.menuSetting.btnPosition = 50
        } else {
          this.menuSetting.btnPosition = 145
        }
      }
    },
    mounted() {
      console.log(this.loginState)
    },
    // middleware: ['auth'],
    components: {
      AdminHeader,
      AdminFooter,
      AdminMenu,
      AdminPageTitle
    }
  }
</script>

