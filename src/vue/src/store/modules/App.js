/**
 * # App store
 * > Manage our low level states
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
const debug = process.env.NODE_ENV === 'development'; // && false;

export default {
  namespaced: true,
  state: {
    debug,
    ready: true, // true if all content loaded
    mode: 'out-in',

  },
  mutations: {
    SET_READY(state, payload) {
      state.ready = payload;
    },
  },
  actions: {},
  getters: {
    debug: state => state.debug,
    ready: state => state.ready,
    mode: state => state.mode,
  },
};
