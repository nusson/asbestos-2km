<!-- eslint-disable -->
<docs>
# SectionContact
> Contact section with form (the last one)

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
export default {
  name: 'SectionContact',
  components: {},
  props: {
    title: {
      type: String,
      default: 'Contactez-nous',
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
  <section class="SectionContact _fullViewport">
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
  .SectionContact
    background black url('~assets/images/section-contact.jpg') center center no-repeat
    background-size cover
    color $c-white

  //  ===DEBUG===
  .SectionContact
    flexbox(center)
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionContact
    //
</style>
