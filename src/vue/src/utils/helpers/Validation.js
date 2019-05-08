import {
 map, isArray, get, without,
} from 'lodash';

export default class ValidationHelper {
  static validate(value, validations = []) {
    if (!isArray(validations)) {
      return [];
    }

    const errors = map(validations, (validation) => {
      const name = get(validation, 'name', validation);
      const message = get(validation, 'message', `errors.${name}`);
      let validator = get(validation, 'validator');

      if (!validator) {
        validator = (() => {
          switch (name) {
            case 'required':
              return ValidationHelper.required;
            case 'email':
              return ValidationHelper.email;
            default:
              throw new Error(`Validation rule "${validation}" not handled`);
          }
        })();
      }
      return validator(value) ? null : message;
    });

    return without(errors, null);
  }

  static required(value) {
    return value !== ''
      && value !== undefined
      && value !== null;
  }

  static email(value) {
    if (!value || typeof (value) !== 'string') {
      return true;
    }
    const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i; // eslint-disable-line
    return emailRegex.test(value);
  }
}
