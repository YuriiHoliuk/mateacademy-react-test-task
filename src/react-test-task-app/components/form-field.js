import { PolymerElement, html } from '@polymer/polymer';

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
        
        input {
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
      value: String,
      alwaysActiveLabel: Boolean
    }
  }

  ready() {
    super.ready();
    this.inputElement = this.$.input;
  }

  validate() {
    if (this.required && !this.value) {
      this._setValid(false);
      return { required: true };
    }

    if (!this.inputElement.checkValidity()) {
      this._setValid(false);
      return { invalid: true };
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
    this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
  }

  _changeFocused(focused) {
    if (this.inputElement) {
      focused ? this.inputElement.focus() : this.inputElement.blur();
    }
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
    return `label${focused ? ' focused' : ''}${(alwaysActiveLabel || focused || !!value) ? ' active' : ''}`;
  }
}

customElements.define(FormField.is, FormField);
