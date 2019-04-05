<docs>
# PageTransition
> DOM elements for page transition during navigation

@author Sebastien Levy <sebastien@kffein.com>
</docs>

<script>
import { mapGetters } from 'vuex';
import { TimelineMax, Power1 } from 'gsap';

export default {
  name: 'PageTransition',
  data() {
    return {
      timeline: null,
    };
  },
  computed: {
    ...mapGetters({
      isAnimating: 'Transition/isAnimating',
      transitionActivated: 'Transition/transitionActivated',
      viewport: 'Interface/viewport',
    }),
  },
  mounted() {
    this.$watch('transitionActivated', (activated) => {
      if (!activated) return;
      this.initTimeLine();
      this.timeline.seek('enter');
    });
  },
  methods: {

    /**
     * gobal page transition timeline
     */
    initTimeLine() {
      this.timeline = new TimelineMax({ paused: true })
      .to(this.$el, 0.4, { opacity: 1 })
      .addLabel('leave')
      .to(this.$el, 0.4, { opacity: 0 })
      .addLabel('enter');
  },

    /**
     * generic page enter transition
     */
    enter(done) {
      if (this.transitionActivated) {
      this.timeline.tweenFromTo('leave', 'enter', {
          delay: 0.1,
          ease: Power1.easeInOut,
          onComplete: done,
        });
      }
    },
    /**
     * generic page leave transition
     */
    leave(done) {
      this.timeline.seek('enter');
      this.timeline.tweenFromTo('leave', {
        ease: Power1.easeInOut,
        onComplete: done,
      });
    },
  },
};
</script>

<template>
  <div
    :data-active="transitionActivated"
    class="PageTransition"/>
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
  .PageTransition
    &[data-active="true"]
      fixed 0
      size var(--viewport-width) var(--viewport-height)
      z-index $z-transition
      pointer-events none
      flexbox()
      overflow hidden
      background $c-white
    &[data-active="false"]
      display none


  //  ===DEBUG===
  [data-debug-mode="true"] .PageTransition
    //
</style>
