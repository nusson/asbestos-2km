<docs>
# TheFooter
> The footer

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { mapGetters } from 'vuex';
import UiIconsSocial from 'components/ui/Icons/Social';
// import NewsletterForm from 'components/sections/Newsletter/Form';

export default {
  name: 'TheFooter',
  components: {
    UiIconsSocial,
    // NewsletterForm,
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
    <!-- <NewsletterForm class="NewsletterForm" /> -->
    <nav class="navigation -social">
      <ul class="list">
        <li class="item -btn">
          <button
            class="no_btn newsletter-btn"
            @click.prevent="$root.$emit('open-newsletter')">Infolettre</button>
        </li>
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

  .newsletter-btn
    background none
    border none
    color $c-white
    display inline-block
    padding-right 10px
    cursor pointer
    // border-bottom 1px solid $c-white
    .no-touchevents &:hover
      color $c-accent

  .form
    float left
    color $c-white
</style>
