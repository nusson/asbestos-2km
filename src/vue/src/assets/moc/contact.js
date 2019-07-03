// const path = process.env.NODE_ENV === 'development' ? '/static/uploads/' : '/wp-content/uploads/static/';

export default {
  title: 'Nous joindre',
  partners: {
    title: 'Nos partenaires',
    items: [
      {
        name: 'Slacktivity',
        url: 'https://www.slacktivity.com',
        image: {
          src: '/uploads/partners-bottom/04-slacktivity.png',
          // src: '/wp-content/uploads/static/partners-bottom/xxxxxxx.png',
        },
      }, {
        name: 'Slackline Mtl',
        url: 'http://slacklinemtl.com',
        image: {
          src: '/uploads/partners-bottom/07-slackline-mtl.png',
        },
      }, {
        name: 'Slackline Qc',
        url: 'https://www.facebook.com/slacklineqc',
        image: {
          src: '/uploads/partners-bottom/08-slackline-qc.png',
        },
      }, {
        name: 'Guru',
        url: 'https://www.guruenergy.com',
        image: {
          src: '/uploads/partners-bottom/09-guru-red.png',
        },
      }, {
        name: 'CanpPev',
        url: 'https://canprev.ca',
        image: {
          src: '/uploads/partners-bottom/10-canprev.png',
        },
      }, {
        name: 'Keen',
        url: 'https://www.keenfootwear.com',
        image: {
          src: '/uploads/partners-bottom/16-keen.png',
        },
      }, {
        name: 'Rise Kombucha',
        url: 'https://risekombucha.com',
        image: {
          src: '/uploads/partners-bottom/17-rise.png',
        },
      }, {
        name: 'Securité Landry',
        url: 'https://www.securitelandry.com',
        image: {
          src: '/uploads/partners-bottom/18-securite-landry.png',
        },
      },
    ],
  },
  become_partner: {
    title: 'Devenir partenaire',
    description: `
    <strong>SLACKFEST ASBESTOS 2.0</strong> vous offre d'être aux premières loges de l'émergence d'un sport prometteur et de son évolution rapide.
    <br>Réaliser un nouveau record du monde aura une visibilité mondiale et inspirera la relève.`,
    cta: {
      label: 'Télécharger le plan de visibilité',
      href: '/wp-content/uploads/static/plan-de-visibilite-asbestos2km.pdf',
    },
  },
};
