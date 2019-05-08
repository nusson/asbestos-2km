export default {
  title_image: '/uploads/hero/title-fr.png',
  bg_image: '/uploads/hero/poster-mobile.jpg',
  videos: {
    main: {
      poster: null,
      sources: {
        1280: '/uploads/hero/main-1280.mp4', // () => import('/uploads/hero/main-1280.mp4').then(module => module.default),
      },
    },
    background: {
      poster: null,
      sources: {
        1280: '/uploads/hero/background-1280.mp4',
      },
    },
  },
};
