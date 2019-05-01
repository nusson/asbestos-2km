<!-- eslint-disable -->
<docs>
# SectionWhenAndWhere
> The event description page (place, date etc)

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import { Scene } from 'scrollmagic';
import { mapGetters } from 'vuex';
import SectionHeader from 'components/misc/SectionHeader';
// import Experiences from './Experience';

export default {
  name: 'SectionWhenAndWhere',
  components: {
    SectionHeader,
    // Experiences,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    map: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      viewport: 'Interface/viewport',
    }),
    // address() {
    //   const { city, state } = this.place;
    //   return `${city}, ${state}`;
    // },
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<template>
  <section class="SectionWhenAndWhere section">
    <div class="col -left">
      <SectionHeader
        :title="title"
        :description="description"
        class="header"/>
      <a
        :href="map.cta.href"
        class="cta"
        target="_blank"
        v-text="map.cta.label" />
    </div>
    <figure
      v-if="map"
      class="col -right map-wrapper">
      <div class="map"/>
      <figcaption class="caption">
        <p
          class="address"
          v-html="map.address" />
        <a
          :href="map.cta.href"
          v-text="map.cta.label" />
      </figcaption>
    </figure>
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
  .SectionWhenAndWhere
    background-color white
    +above($kff-mq-tablet-portrait + 1)
      flexbox(row, $align: flex-start)
      safe-content()
      .video
        max-height 80vh
    +below($kff-mq-tablet-portrait)
      text-align center
      padding-bottom 0
      .col.-left
        safe-content()
        x-padding(0)
        width 100%

    >.col
      flex-basis 50%
      &.-left
        margin-right 40px

  .header
    padding 0
    margin 0
    >>> .date
    >>> .address
      f-style(title, h2)

  .cta
    position relative
    display inline-block
    f-style(title, h3)
    border 1px solid
    padding 0.5em
    margin 1em auto 0
    cursor pointer
    box-sizing content-box
    &:after
      content ''
      absolute 0
      kff-transition(border)
      border 1px solid
    &:hover
      &:after
        border-width 3px

  .map-wrapper
    position relative
    ratio-box(4/3)
    width 100%
    flexbox(center)
    +mobile()
      margin-top 20px

    .map
      absolute 0
      background-color rgba(tomato, 0.5)
    .caption
      position relative
      z-index 2

  // //  ===DEBUG===
  // .SectionWhenAndWhere
  //   // size var(--viewport-width) var(--viewport-height)
  //   // flexbox(center)
  //   background-color rgba(white, 1)
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionWhenAndWhere
    //
</style>
