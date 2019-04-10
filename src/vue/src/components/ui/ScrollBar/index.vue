<docs>
# SmoothScrollBar
> Custom ScrollBar component

[doc] https://github.com/idiotWu/smooth-scrollbar/tree/7.x

@author Sebastien Levy <sebastien@kffein.com>
</docs>

<script>
 import { mapGetters } from 'vuex';
 import SmoothScrollbar from 'smooth-scrollbar';

  export default {
    name: 'SmoothScrollBar',
    props: {
      tag: {
        type: String,
        default: 'div',
      },
    },
    data() {
      return {
        scrollbar: null,
        defaultOptions: {
          damping: 0.1,
          alwaysShowTracks: false,
          // speed: 0,
        },
      };
    },
    computed: {
      ...mapGetters({
        viewport: 'Interface/viewport',
        isDesktop: 'Interface/isDesktop',
      }),
    },
    destroyed() {
      if (this.scrollbar) {
        this.destroyed();
      }
    },
    mounted() {
      this.$watch('viewport', (viewport) => {
        if (!viewport) return;
        if (!this.isDesktop) {
          if (this.scrollbar) {
            this.destroyed();
          }
        } else if (!this.scrollbar) {
          this.scrollbar = SmoothScrollbar.init(this.$refs.scrollArea, this.defaultOptions);
          this.$store.commit('Interface/SET_SCROLLBAR', this.scrollbar);
          this.$store.dispatch('ScrollMagic/SET_SMOOTH_SCROLLBAR', this.scrollbar);
          this.$store.dispatch('Interface/SCROLL_TOP', 0);
        }
      }, { immediate: true });
    },
    methods: {
      destroyed() {
        this.scrollbar.destroy();
        this.scrollbar = null;
        this.$store.commit('Interface/SET_SCROLLBAR', this.scrollbar);
      },
    },
  };
</script>

<template>
  <component
    ref="scrollArea"
    :is="tag"
    class="smooth-scrollbar">
    <slot/>
  </component>
</template>

<style lang="stylus" scoped>
  .smooth-scrollbar
    width var(--viewport-width)
    height var(--viewport-height)
    &[data-scrollable=false]
      pointer-events none
    +not-desktop()
      height 100%

  .ie &
    .smooth-scrollbar
      +desktop()
        fixed 0
        size 100%

</style>
