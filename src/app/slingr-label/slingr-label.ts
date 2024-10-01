import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('slingr-label')
export class SlingrLabel extends LitElement {
    @property({ attribute: 'label-style' })
    labelStyle: string = 'default';

    @property()
    text: string = '';

    protected createRenderRoot() {
        return this;
    }

    render() {
        const labelClass = `label label-${this.labelStyle}`;
        return html`
          <span class="${labelClass}">
            ${this.text}
          </span>
        `;
    }
}
