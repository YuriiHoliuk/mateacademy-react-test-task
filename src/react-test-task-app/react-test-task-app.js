import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';

import './components/app-header.js';
import './components/form-validator.js';

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
        
        .buttons {
          margin-top: 40px;
        }
      </style>
      
      <app-header></app-header>
      
      <form-validator on-submit="onSubmit">
        <form id="form" slot="form">
          <paper-input name="firstName" label="First name"></paper-input>
          <paper-input name="lastName" label="Last name"></paper-input>

          <div class="buttons">
            <button>Submit</button>
          </div>
        </form>
      </form-validator>
    `;
  }

  onSubmit(event) {
    console.log(event);
  }
}

window.customElements.define('react-test-task-app', ReactTestTaskApp);
