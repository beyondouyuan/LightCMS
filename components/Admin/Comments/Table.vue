<template>
  <section class="table-container">
    <el-table
      ref="tagTable"
      :data="dataSource"
      style="width: 100%"
      tooltip-effect="dark"
      size="small"
    >
      <el-table-column
        label="ID"
        width="100"
      >
        <template slot-scope="scope">{{ scope.row._id }}</template>
      </el-table-column>
      <el-table-column
        label="文章标题"
      >
        <template slot-scope="scope">
          {{ scope.row.post.title }}
        </template>
      </el-table-column>
      <el-table-column
        label="评论内容"
      >
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column
        label="评论者"
        width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.owner.nickname }}
        </template>
      </el-table-column>
      <el-table-column
        label="评论时间"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.enable ? '启用' : '禁用'}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <div class="btns-box">
            <el-button
              @click="handleUpdate(scope.row)"
              type="primary"
              size="mini"
            >{{ scope.row.enable ? '封禁' : '启用' }}</el-button>
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
  export default {
    data() {
      return {

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
      handleUpdate(data) {
        this.$emit('update-comment', data)
      },
      handleDelete(row) {
        this.$emit('delete-comment', row)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .table-container {
    margin-top: 20px;
    padding: 15px 0;
    background-color: #FFFFFF;
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
</style>
