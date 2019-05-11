const path = process.env.NODE_ENV === 'development' ? '/static/uploads/' : '/wp-content/uploads/static/';

export default {
  title: 'Des activités<br>pour tous',
  description: `
    <p>Les meilleurs highliners freestyle en compétition, 3 soirs de musique en plein air, cours de Yoga, Workshops, initiation à la slackline, activités participatives pour tous les âges, nourriture et bière locale sur place.</p>
    <p><strong>Programmation complète à venir</strong></p>
  `,
  items: [
    {
      title: 'La traversée de 2km',
      description: 'Tout au long de la fin de semaine, une quinzaine d’athlètes monteront tour à tour sur la Highline la plus longue jamais traversée afin de tenter de battre un nouveau record du monde!',
      image: {
        src: `${path}activities/traversee-2km.jpg`,
      },
    },
    {
      title: 'La 1ere compétition de Highline Freestyle au Canada',
      description: 'Venez encourager les athlètes lors de cette compétition de calibre international.<br>Attendez-vous à un spectacle impressionnant avec des mouvements uniques requérant le plus haut niveau d’équilibre!',
      image: {
        src: `${path}activities/highline-freestyle.jpg`,
      },
    },
    {
      title: 'Initiations',
      description: 'Tout ceux qui le souhaitent auront la chance de se faire initier à ce sport d’équilibre dans un environnement sécuritaire adapté à tous les niveaux et accompagné de Slackliners accomplis.',
      image: {
        src: `${path}activities/innitiations.jpg`,
      },
    },
    {
      title: 'Démonstrations',
      description: `
          À tout moment, devant vos yeux, notre brochette d’athlètes vous feront la démonstration d’une multitudes de mouvements inédits, inventés ou simplement improbables.
          <br>Préparez-vous à être surpris devant nos performances enflammées!
        `,
      image: {
        src: `${path}activities/demonstrations.jpg`,
      },
    },
    {
      title: 'Activités familiales',
      description: 'Des activités pour tous les goûts. Du Yoga jusqu’aux séances de maquillages pour les touts petits, tout le monde sera diverti!',
      image: {
        src: `${path}activities/activites-familiales.jpg`,
      },
    },
    {
      title: 'Soirées-Spectacles',
      description: 'Les soirées se poursuivent dans une ambiance festive grâce aux musiciens spécialement sélectionnés pour s’assurer de terminer la journée en beauté.',
      image: {
        src: `${path}activities/soirees-spectacles.jpg`,
      },
    },
    {
      title: 'Nourriture et Rafraîchissements',
      description: 'Pour tous les appétits et pour toutes les soifs, chacun y trouvera son compte avec la présence de Foodtrucks diversifiés et de bières locales sur place.',
      image: {
        src: `${path}activities/nourriture-et-alcool.jpg`,
      },
    },
  ],
};
