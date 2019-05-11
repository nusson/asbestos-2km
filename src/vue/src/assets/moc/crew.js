const path = process.env.NODE_ENV === 'development' ? '/static/uploads/' : '/wp-content/uploads/static/';

export default {
  title: 'Les personnes<br>derrière ce projet',
  items: [
    {
      name: 'Dany',
      place: 'Coordonnateur du projet',
      image: {
        src: `${path}team/Dany.jpg`,
      },
    },
    {
      name: 'Mathieu',
      place: 'Responsable des installations de slackline',
      image: {
        src: `${path}team/Mathieu.jpg`,
      },
    },
    {
      name: 'Danick',
      place: 'Responsable site et événement',
      image: {
        src: `${path}team/danick.jpg`,
      },
    },
    {
      name: 'Camille',
      place: 'Responsable du campement',
      image: {
        src: `${path}team/Camille.jpg`,
      },
    },
    {
      name: 'Félix',
      place: 'Responsable du campement',
      image: {
        src: `${path}team/Felix.jpg`,
      },
    },
    {
      name: 'Nicolas',
      place: 'Programmation Web',
      image: {
        src: `${path}team/Nico.jpg`,
      },
    },
    {
      name: 'Cinthia',
      place: 'Marketing',
      image: {
        src: `${path}team/Cinthia.jpg`,
      },
    },
    {
      name: 'Karine',
      place: 'Animations',
      image: {
        src: `${path}team/Karine.jpg`,
      },
    },
    {
      name: 'Renaud',
      place: 'Installations slackline',
      image: {
        src: `${path}team/Renaud.jpg`,
      },
    },
    {
      name: 'Dominic',
      place: 'Commanditaires',
      image: {
        src: `${path}team/Dominic.jpg`,
      },
    },
  ],
};
