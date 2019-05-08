<docs>
# ContactForm
>

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
import axios from 'axios';
import { /* assign, */ each } from 'lodash';
import FormField from './Field.vue';

export default {
  name: 'ContactForm',
  components: { FormField },
  props: {
    // /** section title */
    // title: {
    //   type: String,
    //   default: 'Request a demo',
    // },
    /** api endpoint - don't worry, we will handle submit */
    action: {
      type: String,
      default: '#',
    },
    /** api endpoint - don't worry, we will handle submit */
    i18n: {
      type: Object,
      default() {
        return {
          error: 'oops',
          submit: {
            default: 'Envoyer votre message',
            sent: 'Merci 😃',
          },
        };
      },
    },
  },
  data() {
    return {
      error: null,
      valid: false,
      sendingStatus: null,
      model: {
        fullname: {
          label: 'Qui êtes vous?',
          placeholder: 'Inscrivez votre nom',
          value: null,
        },
        email: {
          label: 'Votre courriel',
          placeholder: 'Inscrivez votre courriel',
          required: true,
          validations: [
            'required',
            'email',
          ],
            // email: 'Ce courriel ne semble pas valide',
          value: null,
        },
        message: {
          label: 'Votre message',
          placeholder: 'Ecrivez votre message',
          required: true,
          validations: [
            'required',
            {
              name: 'short',
              validator(message) {
                return message && message.length >= 50;
              },
              message: 'Votre message n\'est pas assez long.',
            },
          ],
          value: null,
        },
      },
    };
  },
  computed: {
    submitLabel() {
      if (this.sendingStatus === 'sent') {
        return this.i18n.submit.sent;
      }
      return this.i18n.submit.default;
    },
  },
  methods: {
    stringify(data) {
      return JSON.stringify(data);
    },
    isValid() {
      let isValid = true;
      each(this.model, (model, name) => {
        let field = this.$refs[name];
        if (field.length) {
          field = field[0];// eslint-disable-line prefer-destructuring
        }
        const errors = field.validate(model.value);

        if (errors.length) {
          isValid = false;
        }
      });

      return isValid;
    },
    submit() {
      this.error = null;
      if (this.isValid() && !this.sendingStatus) {
        this.send();
      }
    },
    send() {
      if (this.sendingStatus) {
        return;
      }
      this.sendingStatus = 'sending';

      const datas = new FormData();
      each(this.model, ({ value }, key) => {
        datas.append(key, value);
      });

      axios.post(this.action, datas)
      .then(() => {
        this.sendingStatus = 'sent';
        // setTimeout(()=>{
        //   this.sendingStatus = null;
        // }, 5000)
      })
      .catch((/* {message} */) => {
        // this.sendingStatus = null;
        this.sendingStatus = 'sent';
        // this.error = this.i18n.error;
      });
    },
  },
};
</script>

<template>
  <div class="ContactForm">
    <!-- <h1
      class="title style2"
      v-html="title"/> -->
    <form
      v-if="model"
      :action="action"
      :disabled="sendingStatus"
      method="POST"
      class="form"
      novalidate
      @submit.prevent="submit">
      <div class="form-content">
        <div class="row">
          <FormField
            v-for="field in ['fullname', 'email']"
            :ref="field"
            :key="`field-${field}`"
            v-bind="model[field]"
            :class="`input -${field}`"
            @input="(value)=>{model[field].value=value}"
          />
        </div>
        <div class="row">
          <FormField
            ref="message"
            v-bind="model.message"
            tag="textarea"
            class="input -message"
            @input="(value)=>{model.message.value=value}"
          />
        </div>
        <button
          :disabled="sendingStatus!==null"
          :data-status="sendingStatus"
          type="submit"
          class="submit cta -white _no-btn"
          @click.prevent="submit"
          v-text="submitLabel" />
      </div>
      <p
        v-if="error"
        class="error">
        <span
          class="text"
          v-text="error"/>
      </p>
    </form>
  </div>
</template>

<style lang="stylus" scoped>
.submit
  margin 0
  opacity 1
  [data-status]
  [data-disabled]
    color $c-white !important
    &:after
      border-color $c-white !important

[disabled]
  pointer-events none

.input.-message
  >>> .input-wrapper:after
    height 102%


+not-mobile()
  .row
    flexbox(row)
    >.input
      flex 1 1 100%
      &:not(:first-child)
        margin-left 40px


</style>
