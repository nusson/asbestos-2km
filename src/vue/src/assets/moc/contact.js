const path = process.env.NODE_ENV === 'development' ? '/static/uploads/' : '/wp-content/uploads/static/';

export default {
  title: 'Nous joindre',
  partners: {
    title: 'Devenir partenaire de Asbestos 2.0',
    description: `
    ASBESTOS 2.0 vous offre d'être aux premières loges de l'émergence d'un sport prometteur et de son évolution rapide.
    <br>Réaliser un nouveau record du monde aura une visibilité mondiale et inspirera la relève.`,
    cta: {
      label: 'Télécharger le plan de visibilité',
      href: `${path}plan-de-visibilite-asbestos2km.pdf`,
    },
  },
};
