<!-- eslint-disable -->
<docs>
# SectionActivities
> swiper of activities cards that stand be during the event

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
export default {
  name: 'SectionActivities',
  components: {},
  props: {
    title: {
      type: String,
      default: 'Pleins\nd\'activités',
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
  <section class="SectionActivities">
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
  .SectionActivities
    size var(--viewport-width) var(--viewport-height)
    flexbox(center)
    background-color rgba(aquamarine, 0.2)
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionActivities
    //
</style>
