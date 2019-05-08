/**
 * # Lightbox store
 * > control our lightbox state (open/close)
 *
 * @author nicolas husson <nicolas@kffein.com>
 */

import { indexOf, last, isEmpty } from 'lodash';

// If you want to extend lightbox in different types (contact, newsletter etc)
export const TYPES = {
  DEFAULT: 'default',
  // CONTACT: 'contact',
};

export default {
  namespaced: true,
  state: {
    types: [],
  },
  mutations: {
    /**
    * Open a modal
    * @param {object} state
    * @param {array} type : please use TYPES const
    */
    OPEN(state, type = null) {
      if (type) {
        this.commit('Lightbox/TYPE', type);
      }
      this.dispatch('Interface/DISABLE_SCROLL');
    },
    CLOSE(state, type = null) {
      const indexFound = indexOf(state.types, type);
      if (indexFound > -1) {
        state.types.splice(indexFound, 1);
      }
      this.dispatch('Interface/ENABLE_SCROLL');
    },
    TYPE(state, type) {
      const typeFound = indexOf(state.types, type);
      if (typeFound === -1) {
        state.types.push(type);
      }
    },
  },

  actions: {
    /** open (default) lightbox
     * @params {String} type - please use TYPES const
     */
    OPEN({ commit }, type = null) {
      commit('OPEN', type || TYPES.DEFAULT);
    },
    /** open contact lightbox */
    // OPEN_CONTACT({ commit }) {
    //   commit('OPEN', TYPES.CONTACT);
    // },

    /** close (default) lightbox
     * @params {String} type - please use TYPES const
     */
    CLOSE({ commit }, type = null) {
      commit('CLOSE', type);
    },
  },

  getters: {
    isOpen: (state, { type }) => !isEmpty(type),
    // isOpenContact: (state, {type}) => type === TYPES.CONTACT,

    // return which lightbox is open
    types: state => state.types,
    type: state => last(state.types),
  },
};
