export default {
  title_image: '/wp-content/uploads/static/hero/title-fr.png',
  bg_image: '/wp-content/uploads/static/hero/poster-mobile.jpg',
  videos: {
    main: {
      poster: null,
      sources: {
        1280: '/wp-content/uploads/static/hero/main-1280.mp4', // () => import('/wp-content/uploads/static/hero/main-1280.mp4').then(module => module.default),
      },
    },
    background: {
      poster: null,
      sources: {
        1280: '/wp-content/uploads/static/hero/background-1280.mp4',
      },
    },
  },
};
