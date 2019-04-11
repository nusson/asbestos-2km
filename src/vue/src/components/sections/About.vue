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
        indicators: true,
      });
    },
  },
};
</script>

<template>
  <div class="SectionAbout">
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
  .container
    position relative
    z-index 5
  .title
    f-style(title, $color: $c-white)
    margin-bottom 1em

  .content
    color $c-white
    responsive-prop(max-width, 800px 500px)
    +desktop()
      column-count 2

  .SectionAbout
    position relative
    background black url('~assets/images/section-hero.jpg') center center no-repeat
    background-size cover
    &:after
      content ''
      absolute 0
      background-color rgba(black, 0.3)
      z-index 2
    +mobile()
      >.container
        padding 60px 20px
        // .content
        //   x-padding(10px)
    +desktop()
      flexbox(center)
      >.container
        width 80vw
        min-height 80vh
        max-width 1024px
  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionAbout
    //
</style>
