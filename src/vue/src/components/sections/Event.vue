<!-- eslint-disable -->
<docs>
# SectionEvent
> The event description page (place, date etc)

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
export default {
  name: 'SectionEvent',
  components: {},
  props: {
    title: {
      type: String,
      default: 'Rendez-\nvous',
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
  <section class="SectionEvent">
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
  .SectionEvent
    size var(--viewport-width) var(--viewport-height)
    flexbox(center)
    background-color rgba(white, 1)
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionEvent
    //
</style>
