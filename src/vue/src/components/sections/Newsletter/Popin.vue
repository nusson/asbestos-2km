<!-- eslint-disable -->
<docs>
# NewsletterPopin
> Popin that pop after a while and invite user to register to our newsletter

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import { mapGetters } from 'vuex';
import Cookies from 'js-cookie';
import settings from 'src/settings';
import IconMailbox from 'assets/svg/mailbox.svg?vue';
import IconClose from 'assets/svg/close.svg?vue';
import NewsletterForm from './Form';

const debug = process.env.NODE_ENV === 'development'; // && false;

export default {
  name: 'NewsletterPopin',
  components: { IconMailbox, IconClose, NewsletterForm },
  props: {
    title: {
      type: String,
      default: 'Ne manquez rien !',
    },
    description: {
      type: String,
      default: "Inscrivez vous a notre infolettre pour rester au courant de l'événement",
    },
  },
  data() {
    return {
      show: false,
      delay: debug ? 2000 : 20000, // 20 secondes
    };
  },
  computed: {
    ...mapGetters({
      isMobile: 'Interface/isMobile',
    }),
    wasAlreadyClosed() {
      if (debug) {
        return false;
      }
      return Cookies.get(settings.cookies.newsletter) === 'true';
    },
  },
  mounted() {
    this.autoShow();
    this.$root.$on('open-newsletter', () => {
      this.show = true;
    });
  },
  methods: {
    autoShow() {
      if (this.wasAlreadyClosed) {
        return;
      }
      setTimeout(() => {
        this.show = true;
      }, this.delay);
    },
    close() {
      Cookies.set(settings.cookies.newsletter, true);
      this.show = false;
    },
    onenter(el, done) {
      const props = (() => {
        if (this.isMobile) {
          return {
            from: { y: '110%' },
            to: { y: '0%' },
          };
        }
        return {
          from: { x: '110%' },
          to: { x: '0%' },
        };
      })();
      return TweenMax.fromTo(el, 0.6, props.from, {
        ...props.to,
        onComplete: done,
        ease: Power4.easeOut,
      });
    },
    onleave(el, done) {
      const props = (() => {
        if (this.isMobile) {
          return { y: '110%' };
        }
        return { x: '110%' };
      })();
      return TweenMax.to(el, 0.4, {
        ...props,
        onComplete: done,
        ease: Back.easeIn,
      });
    },
  },
};
</script>

<template>
  <transition
    appear
    @enter="onenter"
    @leave="onleave">
    <div
      v-if="show"
      class="NewsletterPopin">
      <IconMailbox class="icon -mail"/>
      <div class="content">
        <button
          class="_no-btn close"
          @click.prevent="close">
          <IconClose class="icon" />
        </button>
        <h4
          class="title"
          v-text="title"/>
        <p
          class="description"
          v-html="description"/>
        <NewsletterForm
          :on-close="close"
          class="form"/>
      </div>
    </div>
  </transition>
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
  .NewsletterPopin
    fixed bottom 75px right
    background-color $c-white
    color $c-dark
    flexbox(row, $align:flex-start)
    max-width 550px
    min-width 400px
    width 33vw
    padding 20px
    z-index $z-newsletter
    box-shadow 0px 0px 10px rgba($c-black, 0.15)
    +below($mq-mobile)
      bottom 0
      left 0
      width auto
      min-width auto
      max-width auto
    +below(350px)
      .icon.-mail
        display none
  .close
    absolute top right
    padding 10px
    size 15px
    fill rgba($c-dark, 0.6)
    box-sizing content-box
    .no-touchevents &:hover
    &.active
      fill $c-accent

  >.content
    position relative

  .title
    f-style(title, h3)
  .description
    f-style(text, 'card')

  .icon.-mail
    flex 0 0 50px
    margin-right 20px
    box-sizing content-box
    fill $c-accent
    // .no-touchevents &:hover
    // &.active
    //   fill $c-accent


  //  ===DEBUG===
  // #mc_embed_signup form
  //   padding 0
  //   margin-top 20px
  //   .cta
  //     margin 0
  //     border-radius 0
  //   .input
  //     border-radius 0
  //     border-right 0
  //     padding 0 0.4em

  //   #mce-responses
  //     padding 0
  //     margin 0
  //     #mce-error-response
  //     #mce-success-response
  //       padding 0
  //       margin 1em 0 0
  //     #mce-success-response
  //       color $c-success
  //     #mce-error-response
  //       color $c-error
</style>
