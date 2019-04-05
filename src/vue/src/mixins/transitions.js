/**
 * - scroll
 *  + before leave = disable
 *  + before enter = scrolltop
 *  + after enter = enable
 */
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      mode: 'App/mode',
    }),
  },
  methods: {
    beforeEnter() {
      // console.debug('[transition] beforeEnter'); // eslint-disable-line no-console
      this.$store.dispatch('Interface/SCROLL_TOP', 0);
    },
    enter() {
      // console.debug('[transition] Enter'); // eslint-disable-line no-console
      // trigger enter transition anim if activated after first load
      this.$store.dispatch('Interface/ENABLE_SCROLL');
      this.$store.dispatch('Transition/UPDATE');
      this.$refs.PageTransition.enter();
    },
    afterEnter() {
      // console.debug('[transition] afterEnter'); // eslint-disable-line no-console
    },
    beforeLeave() {
      // console.debug('[transition] beforeLeave'); // eslint-disable-line no-console
      this.$store.dispatch('Interface/DISABLE_SCROLL');
    },
    leave() {
      // console.debug('[transition] leave'); // eslint-disable-line no-console
      this.$store.dispatch('Transition/UPDATE');
      this.$refs.PageTransition.leave();
    },
    afterLeave() {
      this.$store.commit('ScrollMagic/DESTROY_SCENES');
    },
  },
};
