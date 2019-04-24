<!-- eslint-disable -->
<docs>
# SectionEvent
> The event description page (place, date etc)

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import { Scene } from 'scrollmagic';
import { mapGetters } from 'vuex';
import SectionHeader from 'components/misc/SectionHeader';
import UiVideo from 'components/ui/Video/Figure';
// import Experiences from './Experience';

export default {
  name: 'SectionEvent',
  components: {
    SectionHeader,
    UiVideo,
    // Experiences,
  },
  props: {
    // title: {
    //   type: String,
    //   default: '',
    // },
    // description: {
    //   type: String,
    //   default: '',
    // },
    date: {
      type: String,
      default: '',
    },
    place: {
      type: Object,
      default() {
        return {
          city: '',
          state: '',
        };
      },
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    video: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      pinVideoScene: null,
    };
  },
  computed: {
    ...mapGetters({
      viewport: 'Interface/viewport',
    }),
    address() {
      const { city, state } = this.place;
      return `${city}, ${state}`;
    },
  },
  mounted() {
    const unwatchReady = this.$watch('viewport', ({ width }) => {
      if (width < 800 || this.pinVideoScene) {
        if (this.pinVideoScene) {
          // @todo destroy
        }
        return;
      }
      this.$nextTick(() => {
        this.pinVideoScene = this.createPinVideoScene();
        unwatchReady();
      });
    }, { immediate: true });
  },
  methods: {
    createPinVideoScene() {
      const height = this.$el.offsetHeight - this.$refs.Video.$el.offsetHeight - 60 - 20;
      const duration = (height / this.viewport.height) * 100;
      const scene = new Scene({
        triggerElement: this.$refs.VideoWrapper,
        // triggerElement: this.$el,
        // duration: '200%',
        duration: `${duration}%`,
        triggerHook: 0,
        offset: -60,
        // ...options,
      })
        .setPin(this.$refs.Video.$el);
        // .setPin(this.$refs.VideoWrapper);
        // .setTween(slide, { y: '50%', ease: Linear.easeNone });
      this.$store.dispatch('ScrollMagic/ADD_SCENE', {
        scene,
        indicators: false,
      });
      return scene;
    },
  },
};
</script>

<template>
  <section class="SectionEvent section">
    <div class="col -left">
      <ol class="list steps">
        <li
          v-for="({ title, description, map }, index) in items"
          :key="`step-${index}`"
          class="item step">
          <div>
            <SectionHeader
              :title="title"
              :description="description"
              tag="div"
              class="header" />
            <figure
              v-if="map"
              class="map-wrapper">
              <div class="map"/>
              <figcaption class="caption">
                <p
                  class="address"
                  v-html="map.address" />
                <a
                  :href="map.cta.href"
                  v-text="map.cta.label" />
              </figcaption>
            </figure>
          </div>
        </li>
      </ol>

    </div>
    <div
      ref="VideoWrapper"
      class="col -right">
      <UiVideo
        v-if="video"
        ref="Video"
        v-bind="video"
        :muted="false"
        class="video" />
    </div>
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
  .SectionEvent
    +above($kff-mq-tablet-portrait + 1)
      flexbox(row, $align: flex-start)
      safe-content()
      .video
        max-height 80vh
    +below($kff-mq-tablet-portrait)
      .header
        safe-content()
      .col.-left
        x-padding(0)
        width 100%
        padding-bottom 30px

    >.col
    >>> >.scrollmagic
      flex-basis 50%
      &.-left
        margin-right 40px

  .step
    // height 80vh
    // flexbox(center)
    responsive-prop(padding-top, 10vmin 60px)
    &:first-child
      // responsive-prop(padding-top, 30vh 0px)
      padding-top 0px

  .header
    padding 0
    margin 0
    >>> .date
    >>> .address
      f-style(title, h2)

  .map-wrapper
    position relative
    responsive-prop(margin-top, 60px 40px 30px)
    ratio-box(4/3)
    width 100%
    flexbox(center)

    .map
      absolute 0
      background-color rgba(tomato, 0.5)
    .caption
      position relative
      z-index 2

  .video
    // width (864px / 2)
    max-width 100%
    ratio-box(864/1080)

  //  ===DEBUG===
  .SectionEvent
    // size var(--viewport-width) var(--viewport-height)
    // flexbox(center)
    background-color rgba(white, 1)
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionEvent
    //
</style>
