import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

import { validateInput } from "../utils/validate-input";

/**
 * Wrapper for HTML <form> element
 * requires to use custom form elements inside such as:
 * ```form-field```, ```form-select```, ```radio-group```
 *
 * Controls should have next required API:
 * - ```name``` property - should be unique within the form
 * - ```error``` property - for setting validation errors
 * - ```validate()``` method that @return errors object OR ```null``` if validation passed
 *
 * Perform form validation on submit by default
 *
 * Dispatch custom submit event if form is valid
 *
 * @customElement
 * @polymer
 */
export class FormWrapper extends PolymerElement {
  static get is() {
    return 'form-wrapper';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          max-width: 640px;
          margin: 0 auto;
          padding-top: 40px;
        }
      </style>

      <slot></slot>
    `;
  }

  static get properties() {
    return {
      /**
      * FormWrapper: Set ```validateOnChange``` property for each control
      *
      * @type {boolean}
      * */
      validateOnChange: {
        type: Boolean,
        value: false
      }
    };
  }

  ready() {
    super.ready();

    this.form = dom(this).queryDistributedElements('form')[0];
    this.inputs = dom(this.form).queryDistributedElements('[name]');

    this.form.addEventListener('submit', (event) => {
      event.stopPropagation();
      event.preventDefault();

      if (this.validate()) {
        this.dispatchEvent(new CustomEvent('submit', { detail: this.serialize() }));
      }
    });

    if (this.validateOnChange) {
      this.inputs.forEach(input => input.validateOnChange = true);
    }
  }

  /**
  * Run validation for each control except disabled
  *
  * @return {boolean} form state (valid/invalid)
  * */
  validate() {
    return this.inputs
      .filter(_input => !_input.disabled)
      .reduce(validateInput, true);
  }

  /**
  * Serialize form value to JS object except disabled controls
  *
  * @return {object} form value
  * */
  serialize() {
    return this.inputs
      .filter(_input => !_input.disabled)
      .reduce((res, { name, value }) => ({ ...res, [name]: value }), {});
  }
}

customElements.define(FormWrapper.is, FormWrapper);