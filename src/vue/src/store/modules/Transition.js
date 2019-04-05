/**
 * # Transition store
 * > control our pages transition
 *
 *
 * @author Sebastien Levy <sebastien@kffein.com>
 */

export default {
  namespaced: true,
  state: {
    transitionActivated: false,
    isAnimating: false,
  },
  mutations: {
    UPDATE_ANIMATING(state) {
      state.isAnimating = !state.isAnimating;
    },
    TRANSITION_ACTIVATED(state) {
      state.transitionActivated = true;
    },
  },
  actions: {
    UPDATE({ commit }) {
      commit('UPDATE_ANIMATING');
    },
    ACTIVE_TRANSITION({ commit }) {
      commit('TRANSITION_ACTIVATED');
    },
  },
  getters: {
    isAnimating: state => state.isAnimating,
    transitionActivated: state => state.transitionActivated,
  },
};
