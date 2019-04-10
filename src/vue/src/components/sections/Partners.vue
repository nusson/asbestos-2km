<!-- eslint-disable -->
<docs>
# SectionPartners
> Main partnairs band - just after hero

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import UiPicture from 'components/ui/Picture';

export default {
  name: 'SectionPartners',
  components: { UiPicture },
  props: {
    title: {
      type: String,
      default: 'Asbestos 2.0',
    },
    items: {
      type: Array,
      default() {
        return [];
      },
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
  <section
    v-if="items.length"
    class="SectionPartners">
    <header class="header">
      <h1
        class="title"
        v-text="title"/>
    </header>
    <ol class="partners list">
      <li
        v-for="(partner, index) in items"
        :key="`partner-${index}`"
        class="item">
        <figure class="partner">
          <a
            :href="partner.url"
            target="_blank"
            class="partner link">
            <UiPicture
              v-bind="partner.image"
              class="logo"
              cover="contain"/>
          </a>
          <figcaption
            class="caption"
            v-text="partner.name"/>
        </figure>
      </li>
    </ol>
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
  .SectionPartners
    // padding 10em
    background-color $c-white
    y-padding(3em)

  .header
    flexbox(row, $justify:center)
    >.title
      f-style(title, $align:center)

  .list.partners
    margin-top 40px
    flexbox(row, $justify:space-around)
    max-width $kff-w-max
    x-margin(auto)
    +below($mq-mobile)
      flexbox(column, $justify:space-around)
      max-width 200px
    >.item
      x-margin(20px)
      flex-basis 25%

  .partner
    flexbox(column)
    .logo
      ratio-box(5/3)
      flex 1 0 100%
    .caption
      flex 0 1 0
      overflow hidden

  //  ===DEBUG===
</style>
