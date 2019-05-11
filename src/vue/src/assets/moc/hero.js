const path = process.env.NODE_ENV === 'development' ? '/static/uploads/' : '/wp-content/uploads/static/';

export default {
  title_image: `${path}hero/title-fr.png`,
  bg_image: `${path}hero/poster-mobile.jpg`,
  videos: {
    main: {
      poster: null,
      sources: {
        1280: `${path}hero/main-1280.mp4`, // () => import(`${path}hero/main-1280.mp4`).then(module => module.default),
      },
    },
    background: {
      poster: null,
      sources: {
        1280: `${path}hero/background-1280.mp4`,
      },
    },
  },
};
