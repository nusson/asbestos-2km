<!-- eslint-disable -->
<docs>
# SectionCrew
> swiper of activities cards that stand be during the event

@author Nicolas Husson <hello@nusson.ninja>

## @todo

- [ ] better integration
- [ ] toggle description
- [ ] nice drag effect (orford)
</docs>
<!-- eslint-enable -->

<script>
import { mapGetters } from 'vuex';
// import { TimelineMax, Power3, Back } from 'gsap';
// import { indexOf, without } from 'lodash';
import SectionHeader from 'components/misc/SectionHeader';
import UiSwiper from 'components/ui/Swiper';
import UiPicture from 'components/ui/Picture';
import UiToggleButton from 'components/ui/Button/Toggle';

export default {
  name: 'SectionCrew',
  components: {
    SectionHeader,
    UiSwiper,
    UiPicture,
    UiToggleButton,
    TeamGrid: () => import('./Grid'),
    TeamSwiper: () => import('components/misc/TeamSwiper'),
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
    items: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  // data() {
  //   return {
  //     actives: [],
  //   };
  // },
  computed: {
    ...mapGetters({
      isDesktop: 'Interface/isDesktop',
      isMobile: 'Interface/isMobile',
      viewport: 'Interface/viewport',
    }),
  },
  mounted() {},
  // methods: {
  //   indexOf,
  //   toggle(index) {
  //     if (indexOf(this.actives, index) >= 0) {
  //       this.actives = without(this.actives, index);
  //       return;
  //     }
  //     this.actives.push(index);
  //   },
  //   onOpen(el, done) {
  //     return new TimelineMax({
  //       onComplete: done,
  //     })
  //     .fromTo(el, 0.4, {
  //         height: 0,
  //         opacity: 0,
  //         y: 10,
  //       }, {
  //         height: el.offsetHeight,
  //         opacity: 1,
  //         y: 0,
  //         ease: Power3.easeOut,
  //       })
  //     .set(el, { height: 'auto' });
  //   },
  //   onClose(el, done) {
  //     return new TimelineMax({
  //       onComplete: done,
  //     })
  //     .to(el, 0.4, {
  //       opacity: 0,
  //       y: 10,
  //       ease: Power3.easeIn,
  //     }, 0)
  //     .fromTo(el, 0.6, { height: el.offsetHeight }, {
  //       height: 0,
  //       ease: Back.easeIn,
  //     }, 0);
  //   },
  // },
};
</script>

<template>
  <section class="SectionCrew section">
    <SectionHeader
      :title="title"
      :description="description"
      class="header"/>
    <component
      v-if="items.length"
      :is="isMobile ? 'TeamSwiper' : 'TeamGrid'"
      :items="items"
      class="swiper content"/>
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

  // //  ===LAYOUT===
  // +desktop()
  //   .swiper
  //     safe-content()
  //     flexbox(row, $justify:flex-start, $wrap:wrap)
  //     >.slide
  //       flex 1 1 30%
  //       max-width calc('100% - 20px')
  //       &:nth-child(n+4)
  //         margin-top 40px
  //       &:nth-child(3n+2)
  //         x-margin(40px)
  //       .content
  //         flex-basis 25%
  //         cursor pointer

  // .slide
  //   position relative
  //   // ratio-box(4/5)
  //   ratio-box(3/4)
  //   width 100%
  //   box-shadow: 2px 2px 5px rgba($c-dark, 0.4);
  //   max-width 300px
  //   background-color $c-white

  // .swiper
  //   padding 7px // for box-shadow...
  //   x-padding(40px)
  //   .slide
  //   +below(1024px)
  //     x-padding(20px)
  //     .slide
  //       width calc('100% - 40px')

  // .article
  //   absolute 0
  //   flexbox(column)
  //   .background
  //     position relative
  //     size 100%
  //     flex 1 1 auto

  //   .content
  //     padding 20px
  //     flex 1 0 25%
  //     background-color $c-white
  //     color $c-dark
  //     z-index 2
  //     // flexbox(row)
  //     text-align left
  //     .title
  //       f-style(title, h3)
  //     .description
  //       f-style(text, card)
  //       margin-top 0.4em

  //  ===DEBUG===
  .SectionCrew
    // size var(--viewport-width) var(--viewport-height)
    // flexbox(center)
    // background-color rgba(aquamarine, 0.2)
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionCrew
    //
</style>
