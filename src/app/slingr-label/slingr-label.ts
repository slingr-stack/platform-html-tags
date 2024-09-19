import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('slingr-label')
export class SlingrLabel extends LitElement {
    @property({ attribute: 'label-style' })
    labelStyle: string = 'default';

    @property()
    href: string = '';

    @property()
    target: string = '_self';

    @property()
    text: string = '';

    protected createRenderRoot() {
        return this;
    }

    render() {
        const labelClass = `label label-${this.labelStyle}`;
        return this.href
            ? html`
          <a
            class="${labelClass} clickable"
            href="${this.href}"
            target="${this.target}"
            >
            <u>${this.text}</u>
            <i class="zmdi zmdi-open-in-new"></i>
          </a>
        `
            : html`
          <span class="${labelClass}">
            ${this.text}
          </span>
        `;
    }
}
