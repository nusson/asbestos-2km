<!-- eslint-disable -->
<docs>
# SectionActivities
> 

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import { mapGetters } from 'vuex';
import SectionHeader from 'components/misc/SectionHeader';

export default {
  name: 'SectionActivities',
  components: {
    SectionHeader,
    Grid: () => import('./Grid'),
    Swiper: () => import('components/misc/TeamSwiper'),
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: null,
    },
    cta: {
      type: Object,
      default() {
        return null;
      },
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
  computed: {
    ...mapGetters({
      isDesktop: 'Interface/isDesktop',
      isMobile: 'Interface/isMobile',
      viewport: 'Interface/viewport',
    }),
  },
  mounted() {},
  methods: {},
};
</script>

<template>
  <div class="SectionActivities section">
    <SectionHeader
      :title="title"
      :description="description"
      :cta="cta"
      class="header"/>
    <component
      v-if="items.length"
      :is="isMobile ? 'Swiper' : 'Grid'"
      :items="items"
      class="swiper content"/>
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

  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionActivities
    //
</style>
