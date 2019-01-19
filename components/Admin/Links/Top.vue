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
  </section>
</template>

<script>
  export default {
    methods: {
      handleAdd() {
        this.$emit('add-link', true)
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
  }
</style>





















