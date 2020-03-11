<!-- eslint-disable -->
<docs>
# SectionPartners
> Main partnairs band - just after hero

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import { TimelineMax, Power4 } from 'gsap';
import { Scene } from 'scrollmagic';
import UiPicture from 'components/ui/Picture';

export default {
  name: 'SectionPartners',
  components: { UiPicture },
  props: {
    title: {
      type: String,
      default: 'Asbestos 2.0',
    },
    primary: {
      type: Array,
      default() {
        return [];
      },
    },
    secondary: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.initScrollMagic();
  },
  methods: {
    initScrollMagic() {
      const from = { opacity: 0.01, y: 15, scale: 0.9 };
      const to = {
        scale: 1,
        opacity: 1,
        y: 0,
        ease: Power4.easeOut,

      };
      const tl = new TimelineMax()
        .fromTo(this.$refs.Title, 0.4, from, to, 0.2)
        .staggerFromTo(this.$refs.PartnerPrimary, 0.4, from, {
          ...to,
          cycle: {
            delay: i => Math.abs(Math.floor(this.$refs.PartnerPrimary.length / 2) - i) * 0.05,
          },
        }, 0, 0.3)
        .staggerFromTo(this.$refs.PartnerSecondary, 0.4, from, {
          ...to,
          cycle: {
            delay: i => Math.abs(Math.floor(this.$refs.PartnerSecondary.length / 2) - i) * 0.05,
          },
        }, 0, 0.3);

      const scene = new Scene({
        triggerElement: this.$el,
        triggerHook: 0.8,
      })
      .setTween(tl);

      this.$store.dispatch('ScrollMagic/ADD_SCENE', {
        scene,
        indicators: false,
      });
    },
  },
};
</script>

<template>
  <section
    v-if="primary.length"
    class="SectionPartners">
    <header class="header">
      <h1
        ref="Title"
        class="title"
        v-text="title"/>
    </header>
    <ol class="partners list -primary">
      <li
        v-for="(partner, index) in primary"
        :key="`partner-${index}`"
        class="item">
        <figure
          ref="PartnerPrimary"
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
    </ol>
    <ol class="partners list -secondary">
      <li
        v-for="(partner, index) in secondary"
        :key="`partner-${index}`"
        class="item">
        <figure
          ref="PartnerSecondary"
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
    </ol>
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
  .SectionPartners
    // padding 10em
    background-color $c-white
    y-padding(3em)

  .header
    flexbox(row, $justify:center)
    >.title
      f-style(title, h3, $align:center)

  .list.partners
    margin-top 40px
    flexbox(row, $justify:space-evenly)
    max-width $kff-w-max
    x-margin(auto)
    +below($mq-mobile)
      margin-top 20px
      flexbox(column, $justify:space-around)
      max-width 200px
      .item
        margin-left 0 !important
    >.item
      // x-margin(40px)
      flex-basis 25%
      max-width 200px
      .-primary&
        max-width 300px
        flex-basis 40%
      // +.item
      //   margin-left 10%

  .partner
    flexbox(column)
    .logo
      ratio-box(5/3)
      flex 1 0 100%
    .caption
      flex 0 1 0
      overflow hidden

  //  ===DEBUG===
</style>
