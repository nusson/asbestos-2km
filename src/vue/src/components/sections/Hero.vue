<!-- eslint-disable -->
<docs>
# SectionHero
> The hero section with bg video + title

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import { mapGetters } from 'vuex';
import FitText from 'utils/plugins/FitText';
import UiVideo from 'components/ui/Video';

export default {
  name: 'SectionHero',
  components: {
    UiVideo,
  },
  props: {
    title: {
      type: String,
      default: 'Asbestos 2.0',
    },
    subtitle: {
      type: String,
      default: 'Un Nouveau Record du Monde ! ',
    },
    video: {
      type: Object,
      default() {
        return {
          mobile: {
            demo: '/uploads/hero/hero-video-640.mp4', // () => import('/uploads/hero/hero-video-640.mp4').then(module => module.default),
            full: '/uploads/hero/hero-video-640.mp4', // () => import('/uploads/hero/hero-video-1280.mp4').then(module => module.default),
          },
          desktop: {
            demo: '/uploads/hero/hero-video-640.mp4', // () => import('/uploads/hero/hero-video-1280.mp4').then(module => module.default),
            full: '/uploads/hero/hero-video-640.mp4', // () => import('/uploads/hero/hero-video-1920.mp4').then(module => module.default),
          },
        };
      },
    },
  },
  computed: {
    ...mapGetters({
      isDesktop: 'Interface/isDesktop',
    }),
  },
  asyncComputed: {
    backgroundVideo() {
      if (this.isDesktop) {
        // return this.video.desktop.demo();
        return this.video.desktop.demo;
      }
      // return this.video.mobile.demo();
      return this.video.mobile.demo;
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.$refs.Title) return;
      FitText.fit(this.$refs.Title);
    });
  },
  methods: {},
};
</script>

<template>
  <section class="SectionHero _fullViewport">
    <div class="content">
      <h1
        ref="Title"
        class="title"
        v-text="title" />
      <p
        class="subtitle"
        v-text="subtitle" />
    </div>
    <UiVideo
      v-if="backgroundVideo"
      :src="backgroundVideo"
      :autoplay="true"
      :loop="true"
      :controls="false"
      class="background"/>
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
  .background
    absolute 0
    z-index 1

  .SectionHero
    flexbox(center)

  .content
    position relative
    z-index 5

  .title
    f-style(title, hero,
      $color:$c-white,
      $align:center)
    width 85vw
    max-width 1920px
  .subtitle
    margin-top 1em
    f-style(title, h2,
      $color:$c-white,
      $align:center)

  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionHero
    //
</style>
