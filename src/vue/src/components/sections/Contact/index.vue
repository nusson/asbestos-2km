<!-- eslint-disable -->
<docs>
# SectionContact
> Contact section with form (the last one)

+ contact form
+ partners
+ become partner

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import SectionHeader from 'components/misc/SectionHeader';
import ContactForm from 'components/forms/Contact';
import SectionPartners from './Partners';

export default {
  name: 'SectionContact',
  components: { SectionHeader, SectionPartners, ContactForm },
  props: {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    partners: {
      type: Object,
      default() {
        return null;
      },
    },
    become_partner: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<template>
  <section class="SectionContact section">
    <SectionHeader
      :title="title"
      :description="description"
      class="header"/>
    <div class="content">
      <ContactForm class="form -contact" />
    </div>

    <SectionPartners
      v-if="partners"
      v-bind="partners"
      class="partners" />

    <section
      v-if="become_partner"
      class="become-partners">
      <header class="header">
        <h3
          class="title"
          v-html="become_partner.title"/>
        <p
          class="description"
          v-html="become_partner.description"/>
        <a
          v-if="become_partner.cta"
          :title="become_partner.cta.label"
          :href="become_partner.cta.href"
          class="cta -white"
          download
          v-text="become_partner.cta.label" />
      </header>


    </section>

  </section>
</template>

<style lang="stylus" scoped>
  /**
  * TABLE OF CONTENT
  * --------
  *  - LAYOUT
  *  - DEBUG
  *  - NO_SCOPE
  */

  //  ===LAYOUT===
  .SectionContact
    background black url('http://asbestos.int/wp-content/uploads/static/section-contact.jpg') 60% 80% no-repeat
    background-size cover
    background-attachment fixed
    color $c-white
    min-height calc('var(--viewport-height) - 51px - 65px')
    width 100%
    overflow hidden
    +not-desktop()
      min-height calc('var(--viewport-height) - 30px - 65px')
      margin-top 0 !important

    >.content
      safe-content()
      .form
        margin-left 0
        width 60%
        min-width 500px
        max-width 800px
        +mobile()
          width 100%
          min-width 0
          max-width 400px

    .partners
      responsive-prop(margin-top, 120px 80px 60px)

    .become-partners
      responsive-prop(margin-top, 80px 50px 20px)
      safe-content()
      .title
        f-style(title, h3)
      .description
        margin-top 20px
        f-style(text, 'card', $color: $c-white)
        opacity 1
        max-width 500px
      .cta
        margin-top 25px
        opacity 1

  //  ===DEBUG===
  .SectionContact
    // flexbox(center)
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionContact
    //
</style>
