<docs>
# Overlay
> Overlay component
Global overlay component for popup modal, menu etc ...
Used here with the menu.

@author Sebastien Levy <sebastien@kffein.com>
</docs>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Overlay',
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      isActive: 'Overlay/activeOverlay',
    }),
  },
  mounted() {
    this.$watch('isActive', (isActive) => {
      if (isActive) {
        this.$store.dispatch('Interface/DISABLE_SCROLL');
      } else {
        this.$store.dispatch('Interface/ENABLE_SCROLL');
      }
    });
  },
};
</script>

<template>
  <div
    :data-active="isActive"
    class="Overlay"
    @click="$store.dispatch('Menu/CLOSE_MENU')"/>
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
  .Overlay
    fixed 0
    background $c-black
    size 100% var(--viewport-height)
    z-index $z-index-navbar - 1
    overflow hidden
    pointer-events none
    opacity 0
    transition 'opacity' 0.3s linear
    &[data-active=true]
      pointer-events all
      opacity 0.8
      cursor pointer


  //  ===DEBUG===
  [data-debug-mode="true"] .Overlay
    //
</style>
