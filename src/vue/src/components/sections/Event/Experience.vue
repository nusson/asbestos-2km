<!-- eslint-disable -->
<docs>
# SectionEventExperience
> list of experiences / facts

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
export default {
  name: 'SectionEventExperience',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default() {
        return [];
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
  <div class="SectionEventExperience">
    <h3
      class="title _h3"
      v-text="title"/>

    <ol class="features list">
      <li
        v-for="(fact, index) in items"
        :key="`fact-${index}`"
        class="item">
        <h4
          class="title _h4"
          v-text="fact.title"/>
        <p
          class="description"
          v-text="fact.description"/>
      </li>
    </ol>
  </div>
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
  .SectionEventExperience
    //
</style>
