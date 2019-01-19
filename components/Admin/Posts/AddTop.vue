<template>
  <section class="tool-container">
    <div class="left-item">
      <span class="label">文本格式</span>
      <el-radio-group
        v-model="postForm.content_type"
        size="mini"
      >
        <el-radio-button label="M">Markdown</el-radio-button>
      </el-radio-group>
      <span class="label">文章权限</span>
      <el-radio-group
        v-model="postForm.auth"
        size="mini"
      >
        <el-radio-button label="public">公开</el-radio-button>
        <el-radio-button label="secret">私密</el-radio-button>
      </el-radio-group>
      <span class="label">文章来源</span>
      <el-radio-group
        v-model="postForm.source"
        size="mini"
      >
        <el-radio-button label="0">原创</el-radio-button>
        <el-radio-button label="1">转载</el-radio-button>
      </el-radio-group>
      <span class="label">文章状态</span>
      <el-radio-group
        v-model="postForm.state"
        size="mini"
      >
        <el-radio-button label="published">发布</el-radio-button>
        <el-radio-button label="draft">草稿</el-radio-button>
      </el-radio-group>
    </div>
    <div class="right-item">
      <span class="label">是否置顶</span>
      <el-switch
        v-model="postForm.isTop"
        active-color="#13CE66"
        inactive-color="#FF4949"
      ></el-switch>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['postForm'],
    methods: {
      handleSwitchPage() {
        this.$emit('switch-content-type')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tool-container {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    background-color: #FFFFFF;

    .left-item {
      > span.label {
        margin: 0 10px 0 20px;
        line-height: 28px;
        font-weight: bold;
        color: #999999;

        &:first-child {
          margin-left: 10px;
        }
      }
    }
    .right-item {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      > span.label {
        margin: 0 10px 0 20px;
        line-height: 28px;
        font-weight: bold;
        color: #999999;

        &:first-child {
          margin-left: 10px;
        }
      }
    }
  }
</style>





















