<!-- eslint-disable -->
<docs>
# UiVideoFigure
> @extends UiVideo but use it as a figure with legend

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import UiVideo from '.';

export default {
  name: 'UiVideoFigure',
  components: {
    UiVideo,
  },
  extends: UiVideo,
  props: {
    legend: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showLegend: false,
    };
  },
  mounted() {
    console.log('m', this);
  },
  methods: {
    onMouseEnter() {
      // console.log('onMouseOver');
      this.showLegend = true;
    },
    onMouseLeave() {
      // console.log('onMouseLeave');
      this.showLegend = false;
    },
  },
};
</script>

<template>
  <figure
    class="UiVideoFigure"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave">
    <UiVideo
      v-if="src"
      v-bind="$props"
      class="video" />
    <figcaption
      :data-visible="showLegend"
      class="caption _wysiwyg"
      v-html="legend" />
  </figure>
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
  .video
    // position relative
    z-index 1
  .caption
    padding 20px
    absolute 0 0 false 0
    background-color rgba($c-dark, 0.8)
    color: $c-accent
    z-index 2
    transform translateY(-110%)
    transition transform 0.6s easing('in-quad') 0s
    box-shadow 1px 0px 10px rgba($c-black, 0.8)
    &[data-visible]
      transform translateY(0)
      transition transform 1.2s easing('out-expo') 1.5s

  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .UiVideoFigure
    //
</style>
