import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';

import './components/app-header.js';
import './components/form-validator.js';
import './components/form-field.js';


/**
 * @customElement
 * @polymer
 */
class ReactTestTaskApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        
        form-field {
          padding-bottom: 10px;
        }
        
        .buttons {
          margin-top: 40px;
        }
      </style>
      
      <app-header></app-header>
      
      <form-validator validate-on-change on-submit="onSubmit">
        <form id="form" slot="form">
          <form-field required name="firstName" label="First name"></form-field>
          <form-field required name="lastName" label="Last name"></form-field>
          <form-field always-active-label required type="date" name="date" label="Birthday"></form-field>
          <form-field required name="email" type="text" pattern="[[emailRegEx]]" label="Email"></form-field>

          <div class="buttons">
            <button>Submit</button>
          </div>
        </form>
      </form-validator>
    `;
  }

  constructor() {
    super();
    // this.emailRegEx = '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';
    this.emailRegEx = '[0-9]+';
  }

  onSubmit(event) {
    console.log(event);
  }

  handleInput(event) {
    console.log(event);
  }
}

window.customElements.define('react-test-task-app', ReactTestTaskApp);
