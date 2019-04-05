/**
 * # Overlay store
 * > control our overlay state (display/hide)
 *
 * @todo :
 *
 * @author Sebastien Levy <sebastien@kffein.com>
 */
import { isBoolean } from 'lodash';

export default {
    namespaced: true,
    state: {
      activeOverlay: false,
    },
    mutations: {
      TOGGLE_OVERLAY(state, isActive) {
          state.activeOverlay = isBoolean(isActive) ? isActive : !state.activeOverlay;
      },
    },
    actions: {
      HIDE_OVERLAY({ commit }) {
          commit('TOGGLE_OVERLAY', false);
      },
      SHOW_OVERLAY({ commit }) {
          commit('TOGGLE_OVERLAY', true);
      },
    },
    getters: {
        // we must return a function to watch it with this.$store.watch
        // watch(fn: Function, callback: Function, options?: Object): Function
        activeOverlay: state => state.activeOverlay,
    },
};
