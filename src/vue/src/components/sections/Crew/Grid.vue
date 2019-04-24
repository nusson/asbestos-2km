<!-- eslint-disable -->
<docs>
# SectionCrewGrid
> 

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import UiPicture from 'components/ui/Picture';

export default {
  name: 'SectionCrewGrid',
  components: {
    UiPicture,
  },
  props: {
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
  <ul
    class="SectionCrewGrid list">
    <li
      v-for="(item, index) in items"
      :key="`grid-${index}`"
      class="item">
      <figure
        class="figure"
        @click="toggle(index)">
        <div class="background">
          <UiPicture
            v-bind="item.image"
            :full="true"
            class="picture"
            cover="cover" />
        </div>
        <caption class="caption">
          <h3
            class="title"
            v-text="item.title" />
          <p
            class="description -full _wysiwyg"
            v-html="item.description"/>
        </caption>
      </figure>
    </li>
  </ul>
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
  .SectionCrewGrid
    safe-content()
    flexbox($align:flex-start, $justify:flex-start, $wrap:wrap)
    >.item
      flex 1 1 auto
      width calc('33% - 40px')
      max-width calc('33% - 23px')
      +tablet()
        max-width calc('33% - 10px')
      // ratio-box(1)
      &:nth-child(3n)
      &:nth-child(3n-1)
        // background-color tomato
        responsive-prop(margin-left, $gutters)
      &:nth-child(3n + 4)
      &:nth-child(3n + 5)
      &:nth-child(3n + 6)
        background-color tomato
        responsive-prop(margin-top, $gutters)

  .figure
    // absolute 0
    // flexbox(column)
  .background
    // absolute 0
    width 100%
    // flex 1 1 100%
    ratio-box(4/3)

  .caption
    display block
    width 100%
    padding-top 15px
    // padding-bottom 0
    // responsive-prop(padding, $gutters)
    // flex 1 0 25%
    width 100%
    background-color $c-white
    color $c-dark
    z-index 2
    // flexbox(row)
    text-align left
    .title
      f-style(title, h3)
    .description
      f-style(text, card)
      // margin-top 0.2em

  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionCrewGrid
    //
</style>
