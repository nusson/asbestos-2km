<!-- eslint-disable -->
<docs>
# SectionContact
> Contact section with form (the last one)

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import SectionHeader from 'components/misc/SectionHeader';

export default {
  name: 'SectionContact',
  components: { SectionHeader },
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
  <section class="SectionContact">
    <SectionHeader
      :title="title"
      :description="`
      <h4>@TODO</h4>
      <p>Fixed section so reveal sunset and contatct form on SM</p>
      `"
      class="header"/>
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
    background black url('/uploads/section-contact.jpg') center center no-repeat
    background-size cover
    color $c-white
    min-height calc('var(--viewport-height) - 51px')
    +mobile()
      min-height calc('var(--viewport-height) - 30px')
      margin-top 0 !important

  //  ===DEBUG===
  .SectionContact
    // flexbox(center)
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionContact
    //
</style>
