<!-- eslint-disable -->
<docs>
# SectionAbout
> Section about - the 2nd one

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
export default {
  name: 'SectionAbout',
  components: {},
  props: {
    title: {
      type: String,
      default: 'Traverser la mine Jeffrey —',
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
  <div class="SectionAbout _fullViewport">
    <div class="container">
      <header class="header">
        <h2
          class="title"
          v-text="title"/>
      </header>
    </div>
  </div>
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
  .title
    f-style(title, $color: $c-white)

  .SectionAbout
    background black url('~assets/images/section-hero.jpg') center center no-repeat
    background-size cover
    flexbox(center)
    >.container
      width 80vw
      min-height 80vh
      max-width 1024px
  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionAbout
    //
</style>
