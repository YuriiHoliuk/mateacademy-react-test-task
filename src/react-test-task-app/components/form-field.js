import { PolymerElement, html } from "../../../node_modules/@polymer/polymer/polymer-element.js";
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import '@polymer/polymer/lib/elements/dom-if.js';

import { validateInput } from "../utils/validate-input.js";

/**
 * @customElement
 * @polymer
 */
export class FormField extends PolymerElement {
  static get is() {
    return 'form-field';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          font-family: Arial, Verdana, sans-serif;
          --base-color: #9B9B9B;
          --active-color: #009ECE;
          --danger-color: #AB2430;
        }
        
        input,
        textarea {
          border: none;
          background: none;
          outline: none;
        }
        
        .error {
          font-size: 12px;
          line-height: 16px;
          color: var(--danger-color);
          
          height: 21px;
          padding-top: 4px;
          padding-right: 10px;
        }
        
        .wrapper.invalid .error-message {
          display: block;
        }
        
        .wrapper.invalid .input-wrapper::after {
          display: block;
        }
        
        .wrapper.invalid .label {
            color: var(--danger-color);
            white-space: nowrap;
        }
        
        .error-message {
          display: none;
        }
        
        .input-wrapper {
          position: relative;
        
          padding-top: 20px;
          padding-bottom: 3px;
          margin-bottom: 1px;
        
          border-bottom: 1px solid var(--base-color);
        }
        
        .input-wrapper.focused {
          border-color: var(--active-color);
        }
        
        .input-wrapper::after {
          content: '';
      
          position: absolute;
          left: 0;
          top: 100%;
      
          display: none;
          width: 100%;
          height: 2px;
      
          background-color: var(--danger-color);
        }
        
        .input {
          position: relative;
          z-index: 1;
        
          display: inline-block;
          width: 100%;
        
          background-color: transparent;
        }
        
        .label {
          -webkit-font-smoothing: antialiased;
        
          position: absolute;
          top: 20px;
          left: 0;
        
          transform-origin: 0 50%;
          transition: transform 0.3s, color 0.3s;
        }
        
        .label.active {
          transform: scale(0.7) translateY(-35px);
        }
      
        .label.focused {
          color: var(--active-color);
        }
      </style>

      <div class$="[[wrapperClass(valid)]]">
        <div class$="[[inputWrapperClass(focused)]]">
      
          <label class$="[[labelClass(alwaysActiveLabel, focused, value)]]">
            [[_label(label)]]
          </label>
          
          <template is="dom-if" if="[[_shouldRenderTextarea(type)]]">
            <textarea pattern="[[pattern]]"
                      required="[[required]]"
                      disabled="[[disabled]]"
                      name="[[name]]"
                      value="[[value]]"
                      on-blur="handleBlur"
                      on-focus="handleFocus"
                      on-input="handleChange"
                      id="input"
                      class="input"
                      cols="30"
                      rows="10"></textarea>
          </template>
      
          <template is="dom-if" if="[[!_shouldRenderTextarea(type)]]">
            <input type="[[type]]"
                   pattern="[[pattern]]"
                   required="[[required]]"
                   disabled="[[disabled]]"
                   name="[[name]]"
                   min="[[min]]"
                   max="[[max]]"
                   value="[[value]]"
                   on-blur="handleBlur"
                   on-focus="handleFocus"
                   on-input="handleChange"
                   id="input"
                   class="input">
          </template>
        </div>
    
        <div class="error">
          <span class="error-message">[[ error ]]</span>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      name: String,
      type: {
        type: String,
        value: 'text'
      },
      label: String,
      error: String,
      required: {
        type: Boolean,
        value: false
      },
      pattern: String,
      min: String,
      max: String,
      disallowed: {
        type: Array
      },
      disabled: {
        type: Boolean,
        value: false
      },
      focused: {
        type: Boolean,
        observer: '_changeFocused',
        value: false
      },
      valid: {
        type: Boolean,
        value: true,
        readOnly: true
      },
      value: {
        type: String,
        value: ''
      },
      alwaysActiveLabel: Boolean,
      validateOnChange: Boolean
    };
  }

  ready() {
    super.ready();
    this.inputElement = dom(this).queryDistributedElements('#input');
  }

  validate() {
    if (this.required && !this.value) {
      this._setValid(false);

      return {
        required: true
      };
    }

    if (this.disallowed) {
      const hasDisallowed = this.disallowed.reduce((res, char) => this.value.includes(char) ? true : res, false);

      if (hasDisallowed) {
        this._setValid(false);

        return {
          disallowed: true
        };
      }
    }

    if (this.inputElement.checkValidity && !this.inputElement.checkValidity()) {
      this._setValid(false);

      return {
        invalid: true
      };
    }

    this._setValid(true);

    return null;
  }

  handleFocus(event) {
    event.stopPropagation();
    this.focused = true;
    this.dispatchEvent(new CustomEvent('focus'));
  }

  handleBlur(event) {
    event.stopPropagation();
    this.focused = false;
    this.dispatchEvent(new CustomEvent('blur'));
  }

  handleChange(event) {
    event.stopPropagation();
    this.value = event.target.value;

    if (this.validateOnChange) {
      validateInput(this.valid, this);
    }

    this.dispatchEvent(new CustomEvent('input', {
      detail: this.value
    }));
  }

  _changeFocused(focused) {
    if (this.inputElement && this.inputElement.focus && this.inputElement.blur) {
      focused ? this.inputElement.focus() : this.inputElement.blur();
    }
  }

  _shouldRenderTextarea(type) {
    return type === 'textarea';
  }

  _label(label) {
    return `${label}${label && this.required ? '*' : ''}`;
  }

  wrapperClass(valid) {
    return `wrapper${valid ? '' : ' invalid'}`;
  }

  inputWrapperClass(focused) {
    return `input-wrapper${focused ? ' focused' : ''}`;
  }

  labelClass(alwaysActiveLabel, focused, value) {
    return `label${focused ? ' focused' : ''}${alwaysActiveLabel || focused || !!value ? ' active' : ''}`;
  }

}
customElements.define(FormField.is, FormField);