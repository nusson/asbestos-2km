<!-- eslint-disable -->
<docs>
# SectionActivitiesGrid
> 

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
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
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<template>
  <ul
    class="SectionActivitiesGrid list">
    <li
      v-for="(item, index) in items"
      :key="`grid-${index}`"
      class="item">
      <figure
        class="figure">
        <!-- @click="toggle(index)"> -->
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

  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionActivitiesGrid
    //
</style>
