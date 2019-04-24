<!-- eslint-disable -->
<docs>
# SectionCrew
> swiper of crew member

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import SectionHeader from 'components/misc/SectionHeader';
import TeamSwiper from 'components/misc/TeamSwiper';

export default {
  name: 'SectionCrew',
  components: { SectionHeader, TeamSwiper },
  props: {
    title: {
      type: String,
      default: 'Une équipe\nde feux',
    },
    description: {
      type: String,
      default: null,
    },
    items: {
      type: Array,
      default() {
        return null;
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
  <section class="SectionCrew section">
    <SectionHeader
      :title="title"
      :description="description"
      class="header"/>
    <TeamSwiper
      :items="items"
      class="team-swiper content"/>
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
  .SectionCrew
    // size var(--viewport-width) var(--viewport-height)
    // flexbox(center)
    // background-color rgba(coral, 0.2)
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionCrew
    //
</style>
