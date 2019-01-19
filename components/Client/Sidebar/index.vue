<template>
  <aside class="sidebar-box">
    <section class="hot-banner">
      <hot-banner :hotBanner="hotBanner"></hot-banner>
    </section>
    <section class="hot-article">
      <hot-article :hotArticle="hotArticle"></hot-article>
    </section>
    <section class="hot-member">
      <hot-members :hotMembers="hotMembers"></hot-members>
    </section>
    <section class="hot-tag">
      <hot-tags :hotTags="hotTags"></hot-tags>
    </section>
  </aside>
</template>
<script>
import HotArticle from '~/components/Client/HotArticle'
import HotBanner from '~/components/Client/hotBanner'
import HotMembers from '~/components/Client/hotMembers'
import HotTags from '~/components/Client/hotTags'
  export default {
    name: 'Sidebar',
    data() {
      return {
      }
    },
    props: ['hotBanner', 'hotTags', 'hotMembers', 'hotArticle'],
    components: {
      HotArticle,
      HotBanner,
      HotMembers,
      HotTags
    }
  }
</script>
