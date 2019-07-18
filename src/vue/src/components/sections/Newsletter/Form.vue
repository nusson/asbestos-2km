<!-- eslint-disable -->
<docs>
# NewsletterForm
> Same for popin and footer

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
import Cookies from 'js-cookie';
import settings from 'src/settings';

export default {
  name: 'NewsletterForm',
  components: {},
  props: {
    onClose: {
      type: Function,
      default() {
        Cookies.set(settings.cookies.newsletter, true);
      },
    },
  },
  data() {
    return {
      email: null,
      success: false,
      error: null,
    };
  },
  computed: {
    message() {
      if (this.success) {
        return 'Merci, vous êtes bien inscrit';
      }
      if (this.error) {
        return this.error;
      }
      return null;
    },
  },
  mounted() {},
  methods: {
    submit() {
      this.error = false;

      axios({
        url: this.$el.action,
        adapter: jsonpAdapter,
        callbackParamName: 'c', // optional, 'callback' by default
        params: {
          EMAIL: this.email,
        },
      })
      .then(({ data }) => {
        if (data.result !== 'success') {
          throw new Error(data.msg);
        }
        this.success = true;
        setTimeout(() => {
          this.onClose();
        }, 4000);
      })
      .catch(({ message }) => {
        this.error = message;
      });
    },
  },
};
</script>

<template>
  <form
    action="https://lesfunambulesmodernes.us3.list-manage.com/subscribe/post-json?u=916a89822dae83d09c3ed7e8b&amp;id=52102dcc8b"
    method="post"
    class="NewsletterForm form"
    novalidate
    @submit.prevent="submit">
    <div class="form-content">
      <div class="field -email">
        <input
          v-model="email"
          class="input -email"
          type="email"
          placeholder="Votre courriel">
      </div>
      <div class="field -submit">
        <button
          type="submit"
          class="_no-btn cta">S'inscrire</button>
      </div>
    </div>
    <div class="form-messages">
      <p
        :class="{success, error}"
        v-html="message"/>
    </div>
  </form>
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
  .form
    margin-top 20px

  .form-content
    flexbox(row, $align:stretch)

  .field
    flex 0 0 auto
    &.-email
      flex 1 1 100%

  .input
    size 100%
    border-radius 0
    &.-email
      border none
      background none
      border 1px solid
      border-right none
      x-padding(0.4em)

  .cta
    margin 0

  .form-messages
    margin-top 0.5em
    f-style(text, 'card')
    font-size: 1.2rem !important
    .success
      color $c-success
    .error
      color $c-error

  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .NewsletterForm
    //
</style>
