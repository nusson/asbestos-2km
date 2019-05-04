<!-- eslint-disable -->
<docs>
# SectionHeader
> Common header for sections

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
export default {
  name: 'SectionHeader',
  props: {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    tag: {
      type: String,
      default: 'header',
    },
  },
};
</script>

<template>
  <component
    :is="tag"
    class="SectionHeader">
    <h2
      class="title"
      v-html="title"/>
    <div
      v-if="description"
      class="description _wysiwyg"
      v-html="description"/>
  </component>
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
  .SectionHeader
    safe-content()
    // responsive-prop(margin-bottom, 120px 80px 60px)

    .title, .description
      text-content()
      display block
    .title
      // display inline-block
      f-style(title, h1)
      flex 0 1 auto
      max-width none
    .description
      // display inline-block
      f-style(text, medium)
      flex 1 1 100%
      margin-top 10px

    // +above($kff-mq-tablet-portrait + 1)
    //   flexbox($justify: flex-start, $align: flex-start)
    //   .description
    //     margin-left 40px
    //     margin-top 8px
    // +below($kff-mq-tablet-portrait)
    //   margin-top 20px

  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionHeader
    //
</style>
