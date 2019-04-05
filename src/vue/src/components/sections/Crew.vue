<!-- eslint-disable -->
<docs>
# SectionCrew
> swiper of crew member

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
export default {
  name: 'SectionCrew',
  components: {},
  props: {
    title: {
      type: String,
      default: 'Une équipe\nde feux',
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<template>
  <section class="SectionCrew">
    <h2
      class="title"
      v-text="title"/>
  </section>
</template>

<style lang="stylus" scoped>
  /**
  * TABLE OF CONTENT
  * --------
  *  - LAYOUT
  *  - DEBUG
  *  - NO_SCOPE
  */

  //  ===LAYOUT===

  //  ===DEBUG===
  .SectionCrew
    size var(--viewport-width) var(--viewport-height)
    flexbox(center)
    background-color rgba(coral, 0.2)
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionCrew
    //
</style>
