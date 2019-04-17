<!-- eslint-disable -->
<docs>
# TeamSwiper
> Same for both *crew* and *guests* section

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
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
  mounted() {},
  methods: {},
};
</script>

<template>
  <UiSwiper
    :space-between="60"
    :centered-slides="true"
    :loop="true"
    :data-layout="layout"
    tag="ol"
    class="TeamSwiper swiper">
    <li
      v-for="({title, description, images}, index) in items"
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
              class="description"
              v-text="description" />
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

  .slide-content
    safe-content()

  .image-wrapper
    position relative


  .figure
    flexbox(column)
    flex 0 1 30%
    >.image-wrapper
      flex-grow 0
      // +above($mq-mobile + 1)
      // ratio-box(1)
    .caption
      margin-top 20px
      color $c-dark
      flex-grow 1
      .title
        f-style(title, h3)
      .description
        margin-top 0.2em
        // display none

  //  ===DESKTOP===
  +not-mobile()
    .slide-content
      flexbox(row, $justify:center)
      >.figure
        margin-left 10%

    .image-wrapper.-big
      ratio-box(1)
      flex 0 1 60vmin

    .figure
      ratio-box(1)

  //  ===MOBILE===
  +mobile()
    .slide-content
      // height 50vmin
      .image-wrapper.-big
        display none
      >.figure
        size 100%
        flex 1 1 100%
        // flexbox(row)
        // flex-direction row
        // flexbox(column)
        // align-items flex-start
        x-margin(0px)
        >.image-wrapper
          ratio-box(4/3)
          // height 50vmin
        >.caption
          margin-left 15px

  //  ===ATHLETES===
  // [data-layout="crew"]
  //   +mobile()
  //     .figure >.caption
  //       .title, .description
  //         display inline

  [data-layout="athletes"]
    .slide-content
      // flexbox(row, $direction:row-reverse, $justify:flex-end)
      flex-direction row-reverse
      >.figure
        x-margin(0px, 10%)
      +tablet()
        justify-content space-between
        >.figure
          x-margin(0px)
      +mobile()
        .figure
          // flex-direction row-reverse
          >.image-wrapper
            ratio-box(16/9)
            // x-margin(0px, 15px)
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
