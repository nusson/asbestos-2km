<!-- eslint-disable -->
<docs>
# SectionEvent
> The event description page (place, date etc)

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
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
    return {};
  },
  computed: {
    address() {
      const { city, state } = this.place;
      return `${city}, ${state}`;
    },
  },
  mounted() {},
  methods: {},
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
    <div class="col -right">
      <UiVideo
        v-if="video"
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
    +not-mobile()
      flexbox(row, $align: flex-start)
      safe-content()
    >.col
      flex-basis 50%
      &.-left
        margin-right 40px
        +mobile()
          safe-content()
          padding-bottom 30px

  .step
    // height 80vh
    // flexbox(center)
    responsive-prop(padding-top, 10vmin 60px)
    &:first-child
      responsive-prop(padding-top, 30vh 0px)

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
    max-height 80vh
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
