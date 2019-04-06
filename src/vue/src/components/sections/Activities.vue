<!-- eslint-disable -->
<docs>
# SectionActivities
> swiper of activities cards that stand be during the event

@author Nicolas Husson <hello@nusson.ninja>

## @todo

- [ ] better integration
- [ ] toggle description
- [ ] nice drag effect (orford)
</docs>
<!-- eslint-enable -->

<script>
import UiSwiper from 'components/ui/Swiper';
import UiPicture from 'components/ui/Picture';

export default {
  name: 'SectionActivities',
  components: {
    UiSwiper,
    UiPicture,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<template>
  <section class="SectionActivities">
    <header class="header">
      <h2
        class="title"
        v-text="title"/>
    </header>
    <UiSwiper
      v-if="items"
      :space-between="20"
      :loop="true"
      tag="ol"
      class="swiper">
      <li
        v-for="(item, index) in items"
        :key="`activity-${index}`"
        class="slide">
        <article class="article -activity">
          <header class="header">
            <h3
              class="title"
              v-text="item.title" />
            <p
              :class="{
                short: !item.isActive,
                full: item.isActive
              }"
              class="description"
              v-text="item.description[item.isActive ? 'full' : 'short']"/>
          </header>
          <UiPicture
            :src="item.image"
            :full="true"
            class="picture"
            cover="cover" />
          <footer class="footer">
            <button class="action">+</button>
          </footer>
        </article>
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
  .swiper
    padding 7px
  .slide
    position relative
    ratio-box(2/3)
    width 400px
    box-shadow: 2px 2px 5px rgba($c-dark, 0.4);

  .article
    absolute 0
    .picture
      absolute 0
      bottom 15%
    >.header
      absolute false 0 0 0
      background-color $c-white
      color $c-dark
      z-index 2
      padding 20px
      min-height 15%
      .title
        f-style(title, h3)
        margin-bottom 1em

  .SectionActivities
    background-color $c-white
    y-padding 80px
    >.header
      max-width 1280px
      width 80%
      margin-bottom 2em
      center-margin()
      >.title
        f-style(title)

  //  ===DEBUG===
  .SectionActivities
    // size var(--viewport-width) var(--viewport-height)
    // flexbox(center)
    // background-color rgba(aquamarine, 0.2)
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionActivities
    //
</style>
