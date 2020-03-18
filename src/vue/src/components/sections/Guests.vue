<!-- eslint-disable -->
<docs>
# SectionGuests
> swiper of guests performers

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import SectionHeader from 'components/misc/SectionHeader';
import TeamSwiper from 'components/misc/TeamSwiper';

export default {
  name: 'SectionGuests',
  components: { SectionHeader, TeamSwiper },
  props: {
    title: {
      type: String,
      default: 'Des invites\nprestigieux',
    },
    description: {
      type: String,
      default: 'Des invites\nprestigieux',
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
  <section v-if="items.length" class="SectionGuests section">
    <SectionHeader
      :title="title"
      :description="description"
      class="header"/>
    <TeamSwiper
      :items="items"
      layout="athletes"
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
  .SectionGuests
    // y-padding(100px)
    // size var(--viewport-width) var(--viewport-height)
    // flexbox(center)
    // background-color rgba(teal, 0.2)
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionGuests
    //
</style>
