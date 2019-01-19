<template>
  <section class="banner-box" v-if="hotBanner">
    <a :href="hotBanner.link" target="_blank">
      <img :src="hotBanner.cover" :alt="hotBanner.title">
    </a>
  </section>
</template>

<script>
export default {
  props: ['hotBanner']
}
</script>

<style lang="scss" scoped>
.banner-box{
  margin-bottom: 20px;
  width: 100%;
  img{
    display: block;
    width: 100%;
    height: 200px;
  }
}
</style>
