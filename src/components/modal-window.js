import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/polymer/lib/elements/dom-if';

/**
 * Informational modal window with overlay
 *
 * Render passed template, title and close button
 *
 * Can be toggled by changing ```active``` property
 *
 * Has fixed position and disable body scroll if opened
 *
 * TODO: add custom-properties for styling
 *
 * @customElement
 * @polymer
 */
export class ModalWindow extends PolymerElement {
  static get is() {
    return 'modal-window';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          font-family: Arial, Verdana, sans-serif;

          --base-color: #9B9B9B;
          --active-color: #009ECE;
        }
        
        button {
          border: none;
          background: none;
          outline: none;
        }
        
        .overlay {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1;
          
          background: rgba(155, 155, 155, 0.3);
        }
        
        .modal {
          position: absolute;
          top: 50%;
          left: 50%;
          
          min-width: 300px;
          min-height: 200px;
          padding: 0 15px;
          
          background: white;
          border: 2px solid var(--base-color);
          border-radius: 5px;
          
          transform: translate(-50%, -50%);
        }
        
        .close {
          font-size: 22px;
          
          position: absolute;
          top: 15px;
          right: 15px;
          
          transition: color 0.2s;
          cursor: pointer;
        }
        
        .close:hover {
          color: var(--active-color);
        }
        
        .title {
          text-align: center;
          margin: 0 60px 0 0;
          line-height: 60px;
        }
      </style>

      <template is="dom-if" if="[[active]]">

        <div class="overlay" on-click="prevent">
          <div class="modal">

            <button type="button" class="close" on-click="close">X</button>
            
            <h3 class="title">[[title]]</h3>
            
            <slot></slot>

          </div>
        </div>

      </template>
    `;
  }

  static get properties() {
    return {
      active: {
        type: Boolean,
        observer: '_changeActive'
      },
      title: String
    };
  }

  /**
  * Close self
  *
   * @param {MouseEvent} event
  * */
  close(event) {
    event.stopPropagation();
    this.active = false;
  }

  /**
  * Blocks clicks to application when clicking on overlay
  *
   * @param {MouseEvent} event
  * */
  prevent(event) {
    event.stopPropagation();
  }

  /**
  * Observer: toggle global scroll when ```active``` property changed
  *
   * @param {boolean} active
  * */
  _changeActive(active) {
    active
      ? document.body.style.overflowY = 'hidden'
      : document.body.style.overflowY = 'auto';
  }
}

customElements.define(ModalWindow.is, ModalWindow);