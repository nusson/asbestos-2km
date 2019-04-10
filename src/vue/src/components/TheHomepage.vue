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
      ready: 'Global/loaded',
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
      each([
        {
          triggerElement: this.$refs.SectionHero,
          triggerHook: 0,
        },
        {
          triggerElement: this.$refs.SectionAbout,
        },
      ], (options) => {
        const slide = options.triggerElement.querySelector('.slide-effect');
        const scenee = new Scene({
          duration: '200%',
          triggerHook: 'onEnter',
          ...options,
        })
          .setTween(slide, { y: '20%', ease: Linear.easeNone });
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
      <SectionAbout class="slide-effect"/>
    </section>
    <SectionEvent />
    <SectionActivities v-bind="activities" />
    <SectionCrew />
    <SectionGuests />
    <SectionContact />
  </div>
</template>

<style lang="stylus" scoped>
.preHero{
  size 100vw 100vh
  background-color rgba(black, 0.8)
}
.parallax {
  height: 100vh;
  overflow: hidden;
}
.parallax > .slide-effect {
  height: 130%;
  position: relative;
  top: -15%;
}
.parallax >.hero{
  height: 100%;
  top: 0%;
}

.section
  position relative
  // &.-partners

</style>
