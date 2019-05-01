<!-- eslint-disable -->
<docs>
# UiSwiperNavigation
> 

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import ChevronIcon from 'assets/svg/chevron.svg?vue';

export default {
  name: 'UiSwiperNavigation',
  components: {
    ChevronIcon,
  },
  props: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<template>
  <div class="UiSwiperNavigation">
    <div
      ref="Pagination"
      class="pagination swiper-pagination" />
    <button
      ref="Prev"
      class="prev nav-btn _no-btn" >
      <!-- <ChevronIcon class="icon -reverse" /> -->
      <i class="icon">&lt;</i>
    </button>
    <button
      ref="Next"
      class="next nav-btn _no-btn" >
      <!-- <ChevronIcon class="icon" /> -->
      <i class="icon">&gt;</i>
    </button>
  </div>
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
  .UiSwiperNavigation
    position relative
    height 44px
    +mobile()
      margin-top 20px

  .nav-btn
    background none
    size auto
    color $c-accent
    cursor pointer
    +above($mq-mobile + 1)
      absolute bottom 0
    .no-touchevents &
      color $c-dark
      opacity 0.6
      kff-transition()
      &:hover
        color $c-accent
        opacity 1
    &.prev
      left 40%
    &.next
      right 6px
    .icon
      f-style(title)
      font-size 3.6rem !important
      line-height 0.6
      transform scaleX(0.6)

  .pagination
    position relative
    flex 1 1 100%
    max-width 130px
    +mobile()
      margin-right 20px

  .UiSwiperNavigation
    +above($mq-mobile +1)
      flexbox(row)
      .nav-btn
        relative auto


  .UiSwiperNavigation >>>.pagination
    white-space nowrap
    .swiper-pagination-bullet
      margin 0 3px
      size 20px 6px
      border-radius 2px
      kff-transition all .2s
      opacity 0.2
      transform scaleX(0.2)
      background-color $c-accent
      cursor pointer
      &.swiper-pagination-bullet-active
        transform scaleX(1)
        opacity 1
        background-color $c-accent
      &.swiper-pagination-bullet-active-prev
      &.swiper-pagination-bullet-active-next
        transform scaleX(0.6)
        opacity 0.4
      &.swiper-pagination-bullet-active-prev-prev
      &.swiper-pagination-bullet-active-next-next
        transform scaleX(0.4)
        opacity 0.1
      .no-touchevents &
        background-color $c-dark
        kff-transition(background-color)
        &:hover
        &.swiper-pagination-bullet-active
          background-color $c-accent
  // .next
  //   absolute top 50% left $gutters[3]
  // .next
  //   absolute top 50% left $gutters[3]
  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .UiSwiperNavigation
    //
</style>
