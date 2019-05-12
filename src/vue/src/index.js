/**
 * # Entry Point
 * > Where our adventures begins...
 *
 * @todo :
 * - Plug store with API
 * - [ ] code split / async poliffyls
 * - [X] FontAwesome init
 * - [X] Modernizr init
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */

//  @todo conditional import if ie
//  so pollifyll vendor ;)
// import '@babel/polyfill';

import Vue from 'vue';
// import AsyncComputed from 'vue-async-computed';
import { mapGetters, mapState } from 'vuex';
import { each, get } from 'lodash';
import { Scene } from 'scrollmagic';
import { /* TweenMax, Expo, */ Linear } from 'gsap';
// import router from 'router';
import store from 'store';
import Meta from 'vue-meta';
import 'utils/plugins/Modernizr';
// import FontAwesome from 'utils/plugins/FontAwesome';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import i18n from 'plugins/i18n';

import Transitions from 'src/mixins/Transitions';
import PageTransition from 'components/ui/PageTransition';
import TheHeader from 'components/layout/TheHeader';
import TheFooter from 'components/layout/TheFooter';
import TheLoader from 'components/TheLoader';
import SmoothScrollBar from 'components/ui/ScrollBar';
import Overlay from 'components/ui/Overlay';

import SectionHero from 'components/sections/Hero';
import SectionPartners from 'components/sections/Partners';
import SectionAbout from 'components/sections/About';
import SectionEvent from 'components/sections/Event';
import SectionActivities from 'components/sections/Activities';
import SectionCrew from 'components/sections/Crew';
import SectionGuests from 'components/sections/Guests';
import SectionContact from 'components/sections/Contact';
import SectionWhenAndWhere from 'components/sections/WhenAndWhere';
import UiVideo from 'components/ui/Video';
import UiLightbox from 'components/ui/Lightbox';


// Enable HRM
if (module.hot) {
  module.hot.accept();
}
// end - Enable HRM

Vue.use(Meta, {
  keyName: 'head',
});

// Vue.use(AsyncComputed);

// Font Awesome
// FontAwesome.init();
// Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.component('the-header', TheHeader);
Vue.component('the-footer', TheFooter);
Vue.component('the-loader', TheLoader);
Vue.component('overlay', Overlay);
Vue.component('smooth-scrollbar', SmoothScrollBar);
Vue.component('page-transition', PageTransition);
Vue.component('section-hero', SectionHero);
Vue.component('section-partners', SectionPartners);
Vue.component('section-about', SectionAbout);
Vue.component('section-event', SectionEvent);
Vue.component('section-activities', SectionActivities);
Vue.component('section-crew', SectionCrew);
Vue.component('section-guests', SectionGuests);
Vue.component('section-contact', SectionContact);
Vue.component('section-when-and-where', SectionWhenAndWhere);
Vue.component('ui-video', UiVideo);
Vue.component('ui-lightbox', UiLightbox);


// Vue.component('font-awesome-icon', FontAwesomeIcon);

