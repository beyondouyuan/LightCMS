<template>
  <section class="tree-container">
    <el-tree
      :data="dataSource"
      node-key="_id"
      :props="defaultProps"
      default-expand-all
      highlight-current
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{node.label}}</span>
        <span>
          <el-button
            class="btn"
            v-if="data.children"
            type="primary"
            size="mini"
            @click="handleAddSubCate(data)"
          >
            添加
          </el-button>
          <el-button
            class="btn"
            type="success"
            size="mini"
            @click="handleUpdateCate(data)"
          >
            编辑
          </el-button>
          <el-button
            class="btn"
            type="danger"
            size="mini"
            @click="handleDeleteCate(data)"
          >
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    props: {
      dataSource: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    methods: {
      /**
       * [handleAddSubCate 添加子类-弹出添加窗]
       * @param  {[type]} data [description]
       * @return {[type]}      [description]
       */
      handleAddSubCate(data) {
        this.$emit('add-cate', true, data)
      },
      /**
       * [handleDeleteCate 删除一个分类]
       * @param  {[type]} data [description]
       * @return {[type]}      [description]
       */
      handleDeleteCate(data) {
        if (data.children && data.children.length > 0) {
          this.$notify.error({
            title: '错误！',
            message: '该分类下含有下级分类，请先删除下级分类再执行该操作！'
          })
          return false
        } else {
          this.$confirm('此操作将会永久删除该分类，确定删除吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'danger'
          }).then(() => {
            // 点击确定-继续删除
            this.$emit('delete-cate', data)
          }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除!'
            })
          })
        }
      },
      /**
       * [handleUpdateCate 更新分类-弹出更新窗口]
       * @param  {[type]} data [description]
       * @return {[type]}      [description]
       */
      handleUpdateCate(data) {
        this.$emit('update-cate', true, data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tree-container {
    margin-top: 20px;
    padding: 15px 0;
    background-color: #FFFFFF;
    /deep/ .el-tree-node__content {
      height: 40px;
    }
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;

    .btn {
      border-radius: 0;
    }
  }
</style>























