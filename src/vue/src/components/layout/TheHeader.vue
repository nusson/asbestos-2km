<docs>
# TheHeader
> The Header - NavBar + Menu

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { chunk } from 'lodash';
import { mapGetters, mapState } from 'vuex';
import { Scene } from 'scrollmagic';
import LogoSvg from 'assets/svg/logo.svg?vue';
import BurgerSvg from 'assets/svg/burger.svg?inline'; // inline to by-pass svg optimisation
import LangSwitcher from 'components/ui/LangSwitcher';

export default {
  name: 'TheHeader',
  components: {
    LogoSvg,
    LangSwitcher,
  },
  props: {
    state: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      svg: {
        burger: BurgerSvg,
      },
      hasBackground: false,
    };
  },
  computed: {
    ...mapGetters({
      viewport: 'Interface/viewport',
      isDesktop: 'Interface/isDesktop',
      isMobile: 'Interface/isMobile',
      mqPortrait: 'Interface/mqPortrait',
    }),
    ...mapState('Menu', {
      mobileMenuIsOpen: ({ mobileMenuIsOpen }) => mobileMenuIsOpen,
      collectionMenuIsOpen: ({ collectionMenuIsOpen }) => collectionMenuIsOpen,
      navigation: ({ navigation }) => navigation,
    }),
    ...mapState('I18n', {
      locale: ({ locale }) => locale,
    }),
    menu() {
      if (!this.isMobile) {
        const chunks = chunk(this.navigation, this.navigation.length / 2);
        return {
          left: chunks[0],
          right: chunks[1],
        };
      }
      return this.navigation;
    },
  },
  mounted() {
    this.autoClose();
    // this.$watch('viewport', ({ width }) => {
    //   this.isNavbar = width >= this.mqPortrait;
    // }, { immediate: true });

    const scene = new Scene({
      // triggerElement: '.SectionPartners',
      // offset: -50,
      // triggerHook: 0, // this.isDesktop ? 0.4 : 0.8,
      triggerElement: 'body',
      offset: 100,
      triggerHook: 0, // this.isDesktop ? 0.4 : 0.8,
    })
    .on('enter', () => {
      this.hasBackground = true;
    })
    .on('leave', () => {
      this.hasBackground = false;
    });
    this.$store.dispatch('ScrollMagic/ADD_SCENE', {
      scene,
      indicators: true,
    });
  },
  methods: {
    toggleMobileMenu() {
      if (this.mobileMenuIsOpen) {
        this.$store.dispatch('Menu/CLOSE_COLLECTIONS_MENU');
      }
      this.$store.dispatch('Menu/TOGGLE_MOBILE_MENU');
    },
    /**
     * will close all menus (mobile, collections etc)
     * when route change, when change layout mode (mobile/desktop)
     */
    autoClose() {
      const close = () => {
        this.$store.dispatch('Menu/CLOSE_MOBILE_MENU');
      };
      this.$router.afterEach(close);
      this.$watch('isDesktop', close);
    },
    scrollTo(slug) {
      this.$store.dispatch('Menu/CLOSE_MOBILE_MENU');
      this.$store.dispatch('Interface/SCROLL_TO', { to: `[data-anchor='${slug}']` });
    },
  },
};
</script>

<template>
  <header
    :data-background="hasBackground || mobileMenuIsOpen"
    class="TheHeader">
    <template v-if="!isMobile">
      <nav class="navbar">
        <ul class="list routes">
          <li
            v-for="{slug, label} in menu.left"
            :key="`route-${slug}`"
            class="item route">
            <a
              :href="`#${slug}`"
              class="link"
              @click.prevent="scrollTo(slug)"
              v-text="label"/>
          </li>
          <li class="item route -logo">
            <router-link
              :to="{name: `home.${locale}`}"
              class="logo"
              @click.native.prevent="scrollTo('hero')"
              v-text="'Asbestos 2.0'"/>
          </li>
          <li
            v-for="{slug, label} in menu.right"
            :key="`route-${slug}`"
            class="item route"
            @click.prevent="scrollTo(slug)">
            <a
              :href="`#${slug}`"
              class="link"
              v-text="label"/>
          </li>
          <li class="item route -langSwitcher">
            <LangSwitcher class="lang" />
          </li>
        </ul>
      </nav>
    </template>

    <template v-else>
      <div class="navbar">
        <button
          :data-active="mobileMenuIsOpen"
          class="link burger _no-btn"
          @click.prevent="toggleMobileMenu"
          v-html="svg.burger"/>
        <router-link
          :to="{name: `home.${locale}`}"
          class="logo"
          @click.native.prevent="scrollTo('hero')"
          v-text="'Asbestos 2.0'" />
        <span class="nothing-for-flex"/>
      </div>
      <nav
        :data-shown="mobileMenuIsOpen"
        class="menu-mobile">
        <ul class="list routes">
          <li
            v-for="{slug, label} in menu"
            :key="`route-${slug}`"
            class="item route">
            <a
              :href="`#${slug}`"
              class="link"
              @click.prevent="scrollTo(slug)"
              v-text="label"/>
          </li>
          <li class="item route -langSwitcher">
            <LangSwitcher class="link lang" />
          </li>
        </ul>
      </nav>
    </template>
  </header>
