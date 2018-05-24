import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import './components/app-header.js';
import './components/form-wrapper.js';
import './components/form-field.js';
import './components/radio-button.js';
import './components/radio-group.js';
import './components/form-select.js';

import {COUNTRIES} from "./constants/countries";
import {DISALLOWED_SYMBOLS, EMAIL_REG_EX} from "./constants/validation";

/**
 * @customElement
 * @polymer
 */
class ReactTestTaskApp extends PolymerElement {
  static get is() {
    return 'react-test-task-app';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        
        .content {
          padding-bottom: 50px;
        }
        
        form-field,
        radio-group {
          padding-bottom: 10px;
        }
        
        .buttons {
          margin-top: 40px;
        }
      </style>
      
      <app-header></app-header>

      <div class="content">
        <form-wrapper on-submit="onSubmit">
          <form id="form" slot="form">
            <form-field name="firstName"required disallowed="[[disallowed]]" label="First name"></form-field>
            <form-field name="lastName" required disallowed="[[disallowed]]" label="Last name"></form-field>
            <form-field name="birthday" type="date" required max="[[today]]" label="Birthday" always-active-label></form-field>
            
            <radio-group name="sex" required label="Sex">
              <radio-button value="male" label="Male"></radio-button>
              <radio-button value="female" label="Female"></radio-button>
            </radio-group>
            
            <form-select name="country" required options="[[countries]]" label="Country"></form-select>
            
            <form-field name="email" type="email" required disallowed="[[disallowed]]" pattern="[[emailRegEx]]" label="Email"></form-field>
            <form-field name="password" type="password" required disallowed="[[disallowed]]" label="Password"></form-field>
            <form-field name="address" required disallowed="[[disallowed]]" label="Address"></form-field>
            
            <form-field name="notes" rows="7" cols="30" type="textarea" label="Notes"></form-field>
  
            <div class="buttons">
              <button>Submit</button>
            </div>
          </form>
        </form-wrapper>
      </div>
    `;
  }

  constructor() {
    super();

    this.emailRegEx = EMAIL_REG_EX;
    this.disallowed = DISALLOWED_SYMBOLS;
    this.today = new Date().toISOString().split('T')[0]; // TODO: make it better
    this.countries = COUNTRIES;
  };

  onSubmit(event) {
    console.log(event.detail);
  }
}

window.customElements.define(ReactTestTaskApp.is, ReactTestTaskApp);
