/**
 * # Menu store
 * > control our menu state (open/close)
 *
 * @todo :
 *
 * @author Sebastien Levy <sebastien@kffein.com>
 */
import { isBoolean } from 'lodash';

export default {
    namespaced: true,
    state: {
      open: false,
    },
    mutations: {
      TOGGLE_MENU(state, isOpen) {
          state.open = isBoolean(isOpen) ? isOpen : !state.open;
      },
    },
    actions: {
      OPEN_MENU({ commit }) {
          commit('TOGGLE_MENU', true);
      },
      CLOSE_MENU({ commit }) {
          commit('TOGGLE_MENU', false);
      },
    },
    getters: {
        // we must return a function to watch it with this.$store.watch
        // watch(fn: Function, callback: Function, options?: Object): Function
        open: state => state.open,
    },
};
