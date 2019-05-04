/**
 * # Interface store
 * > control our interface (viewport, scroll etc)
 *
 * @todo :
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */

import {
 each, isNumber, throttle, min, max,
} from 'lodash';
import {
 TweenMax, Power2, Power3, Power4,
} from 'gsap';
import ScrollToPlugin from 'gsapPlugins/ScrollToPlugin';
import DomHelper from 'utils/helpers/Dom';
import Modernizr from 'utils/plugins/Modernizr';

const debugScrollTo = ScrollToPlugin; // eslint-disable-line no-unused-vars

export default {
  namespaced: true,
  state: {
    /** @argument {Object} viewport - uptodate viewport sizes */
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    /** @argument {Object} device - Detectizr device */
    device: Modernizr.device,

    /** @argument {HTMLElement} scrollContainer - the Node element where we scroll (body or any node) */
    scrollContainer: window,

    /** @argument {Object} scrollBar - scrollBar object for events/methods/listeners in components */
    scrollBar: null,

    /** @argument {Boolean} scrollable - if container is scrollable or not - @todo watch this where your container stand */
    scrollable: true,

    scrollTween: null,
  },
  mutations: {
    /**
     * Update our viewport state
     * resize is handled by this store itself, just need to call the `INIT` action
     * @param {State} state
     */
    RESIZE(state) {
      state.viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    /**
     * Just update store value
     * @param {State} state
     * @param {Boolean} isScrollable = true
     *
     * @todo :
     * - disable js scroll events or content
     *  - [ ] if events, use disableScroll
     *  - [ ] if content, watch if scrollbar don't disapear in window
     *    (maybe watch this in your component...)
     */
    SET_SCROLL(state, isScrollable = true) {
      if (isScrollable === state.scrollable) {
        return;
      }
      // if (isScrollable) {
      //   // console.log('ENABLE');
      //   disableScroll.off();
      // } else {
      //   // console.log('DISABLE');
      //   disableScroll.on();
      // }
      state.scrollable = isScrollable;
    }, /**
    * Store ScrollBar object
    * @param {Object} scrollbar
    */
    SET_SCROLLBAR(state, scrollbar) {
      state.scrollBar = scrollbar;
      if (scrollbar) {
        state.scrollContainer = scrollbar.containerEl;
      }

      window.scrollbar = scrollbar;
    },
  },
  actions: {
    /**
     * Init our interface
     * basicaly just listen for resize...
     * @param {Store} store
     */
    INIT({ commit, state }) {
      window.addEventListener('resize', throttle(() => {
        commit('RESIZE');
      }, 250));

      // @todo explore and fix this
      // in some phones, viewport takes time to be correct values
      // watch resize (use many intervals because ios take time to compute its true viewport)
      let { width } = state.viewport;
      each([0, 200, 500, 750, 1000], (delay) => {
        setTimeout(() => {
          if (width !== window.innerWidth) {
            width = window.innerWidth;
            commit('RESIZE');
          }
        }, delay);
      });
    },

    /* SCROLLS */
    /**
     * Store ScrollBar object
     * @param {Object} scrollbar
     */
    INIT_SCROLLBAR({ commit }, scrollbar) {
      commit('SET_SCROLLBAR', scrollbar);
    },
    /**
     * toggle scroll
     * @param {Store} store
     * @param {Boolean} isScrollable = true
     */
    TOGGLE_SCROLL({ commit, getters }, isScrollable = null) {
      const scrollable = isScrollable === null ? !getters.scrollable : isScrollable;
      commit('SET_SCROLL', scrollable);
    },
    ENABLE_SCROLL({ commit, getters }) {
      commit('SET_SCROLL', true);
      const { isDesktop } = getters;
      if (!isDesktop) {
        document.body.dataset.scrollable = true;
      }
    },
    DISABLE_SCROLL({ commit, getters }) {
      commit('SET_SCROLL', false);
      const { isDesktop } = getters;
      if (!isDesktop) {
        document.body.dataset.scrollable = false;
      }
    },
    /**
     * scroll to some position (y only)
     * use this store so the tween will always be the same :)
     * Oh, and bonus, the duratin will be based on distance to scroll
     *
     *
     * @param {Number|String|HTMLElement} value - can be a y position (Number), an HTMLElement target or the selector of that target
     * if @param is a HTMLElement target or a selector, smoothScrollBar (desktop) uses default speed
     * @returns {ScrollBar, TweenMax} scrollbar / tween instance (or null if no scroll)
     */
    SCROLL_TO({ state/* , getters */ }, { duration = null, to = null }) {
      if (state.scrollTween) {
        state.scrollTween.kill();
        state.scrollTween = null;
      }
      return new Promise((resolve, reject) => {
        let y = to;
        let speed = duration;
        // const { scrollBar } = state;
        // const { isDesktop } = getters;
        let BASE_SPEED;
        // const container = getters.scrollContainer;

        // compute y (px) whereas value is px, selector or HTMLElement
        y = (() => {
          if (isNumber(to)) {
            return to;
          }

          let el = null;
          if (typeof (to) === 'string') {
            el = document.querySelector(to);
          }
          if (DomHelper.isElement(el)) {
            return DomHelper.getY(el);
          }

          return reject();
        })();

        if (!y && y !== 0) reject();

        y -= 30;
        y = max([y, 0]);

        // if (isDesktop) {
        //   // now we scroll with scrollBar :)
        //   // onlyScrollIfNeeded: scroll if element is not in screen
        //   if (DomHelper.isElement(y)) {
        //     return scrollBar.scrollIntoView(y, {
        //       onlyScrollIfNeeded: true,
        //     });
        //   }
        //   // compute duration based on gap between 2 scrolls
        //   // scrollBar only
        //   if (!duration && duration !== 0 && typeof (y) === 'number') {
        //     BASE_SPEED = 1; // Time in secondes per 1,000 pixels
        //     const currentY = scrollBar.scrollTop;
        //     const gapY = Math.abs(y - currentY);
        //     speed = (gapY * BASE_SPEED);// / 1000;
        //   }
        //   return scrollBar.scrollTo(0, y, speed, resolve);
        // }
        if (!duration && duration !== 0) {
          BASE_SPEED = 1; // Time in secondes per 1,000 pixels
          const currentY = window.pageYOffset;
          const gapY = Math.abs(y - currentY);
          speed = (gapY * BASE_SPEED) / 1000;

          speed = min([speed, 4]);
        }
        const ease = (() => {
          if (speed > 3) {
            return Power4.easeInOut;
          }
          if (speed > 2) {
            return Power3.easeInOut;
          }
          return Power2.easeInOut;
        })();

        // now we scroll with TweenMax :)
        state.scrollTween = TweenMax.to(document.documentElement, speed, {
          scrollTo: {
            y,
            autoKill: false,
          },
          ease,
          onComplete: () => {
            resolve();
            if (state.scrollTween) {
              state.scrollTween.kill();
              state.scrollTween = null;
            }
          },
        });

        return state.scrollTween;
      });
    },

    /**
     * easy way to scroll top...
     * @param {Store} store
     */
    SCROLL_TOP({ dispatch }, duration) {
      return dispatch('SCROLL_TO', { to: 0, duration });
    },
  },
  getters: {
    viewport: state => state.viewport,
    device: state => state.device,
    mqMobile: () => 700,
    mqPortrait: () => 900,
    mqDesktop: () => 1025,
    isMobile: ({ viewport }, { mqMobile }) => viewport.width <= mqMobile,
    isDesktop: ({ viewport }, { mqDesktop }) => viewport.width >= mqDesktop,
    scrollContainer: () => window,
    scrollable: state => state.scrollable,
  },
};
