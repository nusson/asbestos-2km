<docs>
# PageHome
> simply the homepage

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { each, get } from 'lodash';
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
import NewsletterPoppin from 'components/sections/Newsletter/Popin';
import UiVideo from 'components/ui/Video';
import UiLightbox from 'components/ui/Lightbox';

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
    NewsletterPoppin,
    UiVideo,
    UiLightbox,
  },
  computed: {
    ...mapGetters({
      hero: 'Global/hero',
      activities: 'Global/activities',
      partners: 'Global/partners',
      about: 'Global/about',
      event: 'Global/event',
      crew: 'Global/crew',
      athletes: 'Global/athletes',
      whenAndWhere: 'Global/whenAndWhere',
      contact: 'Global/contact',
      ready: 'Global/loaded',
      isDesktop: 'Interface/isDesktop',
      isMobile: 'Interface/isMobile',
      lightboxType: 'Lightbox/type',
    }),
    ...mapState('I18n', {
      locale: ({ locale }) => locale,
    }),
    isLightboxOpen() {
      return this.lightboxType === 'video';
    },
  },
  watch: {
    isLightboxOpen: {
      handler(isOpen) {
        const videos = {
          bg: get(this.$refs, 'Hero.$refs.VideoBg'),
          main: this.$refs.VideoMain,
        };

        if (isOpen) {
          if (videos.bg) {
            videos.bg.stop();
            videos.main.play();
          }
          return;
        }
        if (videos.bg) {
          videos.bg.play();
        }
        if (videos.main) {
          videos.main.stop();
        }
      },
      immediate: true,
    },
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
      <SectionHero
        ref="Hero"
        v-bind="hero"
        class="hero slide-effect"/>
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

    <SectionEvent
      v-bind="event"
      data-anchor="event"
      class="section -event" />

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

    <SectionContact
      v-bind="contact"
      data-anchor="contact"
      class="section -contact">
      <!-- <template v-slot:partners>
        <SectionPartnersSmall
          v-bind="partnersBottom"
          class="section -partners-small" />
      </template> -->
    </SectionContact>


    <UiLightbox
      class="lightbox"
      type="video">
      <UiVideo
        v-if="hero && hero.videos && hero.videos.main"
        ref="VideoMain"
        v-bind="hero.videos.main"
        :controls="true"
        :autoplay="false"
        :auto-stop-on-scroll="false"
        cover="contain"
        class="video"/>
    </UiLightbox>
    
    <NewsletterPoppin />
  </div>
</template>

<style lang="stylus" scoped>

  .lightbox
    >>>.body
      size 100% 100vh// 80vh
   >>> .video
    // ratio-box(16/9)
    // width 100%
    absolute 0
    // width 100%
    // size 100vw 100vh
    // position relative

.parallax
  height 100vh
  overflow hidden
  .about
    min-height 120%
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
    responsive-prop(margin-top, 60px 40px)
    +below($kff-mq-tablet-portrait - 1)
      margin-top 0
  &.-activities
    // background-color $c-light

  // .-about

  // &.-partners
</style>
