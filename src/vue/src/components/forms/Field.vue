<docs>
# FormField
> Form field component - input + label, error etc

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
import { uniqueId, isEmpty, first } from 'lodash';
import ValidationHelper from 'utils/helpers/Validation';

window.ValidationHelper = ValidationHelper;

export default {
  name: 'FormField',
  components: {},
  props: {
    /** input label / placeholder */
    label: {
      type: String,
      default: null,
    },
    /** input label / placeholder */
    placeholder: {
      type: String,
      default: null,
    },
    /** input type */
    type: {
      type: String,
      default: 'text',
    },
    /** input type */
    value: {
      type: String,
      default: null,
    },
    /** input type */
    tag: {
      type: String,
      default: 'input',
    },
    /** input required */
    required: {
      type: Boolean,
      default: false,
    },
    /** list of validations */
    validations: {
      type: Array,
      default() {
        return [];
      },
    },
    // /** list of possible errors */
    // errors: {
    //   type: Object,
    //   default() {
    //     return {
    //       required: null,
    //       format: null,
    //     };
    //   },
    // },
  },
  data() {
    return {
      id: uniqueId('field'),
      errors: [],
      success: false,
      isFocus: false,
      isPristine: true,
    };
  },
  computed: {
    showLabel() {
      return this.isFocus || (this.value && this.value.length);
    },
    isValid() {
      if (!this.required) {
        return true;
      }
      return isEmpty(this.errors && !this.isPristine);
    },
    error() {
      if (this.isPristine) {
        return null;
      }

      return first(this.errors);
    },
  },
  watch: {
    value(value) {
      this.validate(value, false);
    },
  },
  mounted() {

  },
  methods: {
    validate(value, changePristine = true) {
      if (changePristine) {
        this.isPristine = false;
      }
      this.errors = ValidationHelper.validate(value, this.validations);
      // this.errors = this.validate(value, false);
      return this.errors;
    },
    onfocus() {
      this.isFocus = true;
      // this.error = null;
      // this.success = null;
    },
    onblur() {
      this.isPristine = false;
      this.isFocus = false;
    },
    reset() {
      this.isPristine = true;
      this.errors = [];
      this.$emit('input', null);
      // this.$refs.Input.focus();
    },
  },
};
</script>

<template>
  <div
    :data-show-label="showLabel ? 'true' : 'false'"
    :data-focus="isFocus"
    :data-error="error"
    :data-success="success"
    class="FormField">

    <div class="input-wrapper">
      <label
        :for="`field-${id}`"
        class="label"
        v-text="label"/>

      <component
        ref="Input"
        :is="tag"
        :id="`field-${id}`"
        :value="value"
        :type="type"
        :placeholder="showLabel ? placeholder : null"
        rows="6"
        class="input _no-input"
        @focus="onfocus"
        @blur="onblur"
        @input="event=>$emit('input', event.target.value)"
      />
      <i
        v-if="success"
        class="icon -success">
        <svg viewBox="0 0 847 847">
          <path d="M711.91,103l-57.54,57.55C525.57,289.32,426.93,396.19,309.1,516.76L189.89,415.37l-63-53.44L20,488l63,53.44L261.14,692.13l57.55,49.33L372.12,688c148-148,253.47-265.8,397.34-411L827,219.44,711.91,103Z"/>
        </svg>
      </i>
      <i
        v-if="error"
        class="icon -error"
        @click.prevent="reset">
        <svg viewBox="0 0 847 847">
          <polygon
            points="269 421.72 20 171.72 173 18.72 423 267.72 673 18.72 827 171.72 577 421.72 827 671.72 673 825.72 423 575.72 173 825.72 20 671.72 269 421.72"
            style="fill-rule: evenodd"/>
        </svg>
      </i>
      <p class="error">
        <span
          v-if="error"
          class="text"
          v-text="error"/>
      </p>
    </div>
  </div>
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
  .FormField
    position relative
    y-padding 0em 55px;

  .label
    width 100%

  .input
    display block
    width 100%

  .label,
  .input,
  .error
    f-style(text, 'card')
    color $c-white
    opacity 1
    position relative
    z-index 2

  .input
    &::placeholder {
      color $c-dark
      opacity: 1;
    }
    &:-ms-input-placeholder {
      color $c-dark
    }
    &::-ms-input-placeholder {
      color $c-dark
    }
  .error
  .-error
    color $c-error !important
  [data-error]
    .icon
      // fill $c-error
    .input-wrapper:after
      background-color $c-error
      transform scaleX(1)
    input
      color $c-dark
  .error
    absolute bottom -2em left
    font-size 1.2rem !important

  .icon
    absolute top 25% right 5px
    size 12px
    fill $c-white
    transform translate
    z-index 10
  .input-wrapper
    position relative
    padding-bottom 5px
    .label
      absolute top left
      transform translatex(5px)

  .label
    transform-origin left bottom
    kff-transition(transform)
    text-align left

  .input-wrapper
    position relative
    padding 0 15px
    &:before
    &:after
      content ''
      absolute bottom -5px left right
      height 2px
      background-color $c-white
    &:after
      top: 0px;
      height: 28px
      background-color $c-white
      transform scaleX(0)
      // z-index 2
      kff-transition(transform)
      transform-origin left bottom
    .input
      color $c-white

  [data-show-label="true"]
    .label
      transform scale(0.85) translateY(-30px) translatex(0px)
    // .label,
    .input,
    .error
      color $c-dark
    .input-wrapper:after
      transform scaleX(1)

  [data-focus="true"]
    .input-wrapper:after
      transform scaleX(1)
    .label
      // color $c-accent
      color $c-white
    &[data-error]
      .label
        color $c-white !important


  //  ===DEBUG===
  .FormField
    // flexbox(center)
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .FormField
    //
</style>
