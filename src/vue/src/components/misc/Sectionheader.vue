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
      v-text="title"/>
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
    .title
      f-style(title, h1)
    .description
      f-style(text, medium)
      margin-top 1em

  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionHeader
    //
</style>
