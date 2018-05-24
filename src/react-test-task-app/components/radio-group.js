import { PolymerElement, html } from '@polymer/polymer';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

import {validateInput} from "../utils/validate-input";

/**
 * @customElement
 * @polymer
 */
export class RadioGroup extends PolymerElement {
  static get is() {
    return 'radio-group';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          font-family: Arial, Verdana, sans-serif;
          --danger-color: #AB2430;
        }
        
        .wrapper {
          position: relative;
          padding-bottom: 26px;
        }
        
        .error {
          font-size: 12px;
          line-height: 16px;
          color: var(--danger-color);
          
          position: absolute;
          bottom: 0;
          left: 0;
          
          margin: 0;
          padding: 5px 10px 5px 0;
        }
        
        .label.invalid {
          color: var(--danger-color);
        }
      </style>
      
      <div class="wrapper">
        <p class$="[[labelClass(valid)]]">[[_label(label)]]:</p>
        <slot></slot>
        <p class="error">[[error]]</p>
      </div>
    `;
  }

  static get properties() {
    return {
      name: String,
      type: {
        type: String,
        value: 'radio',
        readOnly: true,
        reflectToAttribute: true
      },
      label: String,
      value: {
        type: String,
        observer: '_changeValue',
        value: ''
      },
      error: String,
      required: Boolean,
      valid: {
        type: Boolean,
        value: true,
        readOnly: true
      },
      disabled: {
        type: Boolean,
        value: false,
        observer: '_changeDisabled'
      },
      validateOnChange: Boolean
    };
  }

  ready() {
    super.ready();

    this.inputs = dom(this).queryDistributedElements('radio-button');
    this.values = this.inputs.map(({ value }) => value);

    const checkedInput = this.inputs.find(({ checked }) => checked);

    if (checkedInput) {
      this.value = checkedInput.value;
    }

    if (this.value) {
      this._checkByValue(this.value);
    }

    if (typeof this.disabled === 'boolean') {
      this._changeDisabled(this.disabled);
    }

    this.listenInputs();
  }

  validate() {
    if (this.required && !this.value) {
      this._setValid(false);
      return { required: true };
    }

    this._setValid(true);
    return null;
  }

  listenInputs() {
    this.inputs.forEach(input => {
      input.addEventListener('change', event => {
        event.stopPropagation();

        const changedValue = event.detail;

        this._checkByValue(changedValue);

        this.value = changedValue;
        this.dispatchEvent(new CustomEvent('change', { detail: changedValue }));

        if (this.validateOnChange) {
          validateInput(this.valid, this);
        }
      })
    });
  }

  _label(label) {
    return `${label}${label && this.required ? '*' : ''}`;
  }

  _changeValue(value) {
    if (!this.values) {
      return;
    }

    if (!this.values.includes(value)) {
      this.value = null;
      this._uncheckAll();
      return;
    }

    this.value = value;
    this._checkByValue(value);
  }

  _changeDisabled(disabled) {
    if (this.inputs) {
      this.inputs.forEach(input => input.disabled = disabled);
    }
  }

  _checkByValue(value) {
    this.inputs.forEach(input => input.value === value ? input.checked = true : input.checked = false);
  }

  _uncheckAll() {
    this.inputs.forEach(input => input.checked = false);
  }

  labelClass(valid) {
    return `label${!valid ? ' invalid' : ''}`;
  }
}

customElements.define(RadioGroup.is, RadioGroup);