<template>
  <section class="tool-container">
    <div class="left-item">
      <el-button
        class="btn"
        type="primary"
        size="mini"
        @click="handleSwitchPage"
      >
        新增
      </el-button>
    </div>
    <div class="right-item">
      <el-input
        class="input-item"
        size="mini"
        placeholder="请输入关键词"
        suffix-icon="el-icon-search"
        v-model="searchKeyword"
      ></el-input>
      <el-select
        v-model="selectValue"
        placeholder="请选择"
        size="mini"
        class="select"
      >
        <el-option
          v-for="item of typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        searchKeyword: '',
        selectValue: 2,
        typeOptions: [{
          value: 1,
          label: '全部'
        }, {
          value: 2,
          label: '原创'
        }, {
          value: 3,
          label: '转载'
        }, {
          value: 4,
          label: '已推荐'
        }]
      }
    },
    methods: {
      handleSwitchPage() {
        this.$emit('switch-add-page')
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
      .btn {
        border-radius: 0;
      }
    }
    .right-item {
      display: flex;

      .input-item, .select {
        margin-left: 15px;
        width: 135px;
      }
    }
  }
</style>














