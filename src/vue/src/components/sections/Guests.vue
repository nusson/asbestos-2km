<!-- eslint-disable -->
<docs>
# SectionGuests
> swiper of guests performers

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
export default {
  name: 'SectionGuests',
  components: {},
  props: {
    title: {
      type: String,
      default: 'Des invites\nprestigieux',
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
  <section class="SectionGuests">
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
  .SectionGuests
    size var(--viewport-width) var(--viewport-height)
    flexbox(center)
    background-color rgba(teal, 0.2)
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionGuests
    //
</style>
