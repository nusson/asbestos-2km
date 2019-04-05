<docs>
# PageHome
> simply the homepage

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { /* mapGetters, */ mapState } from 'vuex';
import SectionHero from 'components/SectionHero';

export default {
  name: 'PageHome',
  components: {
    SectionHero,
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
  </div>
</template>

<style lang="stylus" scoped>
</style>