</template>

<style lang="stylus" scoped>
  /**
   * TABLE OF CONTENT
   * --------
   *  - LAYOUT
   * =NAVBAR
   * =MOBILE
   *  - DEBUG
   *  - NO_SCOPE
   */

  //  ===LAYOUT===
  .list.routes
    position relative
    z-index 100

  .TheHeader
    fixed 0 0 false 0
    color $c-dark
    z-index $z-navbar

  .logo
    f-style(menu, logo)
    fsize(1.8rem)
  .-logo
    flex-grow 1
    text-align center
    //

  .link
    cursor pointer
    f-style(menu)
    kff-transition color
    white-space nowrap
    .icon
      fill $c-dark
      kff-transition fill
    .no-touchevents &:hover
    &.active
      color $c-accent
      .icon
        fill $c-accent

  /* ===NAVBAR=== */
  .navbar
    position relative
    width 100%
    z-index $z-navbar
    responsive-prop(height, $h-header)
    color $c-white
    background-color transparent
    kff-transition(all)
    .link
      color $c-white
      kff-transition(all)
    .list.routes
      size 100%
      safe-content()
      flexbox(row, $align:center)
      .route
        x-margin(20px)
        +below(1200px)
          x-margin(10px)
        &:first-child
          margin-left 0
        &:last-child
          margin-right 0

  [data-background]
    .navbar
      background-color $c-white
      color $c-black
      box-shadow: 0px 0px 10px $c-dark;
      .link
        color $c-black
        >>> svg
          stroke $c-dark
  /* ===MOBILE=== */
  // +below($kff-mq-tablet-portrait - 1px)
  +mobile()
    .logo
      //
    .navbar
      flexbox(row)
      x-padding(20px)
    .burger
      size 20px
      >>> svg
        kff-transition(stroke)
        stroke $c-white
        .close
          display none
      &[data-active] >>> svg
        .open
          display none
        .close
          display block

  .menu-mobile
    fixed 0
    right 10vmin
    scrollable()
    padding-top 20px + $h-header[1]
    padding-bottom 20px
    text-align center
    background-color $c-white
    color $c-dark
    z-index $z-menu-mobile
    transition transform 0.6s easing('out-expo')
    display flex
    justify-content center
    align-items flex-start
    flexbox(column, $justify: center)
    // @todo use transition vue
    &:not([data-shown])
      transform translateX(-100%)
      transition-timing-function easing('in-quad')
      transition-duration 0.4s

    .list
      width 100%
      >.item
        y-padding 1.2em
    .collections
      margin-top 20px
      // max-width 375px
      // x-margin auto


    // .list.routes
      // height 100%


  //  ===DEBUG===
  // [data-debug-mode="true"] .TheHeader
    // background url('/DEBUG/menu-desktop.jpg') center top no-repeat
    // height 320px
    // width 1366px
    // +mobile()
    //   background url('/DEBUG/menu-mobile-closed.jpg') center top no-repeat
    //   height 60px
  [data-debug-mode="true"] .menu-mobile
    // &:before
    //   content ''
    //   absolute 0
    // background url('/DEBUG/menu-mobile.jpg') center top no-repeat !important
    // background url('/DEBUG/menu-mobile-collections.jpg') center top no-repeat !important
    // padding-top 77px
    // align-items flex-start
</style>

<story
  group="COMPONENTS|Navigation"
  name="Header">
  <TheHeader />
</story>
