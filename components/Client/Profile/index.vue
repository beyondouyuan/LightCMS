<template>
  <section class="profile">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>{{ memberInfo.nickname }}</span>
        <template v-if="loginState.userInfo.id !== memberInfo._id">
          <el-button @click="handleFollow(memberInfo._id)" v-if="!memberInfo.hasFollow" style="float: right; padding: 3px 0" type="text">关注</el-button>
          <el-button @click="handleUnFollow(memberInfo._id)" v-else style="float: right; padding: 3px 0" type="text">取消关注</el-button>
        </template>
      </div>
      <div class="item flex-row">
        <span>发文：{{ memberInfo.postsNum }}</span>
        <span>粉丝：{{ memberInfo.fansNum }}</span>
        <span>关注：{{ memberInfo.followsNum }}</span>
      </div>
      <div class="item" v-if="memberInfo.email">邮箱：{{ memberInfo.email }}</div>
      <div class="item" v-if="memberInfo.phone">手机：{{ memberInfo.phone }}</div>
      <div class="item"><span>性别：{{ memberInfo.sex == 1 ? '男' : '女' }}</span></div>
      <div class="item"><span>年龄：{{ memberInfo.age }}岁</span></div>
      <div class="item"><span>省份：{{ memberInfo.province ? memberInfo.province : '未填写' }}</span></div>
      <div class="item"><span>城市：{{ memberInfo.city ? memberInfo.city : '未填写' }}</span></div>
      <div class="item" v-if="memberInfo.address"><span>地址：{{ memberInfo.address }}</span></div>
    </el-card>
  </section>
</template>

<script>
  export default {
    props: ['memberInfo', 'loginState'],
    methods: {
      // 关注
      handleFollow(id) {
        // 判断是否登陆
        if (!this.loginState.hasLogin || !this.loginState.userInfo.id) {
          this.handleShowLogin()
          return false
        }
        this.$emit('follow-user', id)
      },
      // 取消关注
      handleUnFollow(id) {
        // 判断是否登陆
        if (!this.loginState.hasLogin || !this.loginState.userInfo.id) {
          this.handleShowLogin()
          return false
        }
        this.$emit('unfollow-user', id)
      },

      // 提示登陆注册
      handleShowLogin() {
        this.$confirm('您还未登录，请登录后再进行相关操作', '请登陆', {
          confirmButtonText: '去登陆',
          cancelButtonText: '放弃了',
          type: 'info',
          center: true
        })
          .then(() => {
            let fromUrl = '/user/' + this.memberInfo._id
            this.$router.push('/login?fromUrl=' + fromUrl)
          })
          .catch(() => {})
      }
    }
  }
</script>

<style lang="scss" scoped>
.profile{
  margin-bottom: 20px;
}
.box-card{
  border: none;
  border-radius: none;
  .item{
    padding: 6px 0;
    align-items: 'center';
    justify-content: space-between;
  }
}
</style>
