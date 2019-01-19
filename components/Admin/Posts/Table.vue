<template>
  <section class="table-container">
    <el-table
      ref="postTable"
      :data="dataSource"
      style="width: 100%"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      size="small"
    >
      <el-table-column
        type="selection"
        width="50"
      >
      </el-table-column>
      <el-table-column
        label="ID"
        width="100"
      >
        <template slot-scope="scope">{{ scope.row._id }}</template>
      </el-table-column>
      <el-table-column
        label="推荐"
        width="80"
      >
        <template slot-scope="scope">
          <i :class="{'iconfont' : true, 'topicon': true, 'top': scope.row.isTop}">&#xe62a;</i>
        </template>
      </el-table-column>
      <el-table-column
        label="标题"
      >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.categories[scope.row.categories.length - 1]['name'] }}
        </template>
      </el-table-column>
      <el-table-column
        label="来源"
        width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.source === 0 ? '原创' : '转载' }}
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column
        label="浏览数"
        width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.clicksNum }}
        </template>
      </el-table-column>
      <el-table-column
        label="喜欢数"
        width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.likesNum }}
        </template>
      </el-table-column>
      <el-table-column
        label="评论数"
        width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.commentsNum }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <div class="btns-box">
            <el-button
              @click="handleUpdate(scope.row._id)"
              type="primary"
              size="mini"
            >编辑</el-button>
            <el-button
              @click="handleDelete(scope.row)"
              type="danger"
              size="mini"
            >删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        layout="sizes, prev, pager, next"
        :total="total"
        :page-size="pageSizes"
      ></el-pagination>
    </div>
  </section>
</template>

<script>
  import siteConf from '~/config/site'
  export default {
    data() {
      return {
        multipleSelection: []
      }
    },
    props: {
      dataSource: {
        type: Array,
        default: () => {
          return []
        }
      },
      pageSizes: {
        type: Number,
        default: 10
      },
      total: {
        type: Number,
        default: 100
      }
    },
    methods: {
      handleSelectionChange(items) {
        this.multipleSelection = items
      },
      handleUpdate(id) {
        this.$router.push(`${siteConf.adminPath}/posts/${id}`)
      },
      handleDelete(data) {
        this.$confirm('确定删除吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'danger'
          }).then(() => {
            this.$emit('delete-post', data)
          }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除!'
            })
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .table-container {
    margin-top: 20px;
    padding: 15px 0;
    background-color: #FFFFFF;

    img {
      width: 100%;
      max-width: 100%;
    }
  }
  .btns-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pagination-container {
    margin-top: 15px;
    display: flex;
    justify-content: center;
  }
  .topicon {
    font-size: 20px;
    color: #999999;
  }
  .topicon.top {
    color: #409EFF;
  }
</style>
