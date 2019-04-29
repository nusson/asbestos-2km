<!-- eslint-disable -->
<docs>
# TeamSwiper
> Same for both *crew* and *guests* section

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import { mapGetters } from 'vuex';
import { uniqueId } from 'lodash';
import UiSwiper from 'components/ui/Swiper';
import UiSwiperNavigation from 'components/ui/Swiper/Navigation';
import UiPicture from 'components/ui/Picture';

export default {
  name: 'TeamSwiper',
  components: {
    UiSwiper,
    UiPicture,
    UiSwiperNavigation,
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
    return {};
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
  mounted() {},
  methods: {},
};
</script>

<template>
  <div
    :id="_id"
    class="TeamSwiper">
    <UiSwiper
      :id="_id"
      :options="options"
      :navigation="{
        nextEl: `#${_id} .next`,
        prevEl: `#${_id} .prev`,
      }"
      :pagination="{
        el: `#${_id} .pagination`,
        dynamicBullets: true,
      }"
      :centered-slides="true"
      :loop="false"
      :data-layout="layout"
      tag="ol"
      class="swiper">
      <li
        v-for="({title, job, description, images, image, place, name, link}, index) in items"
        :key="`activity-${index}`"
        class="slide">
        <div class="slide-content">
          <div
            v-if="images && images.big"
            class="image-wrapper -big">
            <UiPicture
              :full="true"
              v-bind="images.big"
              class="picture -big"
              cover="cover" />
          </div>
          <figure class="figure">
            <div class="image-wrapper -small">
              <UiPicture
                v-bind="image || images.small"
                :full="true"
                class="picture -small"
                cover="cover" />
            </div>
            <figcaption class="caption">
              <h3
                v-if="title"
                class="title"
                v-text="title" />
              <a v-else class="title" :href="link">
                <strong class="strong" v-text="name" />
                <br><span class="normal" v-text="place" />
              </a>
              <p
                v-if="description"
                class="description"
                v-text="description" />
                <!-- <button class="action">+</button> -->
            </figcaption>
          </figure>
        </div>
      </li>
    </UiSwiper>

    <UiSwiperNavigation class="navigation" />
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

  .navigation
    position absolute
    right $gutters[2]
    z-index 10

    +tablet()
      right 40px
    +mobile()
      bottom -17px
      right $gutters[2]
    +above($mq-mobile + 1)
      bottom 5px
      z-index 10
      right 80px
    +above(1300px)
      right 120px

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
    flexbox(column)
    flex 0 1 30%
    >.image-wrapper
      flex-grow 0
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

  //  ===DESKTOP===
  +not-mobile()
    .slide-content
      safe-content()
      flexbox(row, $justify:center)
      >.figure
        margin-left 10%

    .image-wrapper.-big
      ratio-box(1)
      flex 0 1 60vmin

    .figure >.image-wrapper
      ratio-box(1)

  //  ===MOBILE===
  +mobile()
    .slide-content
      .image-wrapper.-big
        display none
    .figure
      size 100%
      flex 1 1 100%
      x-margin(0px)
    .image-wrapper
      ratio-box(4/3)
    .caption
      margin-left $gutters[2]
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