export default new Vue({ // eslint-disable-line
  el: '#App',
  components: {
    // TheHomepage,
  },
  mixins: [Transitions],
  // router,
  i18n,
  store,
  data() {
    return {
    };
  },
  computed: {
    ...mapState('I18n', {
      locale: ({ locale }) => locale,
    }),
    isLightboxOpen() {
      return this.lightboxType === 'video';
    },
    ...mapGetters({
      ready: 'App/ready', // we will wait before rendering anything
      debug: 'App/debug',
      locale: 'I18n/locale',
      loaded: 'Loader/loaded',
      viewport: 'Interface/viewport',
      isMobile: 'Interface/isMobile',
      scrollable: 'Interface/scrollable',
      social: 'Global/social',
      mode: 'App/mode',
      lightboxType: 'Lightbox/type',
    }),
    dynamicStyles() {
      /* Usefull to:
          - fix 100vw (some browsers does/does not count the scrollbar)
          - fix 100vh (some mobile does/does not count the top bar)
      */
      return `
        ._fullViewport,
        ._fullViewportW,
        ._fullViewportH {
          overflow: hidden;
        }
        ._fullViewport {
          position: relative;
          width: ${this.viewport.width}px;
          height: ${this.viewport.height}px;
        }
        ._fullViewportW {
          width: ${this.viewport.width}px;
        }
        ._fullViewportH {
          height: ${this.viewport.height}px;
        }
        ._fullViewportHWithoutHeader {
          height: ${this.viewport.height - (this.isMobile ? 40 : 50)}px;
        }
        :root { 
          --viewport-width: ${this.viewport.width}px;
          --viewport-height: ${this.viewport.height}px;
          --viewport-height-no-header: ${this.viewport.height - (this.isMobile ? 40 : 50)}px;
        }
      `;
    },
  },
  watch: {
    '$route.params.locale': {
      handler(newValue) {
        this.$store.dispatch('I18n/SET_LOCALE', newValue);
        this.load();
      },
    },
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
  /**
   * on create, init some stuff
   * - init interface (resizes etc)
   * - add some debug utils if dev env
   * - wait router to guess locale then init our App
   *    wait router to resolve 1st route,
   *    so resolve locale so ready to preload stuffs etc
   *    the rest of the logic will stand in App
   */
  created() {
    // watch router ready to 1st set locale (fallback i18n state = cookie)
    // and may redirect from `/` to `/:locale`
    // @todo maybe use [router.beforeEach](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-guards)
    // and handle the next() or next({ path: `/${locale}` })
    // const { pathname } = document.location;
    // const { route } = this.$router.resolve(pathname);
    // const locale = get(route, 'params.locale', this.locale);
    // if (route.path === '/' && !this.$route.name) {
    //   this.$router.push({ path: `/${locale}` });
    // }
    // this.$store.dispatch('I18n/SET_LOCALE', locale);
    this.$store.dispatch('I18n/SET_LOCALE', 'fr');
    this.$store.dispatch('Interface/INIT');
  },
  mounted() {
    this.load();
    const unwatchReady = this.$watch('ready', (ready) => {
      if (!ready) return;
      this.$nextTick(() => {
        this.initParallax();
        unwatchReady();
      });
    }, { immediate: true });
  },
  methods: {
    load() {
      // add global loading to our preloader
      const preload = [
        this.$store.dispatch('I18n/LOAD_LOCALE_MESSAGES', this.locale), // local i18n
        this.$store.dispatch('Global/LOAD', this.locale), // api global
      ];
      each(preload, (promise) => {
        this.$store.commit('Loader/PROMISE_PUSH', promise);
      });
      const preloadStuff = new Promise((resolve) => {
        const titleImage = document.querySelector('.SectionHero .image');
        if (!titleImage || !titleImage.src) {
          // console.log('nop'); // eslint-disable-line
          resolve();
          return;
        }
        if (titleImage.complete) {
          // console.log('already'); // eslint-disable-line
          resolve();
        } else {
          titleImage.addEventListener('load', () => {
            // console.log('loaded'); // eslint-disable-line
            resolve();
          });
        }
        // console.log('preload', document.querySelector('.SectionHero .image')); // eslint-disable-line
      });
      this.$store.commit('Loader/PROMISE_PUSH', preloadStuff);

      // preload route component
      // const preloadRouteComponent = new Promise((resolve) => {
      //   this.$router.onReady(resolve);
      //   this.$store.commit('App/SET_READY', true);
      // });
      // this.$store.commit('Loader/PROMISE_PUSH', preloadRouteComponent);
      this.addDebug();
    },

    /**
     * add debugs stuff (only if env = dev)
     * so you can access utils directly from console
     */
    addDebug() {
      if (!this.debug) {
        return;
      }
      window.$root = this;
      // window.$router = this.$router;
      window.$i18n = this.$i18n;
      window.$store = this.$store;
    },
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
          indicators: true,
        });
      });
    },
    // enter(el, done) {
    //   return TweenMax.fromTo(el, 1, {
    //     autoAlpha: 0,
    //   }, {
    //     autoAlpha: 1,
    //     ease: Expo.easeOut,
    //     onComplete: done.bind(this),
    //   });
    // },
  },
  // render(h) {
  //   if (!this.ready) {
  //     return null;
  //   }
  //   return h(App);
  // },
});
