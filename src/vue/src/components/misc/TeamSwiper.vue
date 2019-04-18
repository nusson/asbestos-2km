<!-- eslint-disable -->
<docs>
# TeamSwiper
> Same for both *crew* and *guests* section

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import { mapGetters } from 'vuex';
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
    return {};
  },
  computed: {
    ...mapGetters({
      isMobile: 'Interface/isMobile',
    }),
    options() {
      if (this.isMobile) {
        return {
          spaceBetween: 15,
          slidesPerView: 1.2,
        };
      }
      return {
        spaceBetween: 60,
      };
    },
  },
  mounted() {},
  methods: {},
};
</script>

<template>
  <UiSwiper
    :options="options"
    :centered-slides="true"
    :loop="true"
    :data-layout="layout"
    tag="ol"
    class="TeamSwiper swiper">
    <li
      v-for="({title, job, description, images}, index) in items"
      :key="`activity-${index}`"
      class="slide">
      <div class="slide-content">
        <div class="image-wrapper -big">
          <UiPicture
            :full="true"
            v-bind="images.big"
            class="picture -big"
            cover="cover" />
        </div>
        <figure class="figure">
          <div class="image-wrapper -small">
            <UiPicture
              v-bind="images.small"
              :full="true"
              class="picture -small"
              cover="cover" />
          </div>
          <figcaption class="caption">
            <h3
              class="title"
              v-text="title" />
            <p
              v-if="job"
              class="job"
              v-text="job" />
              <!-- <button class="action">+</button> -->
          </figcaption>
        </figure>
      </div>
    </li>
  </UiSwiper>
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
  .slide
    size 100%

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
      >.figure
        size 100%
        flex 1 1 100%
        x-margin(0px)
        >.image-wrapper
          ratio-box(4/3)
        >.caption
          margin-left 15px

  [data-layout="athletes"]
    .slide-content
      flex-direction row-reverse
      >.figure
        x-margin(0px, 10%)
      +tablet()
        justify-content space-between
        >.figure
          x-margin(0px)
      +mobile()
        .figure
          >.image-wrapper
            ratio-box(16/9)

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
