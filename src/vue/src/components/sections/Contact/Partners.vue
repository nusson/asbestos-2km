<!-- eslint-disable -->
<docs>
# SectionPartnersSmall
> second partners - near footer   

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import { mapGetters } from 'vuex';
// import { TimelineMax, Power4 } from 'gsap';
// import { Scene } from 'scrollmagic';
import UiPicture from 'components/ui/Picture';
import UiSwiper from 'components/ui/Swiper';

export default {
  name: 'SectionPartnersSmall',
  components: { UiPicture, UiSwiper },
  props: {
    title: {
      type: String,
      default: 'Asbestos 2.0',
    },
    items: {
      type: Array,
      default() {
        return [];
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
    options() {
      return {
        loop: true,
        slidesPerView: 'auto',
        freeMode: true,
        speed: 4000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        breakpoints: {
          [this.mqMobile]: {
            speed: 1500,
          },
        },
      };
    },
  },
};
</script>

<template>
  <section
    v-if="items.length"
    class="SectionPartnersSmall">
    <header class="header">
      <h1
        ref="Title"
        class="title"
        v-text="title"/>
    </header>

    <UiSwiper
      :options="options"
      :centered-slides="true"
      :pagination="false"
      :navigation="false"
      tag="ol"
      class="swiper partners list">
      <li
        v-for="(partner, index) in items"
        :key="`partner-${index}`"
        class="item">
        <figure
          ref="Partner"
          class="partner">
          <a
            :href="partner.url"
            target="_blank"
            class="partner link">
            <UiPicture
              v-bind="partner.image"
              class="logo"
              cover="contain"/>
          </a>
          <figcaption
            class="caption"
            v-text="partner.name"/>
        </figure>
      </li>
    </UiSwiper>
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

  //  ===LAYOUT===
  .SectionPartnersSmall
    color $c-white

  .header
    flexbox(row, $justify:flex-start)
    safe-content()
    >.title
      f-style(title, h1)

  .list.partners
    responsive-prop(margin-top, 60px 40px 10px)
    flexbox(row, $justify:flex-start)
    // max-width $kff-w-max
    x-margin(auto)
    >>>.item
      flex 0 0 200px
      x-margin(40px)
      max-width 250px
      +below($mq-mobile)
        flex-basis 80%
        x-margin(15%)

  .partner
    flexbox(column)
    .logo
      ratio-box(5/3)
      flex 1 0 100%
    .caption
      flex 0 1 0
      overflow hidden

  .swiper
    >>> .swiper-wrapper
      transition-timing-function linear
      // transition-duration 1500ms !important
      +below($mq-mobile)
        transition-timing-function easing('out-expo')
  //  ===DEBUG===
</style>
