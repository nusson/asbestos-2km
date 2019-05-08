<!-- eslint-disable -->
<docs>
# UiButtonScrollDown
> 

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import { mapGetters } from 'vuex';
import { TimelineMax, /*  Expo, */ Linear } from 'gsap';
import ChevronSvg from 'assets/svg/chevron-down.svg?inline';

export default {
  name: 'UiButtonScrollDown',
  props: {},
  data() {
    return {
      svg: ChevronSvg,
      overTimeline: null,
    };
  },
  computed: {
    ...mapGetters({
      viewport: 'Interface/viewport',
    }),
  },
  mounted() {
    this.overTimeline = new TimelineMax({
      repeat: -1,
      paused: true,
    })
    .set(this.$refs.Chevrons, { y: '-50%', opacity: 0 })
    .add('start-loop')
    .staggerTo(this.$refs.Chevrons, 0.25, { opacity: 1 }, 0.25, 0)
    .staggerTo(this.$refs.Chevrons, 0.25, { opacity: 0 }, 0.25, 0.75)
    .staggerTo(this.$refs.Chevrons, 1, { y: '50%' }, 0.25, 0)
    .add('end-loop')
    // .add('start-one', '+=0')
    // .set(this.$refs.Chevrons[0], { y: '-50%', opacity: 0 })
    // .to(this.$refs.Chevrons[0], 0.25, { opacity: 1 }, 'start-one')
    // .to(this.$refs.Chevrons[0], 0.25, { opacity: 0 }, 'start-one+=0.75')
    // .to(this.$refs.Chevrons[0], 1, { y: '50%' }, 'start-one')
    // .add('end-one')
    .add('end', '+=0.5')
    .add('pausable', 0.25);

    this.overTimeline.seek('pausable');

    setInterval(() => {
      this.over();
      this.$nextTick(this.out.bind(this));
    }, 4000);
  },
  methods: {
    over() {
      this.overTimeline.play();
    },
    out() {
      this.overTimeline.pause();
      const time = this.overTimeline.getLabelTime('pausable');
      const duration = Math.abs(this.overTimeline.time() - this.overTimeline.duration());
      return new TimelineMax()
        .to(this.overTimeline, duration, { time: this.overTimeline.duration(), ease: Linear.easeNone })
        .set(this.overTimeline, { time: 0 })
        .to(this.overTimeline, time, { time, ease: Linear.easeNone });
    },
  },
};
</script>

<template>
  <button
    class="UiButtonScrollDown _no-btn"
    @mouseenter="over"
    @mouseleave="out"
    @click.prevent="$store.dispatch('Interface/SCROLL_TO', {to:viewport.height})">
    <span
      v-for="i in [0,1,2]"
      ref="Chevrons"
      :key="`chevron-${i}`"
      class="svg"
      v-html="svg" />
  </button>
</template>

<style lang="stylus" scoped>
  /**
  * TABLE OF CONTENT
  * --------
  *  - LAYOUT
  *  - DEBUG
  *  - NO_SCOPE
  */
  .UiButtonScrollDown
    size 40px
    // margin-bottom 40px
    +mobile(){
      size 20px
      // margin-bottom 20px
    }
    position relative
    cursor pointer
    .no-touchevents &
      .svg
        kff-transform(fill)
      &:hover .svg
        fill $c-accent

  .svg
    fill $c-white
    size 100%
    display block
    absolute 0

  //  ===LAYOUT===

  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .UiButtonScrollDown
    //
</style>
