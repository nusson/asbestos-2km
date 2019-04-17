<docs>
# TheNav
> Nav block
When nav is displayed, we :
- enable/disable scroll
- show/hide overlay

@author Sebastien Levy <sebastien@kffein.com>
</docs>

<script>
import LangSwitcher from 'components/ui/LangSwitcher';
import { mapGetters, mapState } from 'vuex';
import UiButton from 'components/ui/Button';
import { TimelineMax, TweenMax, Power4 } from 'gsap';
import { map } from 'lodash';

export default {
  name: 'TheNav',
  components: {
    LangSwitcher,
    UiButton,
  },
  data() {
    return {
      enterTimeline: null,
      leaveTimeLine: null,
    };
  },
  computed: {
    ...mapGetters({
      open: 'Menu/open',
      menu: 'Global/menu',
    }),
    ...mapState('I18n', {
      locale: ({ locale }) => locale,
    }),
  },
  watch: {
    open() {
      if (this.open) {
        this.$store.dispatch('Overlay/SHOW_OVERLAY');
        this.$store.dispatch('Interface/DISABLE_SCROLL');
        this.enterTimeline.restart();
      } else {
        this.$store.dispatch('Overlay/HIDE_OVERLAY');
        this.$store.dispatch('Interface/ENABLE_SCROLL');
        this.leaveTimeLine.restart();
      }
    },
  },
  mounted() {
    this.$watch('menu', (menu) => {
      if (menu.primary.length > 0) {
        this.$nextTick(() => {
          this.initTimelines();
        });
      }
    }, {
      immediate: true,
    });
  },
  methods: {
    /* *  enterTimeline for opening & leaveTimeLine for closing * */
    initTimelines() {
      const primaryLinks = map(this.$refs.PrimaryLinks, '$el');
      /* *  enterTimeline  * */
      this.enterTimeline = new TimelineMax({
        paused: true,
        onStart: () => {
          // TweenMax.set(primaryLinks, { opacity: 1 });
        },
      });
      this.enterTimeline.staggerTo(primaryLinks, 0.8, { opacity: 1, delay: 0.2, ease: Power4.easeInOut }, 0.02);

      /* *  leaveTimeLine  * */
      this.leaveTimeLine = new TimelineMax({
        paused: true,
        onComplete: () => {
          TweenMax.set(primaryLinks, { clearProps: 'all' });
        },
      });
      this.leaveTimeLine.staggerTo(primaryLinks, 0.2, { opacity: 0, ease: Power4.easeInOut }, 0.02);
    },
  },
};
</script>

<template>
  <aside
    ref="TheNav"
    :data-open="open"
    class="TheNav">
    <div class="container">
      <a
        href="#"
        class="close"
        @click.prevent="$store.dispatch('Menu/CLOSE_MENU')" />
      <nav class="nav">
        <ul class="list-link">
          <li
            v-for="item in menu.primary"
            :key="item.slug"
            class="item">
            <router-link
              ref="PrimaryLinks"
              :to="item.url"
              class="link"
              @click.native.prevent="$store.dispatch('Menu/CLOSE_MENU')"
              v-html="item.name"
            />
          </li>
        </ul>
      </nav>
    </div>
  </aside>
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
  .TheNav
    fixed top 0 right 0
    height var(--viewport-height)
    width 100%
    z-index $z-index-navbar
    pointer-events none
    &[data-open="true"]
      .link
        pointer-events all

  .container
    position relative
    height var(--viewport-height)
    overflow-y scroll
    padding 67px 57px

  .nav
    height 100%

  .list-link
    height 100%
    flexbox(column, $align: center, $justify: center)
    .item
      padding 30px 0

  .link
    position relative
    color $c-white
    f-size(4rem 4rem)
    opacity 0
    pointer-events none
    &:after
      content ''
      absolute bottom -3px left 0
      background $c-white
      height 3px
      width 100%
      transition($property: 'transform', $ease: cubic-bezier(.6,.15,.4,1))
      transform-origin right center
      transform scaleX(0)
    &:hover
      &:after
        transform scaleX(1)
        transform-origin left center


  .close
    absolute top 14px right 20px
    size 30px
    z-index 2
    opacity 0
    &:after
    &:before
      absolute left 15px
      content ' '
      height 30px
      width 2px
      background-color $c-white
    &:before
      transform rotate(45deg)

    &:after
      transform rotate(-45deg)

  //  ===DEBUG===
  [data-debug-mode="true"] .TheNav
    //
</style>
