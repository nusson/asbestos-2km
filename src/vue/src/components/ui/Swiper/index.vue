<docs>
# AbstractSwiper
> a basic swiper component perfect to extend

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
import { each, get } from 'lodash';
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper/dist/js/swiper.js';
import { TimelineMax, Power1 } from 'gsap';

export default {
  name: 'AbstractSwiper',
  props: {
    /** Swiper Wrapper tag (ol, ul etc) */
    tag: {
      type: String,
      default: 'div',
    },
    /** Swiperjs options - Attention, will override default props */
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    /** easy navigation : https://idangero.us/swiper/api/#pagination */
    pagination: {
      type: [Boolean, Object],
      default: true,
    },
    /** easy navigation : https://idangero.us/swiper/api/#navigation */
    navigation: {
      type: [Boolean, Object],
      default: true,
    },
    /** easy autoplay : https://idangero.us/swiper/api/#autoplay */
    autoplay: {
      type: [Boolean, Object],
      default: false,
    },
    /** if true (and autoplay), display some progressbar for autoplay */
    progressBar: {
      type: Boolean,
      default: true,
    },
    /** Number of slides per view : 1 or `auto` */
    slidesPerView: {
      type: [Number, String],
      default: 'auto',
    },
    /** Distance between slides in px */
    spaceBetween: {
      type: Number,
      default: 0,
    },
    /** is slides centered */
    centeredSlides: {
      type: Boolean,
      default: true,
    },
    /** is swiper loop */
    loop: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      swiper: null,
      mounted: false,
    };
  },
  computed: {
    /* compute final options */
    _options() {
      return {
        loop: this.loop,
        centeredSlides: this.centeredSlides,
        slidesPerView: this.slidesPerView,
        spaceBetween: this.spaceBetween,
        pagination: this._pagination,
        navigation: this._navigation,
        autoplay: this._autoplay,
        threshold: 10,
        grabCursor: true,
        ...this.options,
      };
    },
    /* compute pagination to easy set up if pass `pagination` props to true */
    _pagination() {
      if (!this.mounted || !this.pagination) return {};

      if (this.pagination === true) {
        return {
          el: this.$refs.Pagination || get(this.$slots, 'pagination.0.elm'),
          clickable: true,
        };
      }
      return this.pagination;
    },
    /* compute navigation to easy set up if pass `navigation` props to true */
    _navigation() {
      if (!this.mounted || !this.navigation) return {};

      if (this.navigation === true) {
        return {
          nextEl: this.$refs.Next || get(this.$slots, 'next.0.elm'),
          prevEl: this.$refs.Prev || get(this.$slots, 'prev.0.elm'),
        };
      }
      return this.navigation;
    },
    /* compute autoplay to easy set up if pass `autoplay` props to true */
    _autoplay() {
      if (!this.autoplay) return false;

      if (this.autoplay === true) {
        return {
          delay: 3000,
          disableOnInteraction: false,
        };
      }
      return this.autoplay;
    },
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
      this.swiper = null;
    }
  },
  mounted() {
    // When dom change, create swiper
    // just to be sure we have our slides
    this.$nextTick(() => {
      this.mounted = true; // trigger computed (because they use $refs)
      if (this.$refs.Wrapper.children.length) {
        this.swiper = this.createSwiper();
      } else {
        this.observer = new MutationObserver(((/* mutations */) => {
          this.observer.disconnect();
          this.swiper = this.createSwiper();
        }));

        // Observe for dom change
        this.observer.observe(
          this.$refs.Wrapper,
          { childList: true, subtree: true },
        );
      }
    });
  },
  methods: {
    /**
     * create our swiper instance
     * stop autoplay on first interaction
     * @return {Object} Swiper instance
     */
    createSwiper() {
      // console.log('[Swiper] createSwiper', { ...this._options });

      // ensure `swiper-slide` class to slides
      each(this.$refs.Wrapper.children, (node) => {
        node.classList.add('swiper-slide');
      });


      const mySwiper = new Swiper(this.$el, {
        ...this._options,
      });

      if (this.progressBar && this.autoplay) {
        mySwiper.on('progress', this.animProgressBar);
      }

      return mySwiper;
    },

    animProgressBar() {
      const sec = Math.floor(this._autoplay.delay / 1000);
      const tlProgressBar = new TimelineMax();

      tlProgressBar
      .set(this.$refs.ProgressBar, { transformOrigin: 'left center', scaleX: 0 })
      .fromTo(this.$refs.ProgressBar, sec, { scaleX: 0 }, { scaleX: 1, ease: Power1.easeIn });
    },
  },
};
</script>

