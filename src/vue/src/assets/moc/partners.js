// import AsbestosLogo from '/wp-content/uploads/static/partners/asbestos.svg';
const path = process.env.NODE_ENV === 'development' ? '/static/uploads/' : '/wp-content/uploads/static/';

export default {
  title: 'Présenté par',
  items: [
    {
      name: 'Ville Asbestos',
      url: 'https://ville.asbestos.qc.ca',
      image: {
        src: `${path}partners/asbestos.svg`,
      },
    },
    // {
    //   name: 'Keen',
    //   url: 'https://www.keenfootwear.com',
    //   image: {
    //     src: `${path}partners/keen.svg`,
    //   },
    // },
    {
      name: 'Moulin 7',
      url: 'http://moulin7.com',
      image: {
        src: `${path}partners/moulin7.jpg`,
      },
    },
  ],
};
