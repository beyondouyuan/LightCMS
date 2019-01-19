<template>
  <section class="system-container">
    <div class="system-wrapper">
      <div class="box">
        <h3>系统信息</h3>
        <ul>
          <li>当前版本：LightCMS v1.0</li>
          <li>应用名称：小楼内容管理系统</li>
          <li>后台技术：Express/MongoDB</li>
          <li>前台技术：Vue/Nuxt/Vuex</li>
        </ul>
      </div>
      <div class="box">
        <h3>技术支持</h3>
        <ul>
          <li>博客：<a href="https:beyondouyuan.github.io">小楼昨夜前端雨</a></li>
          <li>邮箱：beyondouyuan@gmail.com</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .system-container {
    margin-top: 30px;
  }
  .system-wrapper {
    display: flex;
    background-color: #FFFFFF;

    .box {
      width: 50%;
      box-sizing: border-box;
      padding: 15px;

      h3 {
        margin: 0;
        font-size: 14px;
        color: #999999;
      }

      ul {
        margin-top: 10px;

        li {
          border-bottom: 1px dashed #F8F8F8;
          line-height: 40px;
        }
      }
    }
  }
</style>
