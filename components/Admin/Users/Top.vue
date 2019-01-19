<template>
  <section class="tool-container">
    <div class="left-item">
      <el-button
        class="btn"
        type="primary"
        size="mini"
        @click="handleAdd"
      >
        新增
      </el-button>
    </div>
    <div class="right-item">
      <el-select
          class="select"
          size="small"
          v-model="roleValue"
          placeholder="请选择用户角色"
          @change="handleRoleChange"
        >
          <el-option
            v-for="item of roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span>{{ item.label }}</span>
          </el-option>
        </el-select>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        roleValue: 'all',
        roleOptions: [{
          value: 'all',
          label: '全部',
          id: '0'
        },{
          value: 'superAdmin',
          label: '超级管理员',
          id: '1'
        }, {
          value: 'admin',
          label: '管理员',
          id: '2'
        }, {
          value: 'member',
          label: '普通会员',
          id: '3'
        }]
      }
    },
    methods: {
      handleAdd() {
        this.$emit('add-user', true)
      },
      handleRoleChange(item) {
        this.$emit('change-role', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tool-container {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    background-color: #FFFFFF;

    .left-item {
      .btn {
        border-radius: 0;
      }
    }
    .right-item {
      display: flex;
      .select {
        margin-left: 15px;
        width: 140px;
      }
    }
  }
</style>





















