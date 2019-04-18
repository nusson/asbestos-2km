<!-- eslint-disable -->
<docs>
# UiToggleButton
> +/- button... that's it

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import UiButton from '.';

export default {
  name: 'UiToggleButton',
  components: { UiButton },
  props: {
    active: {
      type: Boolean,
      default: false,
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
  <UiButton
    :data-active="active"
    class="UiToggleButton">
    <i class="icon"/>
  </UiButton>
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
  .UiToggleButton
    position relative
    size 16px
    border none
    padding 0
    overflow hidden
    flexbox(center)
    &:before
      content ''
      size 100% 3px
      background-color $c-dark
      absolute left top 50% right
      transform translateY(-50%)
      z-index 10
    .icon
      size 100%
      transform scaleY(1)
      transition transform 1.8s easing('out-expo')
      &:before
      &:after
        content ''
        size 3px 100%
        background-color $c-dark
        absolute top left 50% bottom
        transform translateX(-50%) scaleY(1)
    &[data-active]
      .icon
        transform scaleY(0)

  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .UiToggleButton
    //
</style>
