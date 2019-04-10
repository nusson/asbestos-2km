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
      default: null,
    },
    content: {
      type: String,
      default: null,
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
  <div class="SectionAbout">
    <div class="container">
      <header class="header">
        <h2
          class="title"
          v-text="title"/>
      </header>
      <div
        class="content _wysiwyg"
        v-html="content" />
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
    margin-bottom 1em

  .content
    color $c-white
    responsive-prop(max-width, 800px 500px)
    +desktop()
      column-count 2

  .SectionAbout
    background black url('~assets/images/section-hero.jpg') center center no-repeat
    background-size cover
    +mobile()
      >.container
        padding 60px 20px
        // .content
        //   x-padding(10px)
    +desktop()
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
