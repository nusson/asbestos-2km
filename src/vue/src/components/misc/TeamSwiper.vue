<!-- eslint-disable -->
<docs>
# TeamSwiper
> Same for both *crew* and *guests* section

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import { mapGetters } from 'vuex';
import { TweenMax, Power2 } from 'gsap';
import { uniqueId } from 'lodash';
import UiSwiper from 'components/ui/Swiper';
import UiPicture from 'components/ui/Picture';

export default {
  name: 'TeamSwiper',
  components: {
    UiSwiper,
    UiPicture,
  },
  props: {
    layout: {
      type: String,
      default: 'crew',
    },
    items: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      showDrag: false,
      mousePosition: {
        x: 0,
        y: 0,
      },
      handlers: {
        move: (event) => {
          const { top, left } = this.$el.getBoundingClientRect();
          TweenMax.to(this.mousePosition, 0.5, {
            x: event.clientX - left - 75,
            y: event.clientY - top - 75,
            ease: Power2.easeOut,
          });
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      isMobile: 'Interface/isMobile',
      mqMobile: 'Interface/mqMobile',
    }),
    _id() {
      return uniqueId('TeamSwiper_');
    },
    options() {
      return {
        spaceBetween: 60,
        loop: true,
        slidesPerView: 'auto',
        breakpoints: {
          [this.mqMobile]: {
            // spaceBetween: 0,
            spaceBetween: 15,
            // slidesPerView: 1,
            slidesPerView: 'auto',
          },
        },
      };
    },
  },
  watch: {
    showDrag(show) {
      if (show) {
        TweenMax.to(this.$refs.Drag, 0.4, { autoAlpha: 0.8 });
        window.addEventListener('mousemove', this.handlers.move);
        return;
      }
      TweenMax.to(this.$refs.Drag, 0.4, { autoAlpha: 0 });
      window.removeEventListener('mousemove', this.handlers.move);
    },
  },
  mounted() {},
  methods: {
  },
};
</script>

<template>
  <div
    :id="_id"
    class="TeamSwiper">
    <div
      ref="Drag"
      :style="`transform: translate(${mousePosition.x}px, ${mousePosition.y}px)`"
      class="drag">
      <span class="text">DRAG</span>
    </div>
    <UiSwiper
      :id="_id"
      :options="options"
      :centered-slides="true"
      :loop="false"
      :data-layout="layout"
      :pagination="false"
      :navigation="false"
      tag="ol"
      class="swiper"
      @mouseenter.native="showDrag = true"
      @mouseleave.native="showDrag = false">
      <li
        v-for="({title, job, description, images, image, place, name, link}, index) in items"
        :key="`activity-${index}`"
        class="slide">
        <!-- <div class="slide-content"> -->
        <!-- <div
            v-if="images && images.big"
            class="image-wrapper -big">
            <UiPicture
              :full="true"
              v-bind="images.big"
              class="picture -big"
              cover="cover" />
          </div> -->
        <figure class="slide-content figure">
          <div class="image-wrapper -big">
            <UiPicture
              v-bind="image || images.big"
              :full="true"
              class="picture -big"
              cover="cover" />
          </div>
          <figcaption class="caption">
            <h3
              v-if="title"
              class="title"
              v-text="title" />
            <h3
              v-else
              class="title">

              <component
                :is="link? 'a' : 'strong'"
                :href="link"
                target="_blank"
                class="link strong"
                v-text="name" />
              <br><span
                class="normal"
                v-text="place" />
            </h3>
            <p
              v-if="description"
              class="description"
              v-html="description" />
            <!-- <button class="action">+</button> -->
            <a
              v-if="link"
              :href="link"
              target="_blank"
              class="link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"/>
              </svg>
            </a>
          </figcaption>
        </figure>
        <!-- </div> -->
      </li>
    </UiSwiper>

    <!-- <UiSwiperNavigation class="navigation" /> -->
  </div>
</template>

<style lang="stylus" scoped>
  /**
  * TABLE OF CONTENT
  * --------
  *  - LAYOUT
  *  - DESKTOP
  *  - MOBILE
  *  - ATHLETES
  *  - DEBUG
  *  - NO_SCOPE
  */

  //  ===LAYOUT===
  .TeamSwiper
    position relative
    safe-content()
    >>>.swiper-container
      overflow visible

    .drag
      absolute top left
      transform translate(-50%, -50%)
      opacity 0
      z-index 100
      f-style(title, h3)
      background rgba($c-white, 0.3)
      padding 1em
      border-radius 50%
      overflow hidden
      size 150px
      flexbox(center)
      color $c-accent
      pointer-events none

  // .navigation
  //   position absolute
  //   right $gutters[2]
  //   z-index 10
  //   +tablet()
  //     right 40px
  //   +mobile()
  //     display none !important
  //     // bottom -17px
  //     // right $gutters[2]
  //     position relative
  //     flexbox(center)
  //   +above($mq-mobile + 1)
  //     bottom 5px
  //     z-index 10
  //     right 80px
  //   +above(1300px)
  //     right 120px
  .link
    color $c-accent
    fill $c-accent
    size 20px
    display block
    margin-top 10px
    &.strong
      display inline-block
      white-space nowrap
      color $c-dark
    .no-touchevents &
      fill $c-dark
      kff-transition(fill)
      &:hover
        fill $c-accent
  .slide
    size 100%
    +mobile()
      max-width calc('100% - 30px')
    opacity 1
    kff-transition(opacity)
    &:not(.swiper-slide-active)
      +not-mobile()
        opacity 0

  .image-wrapper
    position relative

  .figure
    // flexbox(column)
    // flex 0 1 30%
    // >.image-wrapper
    //   flex-grow 0
  .caption
    margin-top 20px
    color $c-dark
    flex-grow 1
    .title
      f-style(title, h3)
      .normal
        f-style(title, h4)
    .description
      margin-top 0.2em
      f-style(text, card)

  //  ===DESKTOP===
  +not-mobile()
    .slide-content
      // safe-content()
      flexbox(row, $justify:center)

    .image-wrapper.-big
      ratio-box(1)
      flex 1 1 60vmin
      max-width 60vmin

    .caption
      margin-left 10%
      flex 1 1 40vmin
      min-width 300px
      +below(1024px)
        margin-left 20px

  //  ===MOBILE===
  +mobile()
    .slide-content
      .image-wrapper.-small
        display none
    .figure
      size 100%
      flex 1 1 100%
      x-margin(0px)
    .image-wrapper
      ratio-box(4/3)
    .caption
      x-margin($gutters[2])
    .title
      max-width calc('100% - 130px')

  // [data-layout="athletes"]
  //   .slide-content
  //     flex-direction row-reverse
  //     >.figure
  //       x-margin(0px, 10%)
  //     +tablet()
  //       justify-content space-between
  //       >.figure
  //         x-margin(0px)
  //     // +mobile()
  //     //   .figure
  //     //     >.image-wrapper
  //     //       ratio-box(16/9)

  //  ===DEBUG===
  // figure
  //   background-color rgba(tomato, 0.2)
  // .image-wrapper.-big
  //   background-color rgba(yellow, 0.2)
  // .swiper
  //   // max-height 60vmin
  //   background-color rgba(teal, 0.2)
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .TeamSwiper
    //
</style>
