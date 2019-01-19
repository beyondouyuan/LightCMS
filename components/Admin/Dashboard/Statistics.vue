<template>
  <section class="preview-container">
    <h2>数据统计</h2>
    <el-row
      class="preview-wrapper"
      type="flex"
      justify="space-between"
    >
      <el-col :span="5">
        <div class="box">
          <div>
            <p>用户统计</p>
            <h3 style="color: #409EFF">{{preview.usersCount}}</h3>
          </div>
          <div class="user-icon">
            <i class="iconfont">&#xe602;</i>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="box">
          <div>
            <p>文档统计</p>
            <h3 style="color: #67C23A">{{preview.docsCount}}</h3>
          </div>
          <div class="doc-icon">
            <i class="iconfont">&#xe67d;</i>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="box">
          <div>
            <p>留言统计</p>
            <h3 style="color: #8061EF">{{preview.commentsCount}}</h3>
          </div>
          <div class="comment-icon">
            <i class="iconfont">&#xe69a;</i>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="box">
          <div>
            <p>标签统计</p>
            <h3 style="color: #F56C6C">{{preview.tagsCount}}</h3>
          </div>
          <div class="tag-icon">
            <i class="iconfont">&#xe645;</i>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  export default {
    props: {
      preview: {
        type: Object,
        default: () => {
          return {
            usersCount: 0,
            docsCount: 0,
            commentsCount: 0,
            tagsCount: 0
          }
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  .preview-container {
    h2 {
      font-size: 16px;
      color: #909399;
    }
  }
  .preview-wrapper {
    .box {
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #FFFFFF;

      p {
        margin: 0;
        color: #B7B7B7;
        text-align: center;
      }

      h3 {
        margin: 0;
        font-size: 26px;
        text-indent: 20px;
      }

      div {
        &:last-child {
          width: 50px;
          height: 50px;
          line-height: 50px;
          text-align: center;

          i {
            font-size: 26px;
            color: #FFFFFF;
          }
        }
      }
    }
  }

  .user-icon {
    background-color: #409EFF;
  }
  .doc-icon {
    background-color: #67C23A;
  }
  .comment-icon {
    background-color: #8061EF;
  }
  .tag-icon {
    background-color: #F56C6C;
  }
</style>

















