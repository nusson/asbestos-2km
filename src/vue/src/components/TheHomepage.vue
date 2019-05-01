<docs>
# PageHome
> simply the homepage

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { each } from 'lodash';
import { mapGetters, mapState } from 'vuex';
import { Scene } from 'scrollmagic';
import { Linear } from 'gsap';
import SectionHero from 'components/sections/Hero';
import SectionPartners from 'components/sections/Partners';
import SectionAbout from 'components/sections/About';
import SectionEvent from 'components/sections/Event';
import SectionActivities from 'components/sections/Activities';
import SectionCrew from 'components/sections/Crew';
import SectionGuests from 'components/sections/Guests';
import SectionContact from 'components/sections/Contact';
import SectionWhenAndWhere from 'components/sections/WhenAndWhere';

export default {
  name: 'PageHome',
  components: {
    SectionHero,
    SectionPartners,
    SectionAbout,
    SectionEvent,
    SectionActivities,
    SectionCrew,
    SectionGuests,
    SectionContact,
    SectionWhenAndWhere,
  },
  computed: {
    ...mapGetters({
      activities: 'Global/activities',
      partners: 'Global/partners',
      about: 'Global/about',
      event: 'Global/event',
      crew: 'Global/crew',
      athletes: 'Global/athletes',
      whenAndWhere: 'Global/whenAndWhere',
      ready: 'Global/loaded',
      isDesktop: 'Interface/isDesktop',
      isMobile: 'Interface/isMobile',
    }),
    ...mapState('I18n', {
      locale: ({ locale }) => locale,
    }),
  },
  // beforeDestroy() {
  //   // !!! Do not unregister store
  //   // or datas will be deleted and you will need to re-call api
  //   this.$store.unregisterModule('PageHome');
  // },
  mounted() {
    const unwatchReady = this.$watch('ready', (ready) => {
      if (!ready) return;
      this.$nextTick(() => {
        this.initParallax();
        unwatchReady();
      });
    }, { immediate: true });
  },
  methods: {
    initParallax() {
      const sections = (() => {
        const list = [];
        list.push({
          triggerElement: this.$refs.SectionHero,
          triggerHook: 0,
        });
        if (!this.isMobile) {
          list.push({
            triggerElement: this.$refs.SectionAbout,
          });
        }
        return list;
      })();
      each(sections, (options) => {
        const slide = options.triggerElement.querySelector('.slide-effect');

        const scene = new Scene({
          duration: '200%',
          triggerHook: 'onEnter',
          ...options,
        })
          .setTween(slide, { y: '50%', ease: Linear.easeNone });
        this.$store.dispatch('ScrollMagic/ADD_SCENE', {
          scene,
          indicators: false,
        });
      });
    },
  },
};
</script>

<template>
  <div
    v-if="ready"
    class="PageHome">
    <!-- <div class="preHero" /> -->
    <section
      ref="SectionHero"
      data-anchor="hero"
      class="section -hero parallax">
      <SectionHero class="hero slide-effect"/>
    </section>

    <SectionPartners
      v-bind="partners"
      class="section -partners" />

    <SectionWhenAndWhere
      v-bind="whenAndWhere"
      data-anchor="whenAndWhere"
      class="section -whenAndWhere" />

    <div
      class="trigger-sm-about"
      data-anchor="about"/>
    <section
      ref="SectionAbout"
      class="section -about parallax">
      <SectionAbout
        v-bind="about"
        class="about slide-effect"/>
    </section>

    <SectionActivities
      v-bind="activities"
      data-anchor="activity"
      class="section -activities" />
    <SectionCrew
      v-bind="crew"
      data-anchor="crew"
      class="section -crew" />
    <SectionGuests
      v-bind="athletes"
      data-anchor="athletes"
      class="section -athletes" />

    <SectionEvent
      v-bind="event"
      data-anchor="event"
      class="section -event" />

    <SectionContact
      data-anchor="contact"
      class="section -contact" />
  </div>
</template>

<style lang="stylus" scoped>
.parallax
  height 100vh
  overflow hidden
  .about
    min-height 150%
    position relative
    top -50%
  .hero
    height 100%
    top 0%

.-about
  +mobile()
    height auto
    overflow visible

.section
  position relative
  &.-hero
  &.-about
    y-padding(0px)
  &.-contact
    responsive-prop(margin-top, 60px 40px 30px)
  &.-activities
    // background-color $c-light

  // .-about

  // &.-partners

</style>
