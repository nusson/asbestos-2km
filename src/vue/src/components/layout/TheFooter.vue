<docs>
# TheFooter
> The footer

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { mapGetters } from 'vuex';
import UiIconsSocial from 'components/ui/Icons/Social';

export default {
  name: 'TheFooter',
  components: {
    UiIconsSocial,
  },
  props: {
    social: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  computed: {
    ...mapGetters({
      locale: 'I18n/locale',
    }),
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>

<template>
  <footer class="TheFooter">
    <nav class="navigation -social">
      <ul class="list">
        <li
          v-for="({href, label, platform}, index) in social"
          :key="`footer-cocial-${index}`"
          class="item">
          <a
            :href="href"
            :title="label"
            :class="`link -${platform}`"
            target="_blank">
            <UiIconsSocial
              :icon="platform"
              class="icon" />
          </a>
        </li>
      </ul>
    </nav>
  </footer>
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
  .TheFooter
    background-color $c-black
    .navigation
      safe-content()
      text-align right
      y-padding 20px

  .link
    .icon
      size 20px
    >>> svg
      fill $c-white
      kff-transition(fill)
    .no-touchevents &:hover >>> svg
      fill $c-accent

  .list
    flexbox(row, $justify:flex-end)
    >.item
      &:not(:first-child)
        margin-left 20px
</style>
