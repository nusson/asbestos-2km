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
  },
  computed: {
    ...mapGetters({
      activities: 'Global/activities',
      partners: 'Global/partners',
      about: 'Global/about',
      ready: 'Global/loaded',
      isDesktop: 'Interface/isDesktop',
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
        if (this.isDesktop) {
          list.push({
            triggerElement: this.$refs.SectionAbout,
          });
        }
        return list;
      })();
      each(sections, (options) => {
        const slide = options.triggerElement.querySelector('.slide-effect');
        const scenee = new Scene({
          duration: '200%',
          triggerHook: 'onEnter',
          ...options,
        })
          .setTween(slide, { y: '50%', ease: Linear.easeNone });
        this.$store.dispatch('ScrollMagic/ADD_SCENE', {
          scene: scenee,
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
      class="section -hero parallax">
      <SectionHero class="hero slide-effect"/>
    </section>

    <SectionPartners
      v-bind="partners"
      class="section -partners" />

    <section
      ref="SectionAbout"
      class="section -about parallax">
      <SectionAbout
        v-bind="about"
        class="about slide-effect"/>
    </section>

    <SectionEvent />
    <SectionActivities v-bind="activities" />
    <SectionCrew />
    <SectionGuests />
    <SectionContact />
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

  // .-about

  // &.-partners

</style>
