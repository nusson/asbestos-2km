/**
 * # Global store
 * > for our /api/global stuff
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
import { get, each, set } from 'lodash';
import ApiHelper from 'utils/helpers/Api';

const debug = true;// process.env.NODE_ENV === 'development'; // && false;

export default {
  namespaced: true,
  state() {
    return {
      api: {
        url: 'globals',
        moc: debug,
        getMoc(/* locale */) {
          // return import(`assets/moc/globals/${locale}`);
          return import('assets/moc/globals');
        },
      },
      loaded: false,
      data: {
        crew: {
          title: '',
          items: [],
        },
        athletes: {
          title: '',
          items: [],
        },
        activities: {
          title: '',
          items: [],
        },
        partners: {
          title: '',
          items: [],
        },
        about: {
          title: '',
          content: '',
        },
        event: {
          title: '',
          date: '',
          place: {
            city: '',
            state: '',
          },
        },
        whenAndWhere: {
          title: '',
          description: '',
          map: {
            address: '',
            cta: null,
          },
        },

        seo: null,
        contact: {},
        socials: {},
        marquee: {
          items: [
            {
              type: '',
              message: '',
              priority: '',
              startDate: '',
              endDate: '',
            },
          ],
        },
        jobs: {},
      },
    };
  },
  mutations: {
    STORE_DATA(state, data) {
      state.data = data;
      state.loaded = true;
    },
  },
  actions: {
    /**
     * load our global
     * and dispatch i18n datas (if any) to the correct store
     * @param {VuexAction} store - action's store
     * @param {String} locale - @todo use this for api... somehow
     */
    LOAD({ commit, state }, locale) {
      if (!locale) return null;
      const request = ApiHelper.request(state.api)
      // store navigation in Menu store and return the rest of the response
      .then(({ navigation, ...response }) => {
        this.commit('Menu/STORE_NAVIGATION', navigation);
        return response;
      })
      .then((response) => {
        commit('STORE_DATA', response);
        return response;
      });

      // if i18n, add them to I18n store
      request.then(({ i18n }) => {
        if (!i18n) return;

        /*
          Format i18n to true object
          ```
           {
             "portfolio.client.firstname": "George",
             "portfolio.client.lastname": "Orwels"
           }
          ```
          will become
          ```
          {
            portfolio:{
              client: {
                firstname: 'George',
                lastname: 'Orwels',
              }
            }
          }
          ```
        */
        const messages = {};
        each(i18n, (value, key) => {
          set(messages, key, value);
        });

        this.dispatch('I18n/ADD_LOCALE_MESSAGES', {
          locale,
          messages,
        });
      });
      return request;
    },
  },
  getters: {
    loaded: ({ loaded }) => loaded,
    data: ({ data }) => data,
    metadata: ({ data }) => data.seo,
    activities: ({ data }) => get(data, 'activities'),
    partners: ({ data }) => get(data, 'partners'),
    about: ({ data }) => get(data, 'about'),
    event: ({ data }) => get(data, 'event'),
    crew: ({ data }) => get(data, 'crew'),
    athletes: ({ data }) => get(data, 'athletes'),
    whenAndWhere: ({ data }) => get(data, 'whenAndWhere'),


    socials: ({ data }) => get(data, 'socials'),
    menu: ({ data }) => get(data, 'navigation'),
    jobs: ({ data }) => get(data, 'jobs'),
  },
};
