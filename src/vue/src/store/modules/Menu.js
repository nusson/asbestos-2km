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
  state() {
    return {
      mobileMenuIsOpen: false,
      collectionMenuIsOpen: false,
      thematicPannelIsOpen: false,
      navigation: [],
    };
  },
  mutations: {
    TOGGLE_MOBILE_MENU(state, open) {
      state.mobileMenuIsOpen = isBoolean(open) ? open : !state.mobileMenuIsOpen;
    },
    TOGGLE_COLLECTIONS(state, open) {
      state.collectionMenuIsOpen = isBoolean(open) ? open : !state.collectionMenuIsOpen;
    },
    TOGGLE_THEMATIC_PANNEL(state, open) {
      state.thematicPannelIsOpen = isBoolean(open) ? open : !state.thematicPannelIsOpen;
    },
    STORE_NAVIGATION(state, navigation) {
      state.navigation = navigation;
    },
  },
  actions: {
    /* Mobile menu */
    OPEN_MOBILE_MENU({ commit }) {
      commit('TOGGLE_MOBILE_MENU', true);
    },
    CLOSE_MOBILE_MENU({ commit }) {
      commit('TOGGLE_MOBILE_MENU', false);
    },
    TOGGLE_MOBILE_MENU({ commit }) {
      commit('TOGGLE_MOBILE_MENU');
    },
    /* Collection sub menu */
    OPEN_COLLECTIONS_MENU({ commit }) {
      commit('TOGGLE_COLLECTIONS', true);
    },
    CLOSE_COLLECTIONS_MENU({ commit }) {
      commit('TOGGLE_COLLECTIONS', false);
    },
    TOGGLE_COLLECTIONS_MENU({ commit }) {
      commit('TOGGLE_COLLECTIONS');
    },
    /* Thematic pannel */
    OPEN_THEMATIC_PANNEL({ commit }) {
      commit('TOGGLE_THEMATIC_PANNEL', true);
    },
    CLOSE_THEMATIC_PANNEL({ commit }) {
      commit('TOGGLE_THEMATIC_PANNEL', false);
    },
    TOGGLE_THEMATIC_PANNEL({ commit }) {
      commit('TOGGLE_THEMATIC_PANNEL');
    },
  },
  getters: {
  },
};
