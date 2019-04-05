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
import AsyncComputed from 'vue-async-computed';
import { mapGetters } from 'vuex';
import { get, each } from 'lodash';
import router from 'router';
import store from 'store';
import Meta from 'vue-meta';
import 'utils/plugins/Modernizr';
import FontAwesome from 'utils/plugins/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import i18n from 'plugins/i18n';
import App from 'components/TheApp';


// Enable HRM
if (module.hot) {
  module.hot.accept();
}
// end - Enable HRM

Vue.use(Meta, {
  keyName: 'head',
});

Vue.use(AsyncComputed);

// Font Awesome
FontAwesome.init();
Vue.component('font-awesome-icon', FontAwesomeIcon);

export default new Vue({ // eslint-disable-line
  el: '#App',
  router,
  i18n,
  store,
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      ready: 'App/ready', // we will wait before rendering anything
      debug: 'App/debug',
      locale: 'I18n/locale',
    }),
  },
  watch: {
    '$route.params.locale': {
      handler(newValue) {
        this.$store.dispatch('I18n/SET_LOCALE', newValue);
        this.load();
      },
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
    const { pathname } = document.location;
    const { route } = this.$router.resolve(pathname);
    const locale = get(route, 'params.locale', this.locale);
    if (route.path === '/' && !this.$route.name) {
      this.$router.push({ path: `/${locale}` });
    }
    this.$store.dispatch('I18n/SET_LOCALE', locale);
  },
  mounted() {
    this.load();
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

      // preload route component
      const preloadRouteComponent = new Promise((resolve) => {
        this.$router.onReady(resolve);
        this.$store.commit('App/SET_READY', true);
      });
      this.$store.commit('Loader/PROMISE_PUSH', preloadRouteComponent);
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
      window.$router = this.$router;
      window.$i18n = this.$i18n;
      window.$store = this.$store;
    },
  },
  render(h) {
    if (!this.ready) {
      return null;
    }
    return h(App);
  },
});
