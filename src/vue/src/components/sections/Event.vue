<!-- eslint-disable -->
<docs>
# SectionEvent
> The event description page (place, date etc)

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import UiVideo from 'components/ui/Video/Figure';

export default {
  name: 'SectionEvent',
  components: {
    UiVideo,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
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
  <section class="SectionEvent">
    <div class="content">
      <div class="col -left">
        <header>
          <h2
            class="title"
            v-text="title"/>
        </header>
        <p class="text">
          <strong
            class="date"
            v-text="date" />
          <strong
            class="address"
            v-text="address" />
        </p>
      </div>
      <div class="col -right">
        <UiVideo
          v-if="video"
          v-bind="video"
          :muted="true"
          class="video" />
      </div>
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
    responsive-prop(max-width, 1280px 800px)
    responsive-prop(padding, (80px 20px) 20px)
    center-margin()
    background-color $c-white

  .content
    flexbox(row)
    >.col
      flex-basis 50%

  .date,
  .address,
  .title
    f-style(title)
    display block
    text-align center

  .address,
  .date
    margin-top 2em


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
