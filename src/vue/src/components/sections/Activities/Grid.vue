<!-- eslint-disable -->
<docs>
# SectionActivitiesGrid
> 

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import { indexOf, without } from 'lodash';
import UiPicture from 'components/ui/Picture';

export default {
  name: 'SectionActivitiesGrid',
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
    return {
      actives: [],
      active: null,
    };
  },
  mounted() {},
  methods: {
    indexOf,
    toggle(index) {
      this.active = (this.active === index) ? null : index;

      // if (indexOf(this.actives, index) >= 0) {
      //   this.actives = without(this.actives, index);
      //   return;
      // }
      // this.actives.push(index);
    },
  },
};
</script>

<template>
  <ul
    class="SectionActivitiesGrid list">
    <li
      v-for="(item, index) in items"
      :key="`grid-${index}`"
      class="item">
      <!-- :data-active="indexOf(actives, index)>=0" -->
      <figure
        :data-active="active === index"
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
            v-html="item.description.full"/>
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
  .SectionActivitiesGrid
    safe-content()
    flexbox($align:flex-start,$justify:flex-start,$wrap:wrap)
    >.item
      flex 0 0 50%
      max-width calc('50% - 20px')
      +tablet()
        max-width calc('50% - 10px')
      &:nth-child(even)
        responsive-prop(margin-left, $gutters)
      &:nth-child(n+3)
        responsive-prop(margin-top, $gutters)

  .figure
    width 100%
    position relative
    height var(--viewport-height-no-header)

  .background
    absolute 0

  .caption
    position relative
    display block
    overflow hidden
    text-align left
    z-index 20
    transform translateY(20vh)
    width 100%
    // background-color rgba($c-white, 0)
    // height 100%
    padding-bottom 40px
    // kff-transition()
    position relative
    transition all 0.6s easing('in-back')
    &:before
      absolute 0
      background-color $c-white
      transform translateX(100%)
      // kff-transition(transform)
      transition all 0.6s easing('in-back')

  .title
    f-style(title)
    padding 15px
    display inline-block
    background-color $c-white
    color $c-dark

  .description
    x-padding 15px
    f-style(text, card)
    color $c-dark
    opacity 0
    // transform translateX(-50%)
    transform translateY(20px)
    // background-color rgba($c-white, 0)
    // kff-transition(all)
    transition all 0.6s easing('in-back')

  .figure
    &[data-active]
    .no-touchevents &:hover
      .caption
        transform translateY(10vh)
        background-color rgba($c-white, 1)
        transition all 0.8s easing('out-expo')
      &:before
        transform translateX(0%)
        transition all 0.8s easing('out-expo')
      .description
        opacity 1
        transform translateY(0%)
        // background-color rgba($c-white, 1)
        transition all 0.8s easing('out-expo')


  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionActivitiesGrid
    //
</style>
