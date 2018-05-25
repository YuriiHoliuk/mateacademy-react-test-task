import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

/**
 * Simple dumb header element
 *
 * Render passed title
 *
 * @customElement
 * @polymer
 */
class AppHeader extends PolymerElement {
  static get is() {
    return 'app-header';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          font-family: Arial, Verdana, sans-serif;
          font-size: 32px;
        }
        
        header {
          font-size: inherit;
          
          min-height: 1.875em;
          padding: 0 1.25em;
          
          background-color: lightskyblue;
          color: white;
          box-shadow: dimgray 0 2px 10px 0;
        }
        
        h1 {
          font-size: inherit;
          max-width: 960px;
          margin: 0 auto;
          line-height: 1.875;
        }
        
        @media only screen and (max-width: 640px) {
          :host {
            font-size: 5vw;
          }
        }
      </style>
      
      <header>
        <h1>[[title]]</h1>
      </header>
    `;
  }

  static get properties() {
    return {
      title: String
    };
  }
}

window.customElements.define(AppHeader.is, AppHeader);
