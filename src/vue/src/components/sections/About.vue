<!-- eslint-disable -->
<docs>
# SectionAbout
> Section about - the 2nd one

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import { TimelineMax, Power2 } from 'gsap';
import { Scene } from 'scrollmagic';
import { mapGetters } from 'vuex';

export default {
  name: 'SectionAbout',
  components: {},
  props: {
    title: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isDesktop: 'Interface/isDesktop',
    }),
  },
  mounted() {
    this.initScrollMagic();
  },
  methods: {
    initScrollMagic() {
      const targets = [
        this.$refs.Title,
        this.$refs.Content,
        ...this.$refs.Content.querySelectorAll('p'),
      ];

      const from = { autoAlpha: 0, y: 15 };
      const to = {
        autoAlpha: 1,
        y: 0,
        ease: Power2.easeOut,
      };
      const tl = new TimelineMax()
        .staggerFromTo(targets, 0.8, from, to, 0.05, 0);

      const triggerElement = '.trigger-sm-about';
      const scene = new Scene({
        triggerElement,
        triggerHook: this.isDesktop ? 0.4 : 0.8,
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
  <div class="SectionAbout section">
    <div class="container">
      <header class="header">
        <h2
          ref="Title"
          class="title"
          v-text="title"/>
      </header>
      <div
        ref="Content"
        class="content _wysiwyg"
        v-html="content" />
    </div>
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

  .SectionAbout
    position relative
    background black url('/uploads/section-hero.jpg') center 100% no-repeat
    // background black url('/uploads/Photo en haut de la page complètement.jpg') center center no-repeat
    background-size cover
    &:after
      content ''
      absolute 0
      background-color rgba(black, 0.3)
      z-index 2
    .container
      position relative
      z-index 5
      width 100%
      safe-content()
      // padding-top 10vh
      responsive-prop(padding-top, 20vh 20vh 0px)

  .title
    f-style(title, h1, $color: $c-white)

  .content
    color $c-white
    margin-top 0.2em
    f-style(text, $color: $c-white)
    responsive-prop(max-width, 800px 700px 500px)
    +not-mobile()
      column-count 2

  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionAbout
    //
</style>
