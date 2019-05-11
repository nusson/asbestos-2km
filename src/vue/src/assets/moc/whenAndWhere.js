const path = process.env.NODE_ENV === 'development' ? '/static/uploads/' : '/wp-content/uploads/static/';

export default {
  // description: '<p>Fière de sa nouvelle mission sportive, festive et éducative, la Ville d’Asbestos reçoit de nouveaux visiteurs à la mine Jeffrey et attire l’attention sur son magnifique lac aux couleurs turquoises.</p>',
  title: 'du 25 au 27 juillet 2019',
  description: `Sur le site de la mine Jeffrey, Asbestos, Québec
  <br>en face de la microbrasserie <a href="http://moulin7.com" target="_blank" title="microbrasserie Moulin 7">Moulin 7</a>`,
  // {
  //   title: 'Du 25 au<br>27 juillet 2019',
  //   description: '<h3 class="address">Sur le site de la mine Jeffrey,<br>Asbestos,<br>Québec</h3>',
  map: {
    address: 'Sur le site de la mine Jeffrey, Asbestos, Québec',
    cta: {
      label: 'Voir l\'itinéraire',
      href: 'https://www.google.com/maps/dir//Microbrasserie+Moulin+7,+Boulevard+Saint+Luc,+Asbestos,+QC/@46.0019281,-73.466245,8z/data=!4m9!4m8!1m0!1m5!1m1!1s0x4cb7eec9aca6c377:0x15c11cc87972ae9b!2m2!1d-71.9376993!2d45.7751631!3e0',
    },
    gmap: {
      key: 'AIzaSyBtNid05UlKS4tqTcJTJ6pHoSCEB2IG2OQ',
      options: {
        center: {
          lat: 45.7740606,
          lng: -71.9464165,
        },
        mapTypeId: 'satellite',
        disableDefaultUI: true,
        zoom: 14,
      },
      markers: [
        {
          title: 'Moulin 7',
          position: {
            lat: 45.775141,
            lng: -71.937721,
          },
          icon: `${path}map/icons/moulin7.png`,
          link: 'https://www.google.com/maps/dir//Microbrasserie+Moulin+7,+Boulevard+Saint+Luc,+Asbestos,+QC/@46.0019281,-73.466245,8z/data=!4m9!4m8!1m0!1m5!1m1!1s0x4cb7eec9aca6c377:0x15c11cc87972ae9b!2m2!1d-71.9376993!2d45.7751631!3e0',
        },
        {
          title: 'Mine Jeffrey',
          position: {
            lat: 45.771369,
            lng: -71.954550,
          },
          icon: `${path}map/icons/mine.png`,
          link: 'https://www.google.com/maps/dir/Microbrasserie+Moulin+7/45.7753377,-71.9393725/@45.7753977,-71.9393843,17.26z/data=!4m9!4m8!1m5!1m1!1s0x0:0x15c11cc87972ae9b!2m2!1d-71.9376993!2d45.7751631!1m0!3e0',
        },
      ],
    },
  },
  // },
};
