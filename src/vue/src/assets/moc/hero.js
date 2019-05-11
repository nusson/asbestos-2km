// const path = process.env.NODE_ENV === 'development' ? '/static/uploads/' : '/wp-content/uploads/static/';

export default {
  title_image: '/wp-content/uploads/static/hero/title-fr.svg',
  bg_image: '/wp-content/uploads/static/hero/poster-mobile.jpg',
  videos: {
    main: {
      poster: null,
      sources: {
        1280: {
          webm: '/wp-content/uploads/static/hero/main-1280.webm',
          mp4: '/wp-content/uploads/static/hero/main-1280.mp4', // () => import(`/wp-content/uploads/static/hero/main-1280.mp4`).then(module => module.default),
        },
        640: {
          webm: '/wp-content/uploads/static/hero/main-1280.webm',
          mp4: '/wp-content/uploads/static/hero/main-640.mp4',
        },
      },
    },
    background: {
      poster: null,
      sources: {
        1024: {
          webm: '/wp-content/uploads/static/hero/background-1024.webm',
          mp4: '/wp-content/uploads/static/hero/background-640.mp4',
        },
      },
    },
  },
};