<template>
  <!-- Slider main container -->
  <div class="AbstractSwiper swiper-container">
    <!-- Additional required wrapper -->
    <component
      ref="Wrapper"
      :is="tag"
      class="swiper-wrapper">
      <!-- @slot Default - slides - will auto append 'swiper-slide' class -->
      <slot />
    </component>

    <!-- @slot pagination - need `pagination` props to true (default)  -->
    <div
      v-if="pagination === true"
      ref="Pagination"
      class="swiper-pagination"/>

    <!-- @TODO @slot progress-bar - need `progress-bar` props to true (default)  -->
    <div
      v-if="progressBar === true"
      ref="ProgressBar"
      class="swiper-progress-bar"/>

    <!-- @slot next - need `navigation` props to true (default)  -->
    <slot
      v-if="navigation === true"
      name="next">
      <button
        ref="Next"
        class="swiper-button-next _no-btn" />
    </slot>

    <!-- @slot prev - need `navigation` props to true (default)  -->
    <slot
      v-if="navigation === true"
      name="prev">
      <button
        ref="Prev"
        class="swiper-button-prev _no-btn" />
    </slot>

    <!-- If we need scrollbar -->
    <!-- <div class="swiper-scrollbar"/> -->
  </div>
</template>

<style lang="stylus" scoped>
  .swiper-pagination-bullet
    cursor pointer
    outline none

  .swiper-progress-bar
    background $c-accent
    absolute left bottom
    size 100% 8px
    z-index 2
    transform scaleX(0)

</style>

<story
  group="Ui|Swiper"
  name="default">
  <AbstractSwiper :style="{width:'100%'}">
    <li
      v-for="slide in [0,1,2,3,4,5]"
      :key="`slide-${slide}`"
      v-text="slide"
      :style="{height:'200px', textAlign:'center', border: '1px solid red', display:'flex', justifyContent:'center', alignItems:'center'}" />
  </AbstractSwiper>
</story>

<story
  group="Ui|Swiper"
  name="options props">
  <AbstractSwiper
    :options="{
      slidesPerView:3,
      centeredSlides:false,
      loop:false,
    }"
    :style="{width:'100%'}">
    <li
      v-for="slide in [0,1,2,3,4,5]"
      :key="`slide-${slide}`"
      v-text="slide"
      :style="{height:'200px', textAlign:'center', border: '1px solid red', display:'flex', justifyContent:'center', alignItems:'center'}" />
  </AbstractSwiper>
</story>

<story
  group="Ui|Swiper"
  name="shortcut props">
  <AbstractSwiper
    :pagination="false"
    :navigation="false"
    :autoplay="true"
    :slidesPerView="3"
    :style="{width:'100%'}">
    <li
      v-for="slide in [0,1,2,3,4,5]"
      :key="`slide-${slide}`"
      v-text="slide"
      :style="{height:'200px', textAlign:'center', border: '1px solid red', display:'flex', justifyContent:'center', alignItems:'center'}" />
  </AbstractSwiper>
</story>

<story
  group="Ui|Swiper"
  name="external pagination and custom nav (slot)">
  <div
    class="wrapper"
    :style="{width:'100%'}">

    <!-- external pagination is possible ;)  -->
    <ol ref="pagination" class="pagination" />

    <AbstractSwiper
      :pagination="{
        el:'.pagination', // use $refs.pagination instead
        clickable: true,
      }"
      :autoplay="true"
      :slidesPerView="3">
      <li
        v-for="slide in [0,1,2,3,4,5]"
        :key="`slide-${slide}`"
        v-text="slide"
        :style="{height:'200px', textAlign:'center', border: '1px solid red', display:'flex', justifyContent:'center', alignItems:'center'}" />

      <!-- override internal navigation -->
      <button slot="next" class="nav -next">NEXT</button>
      <button slot="prev" class="nav -prev">PREV</button>
    </AbstractSwiper>
  </div>
</story>
