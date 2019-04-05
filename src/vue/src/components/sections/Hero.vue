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
    video: {
      type: Object,
      default() {
        return {
          mobile: {
            demo: () => import('assets/videos/hero/tmp-hero-video-640.mp4').then(module => module.default),
            full: () => import('assets/videos/hero/tmp-hero-video-1280.mp4').then(module => module.default),
          },
          desktop: {
            demo: () => import('assets/videos/hero/tmp-hero-video-1280.mp4').then(module => module.default),
            full: () => import('assets/videos/hero/tmp-hero-video-1920.mp4').then(module => module.default),
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
        console.log('this.video.desktop', this.video.desktop);

        return this.video.desktop.demo();
      }
        console.log('this.video.desktop', this.video.mobile.demo());
      return this.video.mobile.demo();
    },
  },
  mounted() {
    console.log(this.isDesktop, this.backgroundVideo, this);

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
    f-style(title, hero)
    width 85vw
    max-width 1920px

  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionHero
    //
</style>
