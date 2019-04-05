<docs>
# PageHome
> simply the homepage

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { /* mapGetters, */ mapState } from 'vuex';
import SectionHero from 'components/sections/Hero';
import SectionPartners from 'components/sections/Partners';
import SectionAbout from 'components/sections/About';
import SectionEvent from 'components/sections/Event';
import SectionActivities from 'components/sections/Activities';
import SectionCrew from 'components/sections/Crew';
import SectionGuests from 'components/sections/Guests';
import SectionContact from 'components/sections/Contact';

export default {
  name: 'PageHome',
  components: {
    SectionHero,
    SectionPartners,
    SectionAbout,
    SectionEvent,
    SectionActivities,
    SectionCrew,
    SectionGuests,
    SectionContact,
  },
  computed: {
    // ...mapGetters({
    //   hero: 'Globals/hero',
    // }),
    ...mapState('I18n', {
      locale: ({ locale }) => locale,
    }),
  },
  // beforeDestroy() {
  //   // !!! Do not unregister store
  //   // or datas will be deleted and you will need to re-call api
  //   this.$store.unregisterModule('PageHome');
  // },
};
</script>

<template>
  <div class="PageHome">
    <SectionHero />
    <SectionPartners />
    <SectionAbout />
    <SectionEvent />
    <SectionActivities />
    <SectionCrew />
    <SectionGuests />
    <SectionContact />
  </div>
</template>

<style lang="stylus" scoped>
</style>
