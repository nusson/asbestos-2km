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
import UiPicture from 'components/ui/Picture';
import UiLightbox from 'components/ui/Lightbox';
import UiButtonScrollDown from 'components/ui/button/ScrollDown';

export default {
  name: 'SectionHero',
  components: {
    UiVideo,
    UiPicture,
    UiLightbox,
    UiButtonScrollDown,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    subtitle: {
      type: String,
      default: null,
    },
    showVideo: {
      type: Boolean,
      default: null,
    },
    title_image: {
      type: String,
      default: null,
    },
    bg_image: {
      type: String,
      default: null,
    },
    videos: {
      type: Object,
      default() {
        return {
          main: null,
          background: null,
        };
      },
    },
  },
  computed: {
    ...mapGetters({
      isDesktop: 'Interface/isDesktop',
      isMobile: 'Interface/isMobile',
      lightboxType: 'Lightbox/type',
    }),
    isLightboxOpen() {
      return this.lightboxType === 'video';
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.$refs.Title) return;
      FitText.fit(this.$refs.Title);
    });
  },
  methods: {
    play() {
      this.$store.dispatch('Lightbox/OPEN', 'video');
      // this.$refs.VideoBg.stop();
      // this.$refs.VideoMain.play();
    },
  },
};
</script>

<template>
  <section class="SectionHero _fullViewport">
    <div class="content">
      <div class="flex-group">
        <UiPicture
          v-if="title_image"
          :src="title_image"
          :alt="`${title} - ${subtitle}`"
          class="title -image"
        />
        <!-- <h1
          ref="Title"
          class="title"
          v-text="title" />
        <p
          class="subtitle"
          v-text="subtitle" /> -->

        <button
          class="_no-btn cta"
          @click.prevent="play">
          <span
            class="text"
            v-text="$t('play')"/>
        </button>
      </div>
      <UiButtonScrollDown class="flex-spacer scroll" />
    </div>
    <uiPicture
      v-if="isMobile"
      ref="ImageBg"
      :src="bg_image"
      cover="cover"
      class="background -image"
    />
    <UiVideo
      v-else-if="videos.background"
      ref="VideoBg"
      v-bind="videos.background"
      :autoplay="true"
      :preload="isDesktop ? 'auto' : 'metadata'"
      :loop="true"
      :controls="false"
      class="background -video"/>
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
    &:before
      content ''
      absolute 0
      background-color rgba($c-black, 0.25)
      z-index 50
      +mobile()
        background-color rgba($c-white, 0.2)
    +mobile()
      >>>.image
        object-position 100% 50%

  .SectionHero
    flexbox(center)
    text-align center

  .content
    position relative
    z-index 5
    flexbox(column)
    y-padding(10vh)
    height 100%
    >.flex-group
      flexbox(column)
      flex 0 1 auto
    >.flex-spacer
      flex 0 0 auto


  .title.-image
    max-width 700px
    width 80%
    x-margin auto
    responsive-prop(max-height, 60vh 50vh 40vh)

  .scroll
    responsive-prop(margin-top, 40px 40px 20px)
    f-style(title, h3)
    color $c-white
    x-margin(auto)
    +mobile()
      color $c-white
      >>>svg
        fill $c-white

  .cta
    responsive-prop(margin-top, 40px 20px)
    border-color $c-white
    color $c-white
    // opacity 0.6
    +mobile()
      color $c-accent
      border-color $c-accent
    &:after
      border-color $c-white
      +mobile()
        border-color $c-accent
    .no-touchevents &:hover
      color $c-accent
      border-color $c-accent
      // opacity 1
      &:after
        // border-width 3px
        border-color $c-accent


  // .title
  //   display inline-block
  //   margin 0 auto
  //   f-style(title, hero,
  //     $color:$c-white,
  //     $align:center)
  //   width 85vw
  //   max-width 1920px

  // .subtitle
  //   safe-content()
  //   margin-top 1em
  //   f-style(title, h2,
  //     $color:$c-white,
  //     $align:center)

  // .btn
  //   // margin 120px auto 0
  //   transform scale(0.8)
  //   x-margin(auto)
  //   // responsive-prop(margin-top, 120px 80px 60px)
  //   // responsive-prop(margin-bottom, 120px 40px 0px)

  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionHero
    //
</style>


<i18n>
{
  "fr": {
    "play": "Voir la vidéo"
  },
  "en": {
    "play": "Play"
  }
}
</i18n>
