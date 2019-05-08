<docs>
# UiLightbox
> Show content in a lightbox
@author nicolas husson <nicolas@kffein.com>
</docs>

<script>
import { mapGetters } from 'vuex';
import { TimelineMax, Expo } from 'gsap';
// import IconClose from 'components/ui/icons/Close';
import SvgClose from 'assets/svg/close.svg?inline';
import Store from './store';

export default {
  name: 'UiLightbox',
  components: {
    // IconClose
  },
  props: {
    // can be use as id so we can open/close certain lightbox types, usefull for extended lightboxes
    type: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      svg: {
        close: SvgClose,
      },
      handlers: {
        keydown: (event) => {
          if (!this.isOpen) return;
          if (event.keyCode === 27) {
            this.close();
          }
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      isOpen: 'Lightbox/isOpen',
    }),
  },
  watch: {
    isOpen(isOpen) {
      if (isOpen) {
        return document.addEventListener('keydown', this.handlers.keydown);
      }
      return document.removeEventListener('keydown', this.handlers.keydown);
    },
  },
  beforeCreate() {
    if (!this.$store.state.Lightbox) {
      this.$store.registerModule('Lightbox', Store);
    }
  },
  methods: {
    close() {
      this.$store.dispatch('Lightbox/CLOSE', this.type);
    },
    onshow(el, done) {
      new TimelineMax({
        onComplete: done,
      })
      .add('start')
      .fromTo(this.$refs.Overlay, 0.8, { opacity: 0 }, {
        opacity: 1,
        ease: Expo.easeOut,
        onComplete: done,
      }, 'start')
      .fromTo(this.$refs.Content, 0.6, {
        y: 20,
        opacity: 0,
        ease: Expo.easeOut,
      }, {
        y: 0,
        opacity: 1,
      }, 0.2);
    },
    onhide(el, done) {
      new TimelineMax({
        onComplete: done,
      })
      .add('start')
      .to(this.$refs.Overlay, 0.6, {
        opacity: 0,
        ease: Expo.easeOut,
      }, 'start')
      .to(this.$refs.Content, 0.6, {
        y: 20,
        opacity: 0,
        ease: Expo.easeOut,
      }, 'start');
    },
  },
};
</script>

<template>
  <transition
    @enter="onshow"
    @leave="onhide">
    <div
      v-show="isOpen"
      :data-type="type"
      class="UiLightbox">

      <div
        ref="Overlay"
        class="overlay"
        @click="close" />

      <div
        ref="Content"
        class="content">
        <slot name="close">
          <button
            class="close _no-btn"
            @click="close"
            v-html="svg.close" />
        </slot>
        <div
          ref="Body"
          class="body">
          <slot/>
        </div>
      </div>

    </div>
  </transition>
</template>

<style lang="stylus" scoped>
  /**
   * TABLE OF CONTENT
   * --------
   *  - CUSTOM
   *  - LAYOUT
   *  - DEBUG
   *  - NO_SCOPE
   */

  //  ===CUSTOM===
  .UiLightbox
    .overlay
      background $c-dark
    .close
      size 20px
      padding: 25px
      fill $c-white
      absolute top right
      z-index 20
      kff-transition(fill)
      box-sizing content-box
      .no-touchevents &:hover
        fill $c-accent


  //  ===LAYOUT===
  $z-lightbox := 1000

  .UiLightbox
    fixed 0
    z-index $z-lightbox
    flexbox(center)
    // pointer-events none

  .overlay
    absolute 0
    background rgba(black, .8)

  .content
    position relative
    width 100%
    // x-padding 40px
    // max-width 1024px
    // max-height 80vh
    // background white
    color black
    // padding 25px
    overflow hidden

  .body
    position relative

  .close
    absolute top right

  //  ===DEBUG===
  [data-debug-mode="true"] .Lightbox
    //
</style>
