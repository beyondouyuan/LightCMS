<template>
  <section class="table-container">
    <el-table
      ref="tagTable"
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
        label="名称"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        label="描述"
      >
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column
        label="链接"
      >
        <template slot-scope="scope">
          {{ scope.row.link }}
        </template>
      </el-table-column>
      <el-table-column
        label="图标"
        width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.cover }}
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
              @click="handleUpdateLink(scope.row)"
              type="primary"
              size="mini"
            >编辑</el-button>
            <el-button
              @click="handleDeleteLink(scope.row)"
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
      handleUpdateLink(data) {
        this.$emit('update-link', true, data)
      },
      handleDeleteLink(data) {
        this.$confirm('确定删除吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'danger'
          }).then(() => {
            this.$emit('delete-link', data)
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
