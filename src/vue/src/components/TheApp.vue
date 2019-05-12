<docs>
# TheApp
> *the main application*

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { mapGetters, mapState } from 'vuex';
import { TweenMax, Expo } from 'gsap';
import Transitions from 'src/mixins/Transitions';
import PageTransition from 'components/ui/PageTransition';
import TheHeader from 'components/layout/TheHeader';
import TheFooter from 'components/layout/TheFooter';
import TheLoader from 'components/TheLoader';
import SmoothScrollBar from 'components/ui/ScrollBar';
import Overlay from 'components/ui/Overlay';

const TheHomepage = () => import(/* webpackChunkName: "pages-home" */ 'components/TheHomepage');

export default {
  name: 'TheApp',
  components: {
    TheHomepage,
    TheHeader,
    TheFooter,
    TheLoader,
    Overlay,
    SmoothScrollBar,
    PageTransition,
  },
  mixins: [Transitions],
  computed: {
    ...mapGetters({
      loaded: 'Loader/loaded',
      viewport: 'Interface/viewport',
      isMobile: 'Interface/isMobile',
      scrollable: 'Interface/scrollable',
      social: 'Global/social',
      mode: 'App/mode',
    }),
    ...mapState('Menu', {
      navigation: ({ navigation }) => navigation,
    }),
    dynamicStyles() {
      /* Usefull to:
          - fix 100vw (some browsers does/does not count the scrollbar)
          - fix 100vh (some mobile does/does not count the top bar)
      */
      return `
        ._fullViewport,
        ._fullViewportW,
        ._fullViewportH {
          overflow: hidden;
        }
        ._fullViewport {
          position: relative;
          width: ${this.viewport.width}px;
          height: ${this.viewport.height}px;
        }
        ._fullViewportW {
          width: ${this.viewport.width}px;
        }
        ._fullViewportH {
          height: ${this.viewport.height}px;
        }
        ._fullViewportHWithoutHeader {
          height: ${this.viewport.height - (this.isMobile ? 40 : 50)}px;
        }
        :root { 
          --viewport-width: ${this.viewport.width}px;
          --viewport-height: ${this.viewport.height}px;
          --viewport-height-no-header: ${this.viewport.height - (this.isMobile ? 40 : 50)}px;
        }
      `;
    },
  },
  created() {
    // init our interface (viewport etc)
    this.$store.dispatch('Interface/INIT');
  },
  // methods:{
  //   enter(el, done) {
  //     return TweenMax.fromTo(el, 1, {
  //       autoAlpha:0
  //     }, {
  //       autoAlpha:1,
  //       ease: Expo.easeOut,
  //       onComplete:done.bind(this)
  //     })
  //   }
  // }
};
</script>

<template>
  <div
    id="App"
    :data-debug-mode="$root.debug"
    :data-scrollable="true">

    <TheHeader
      v-if="loaded"
      :navigation="navigation"/>

    <!-- <SmoothScrollBar
      :data-scrollable="scrollable.toString()"
      tag="main"
      class="app_content"> -->
    <!-- <transition
      :css="false"
      mode="out-in"
      appear
      @enter="enter"> -->
      <TheHomepage
        v-show="loaded"
        ref="Page"
        class="page"/>
    <!-- </transition> -->
    <TheFooter
      v-if="loaded && social"
      :social="social"
      class="footer"/>
    <!-- </SmoothScrollBar> -->

    <!-- <Overlay />
    <PageTransition ref="PageTransition" /> -->
    <TheLoader v-if="!loaded"/>

    <component
      :is="'style'"
      v-html="dynamicStyles"/>
  </div>
</template>

<style lang="stylus" scoped>
  /**
   * =LAYOUT
   * =DEBUG
   */

  /* ===LAYOUT=== */
  #App
    position relative
    width 100%
    responsive-prop(height, 100% auto)
    // responsive-prop(padding-top, $h-header)
    .app_content
      flexbox(column)
      size 100%
      // overflow hidden
      overflow auto
      +not-desktop()
        overflow auto
      > .page
        width 100%
        flex-grow 1

    &[data-debug-mode="true"]
      // height 3000px
      // absolute 0
      // background url('../assets/images/debug/1440px.jpg') no-repeat center top
      // background-size 1440px

    >>>.scrollbar-track
      background transparent
      width 1px
      padding-right 8px
      cursor pointer
    >>>.scrollbar-thumb
      background $c-black
      width 2px
      border-radius none

  /* ===DEBUG=== */


</style>
