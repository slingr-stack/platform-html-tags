import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('slingr-button')
export class slingrButton extends LitElement {
    static styles = css`
        .btn {
            font-size: 14px;
            padding: 6px 13px;
            background-color: var(--primary-color);
            color: white;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            font-weight: 400;
            text-align: center;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            max-width: 100%;
            white-space: nowrap;
            box-shadow: 0 2px 7px rgba(0, 0, 0, 0.18);
            transition: background-color 0.3s ease;
        }
        .btn:hover {
            background-color: var(--primary-color-dark);
        }
        a.btn {
            text-decoration: none;
        }
    `;

    @property({ type: String })
    icon: string = '';

    render() {
        const hasHref = this.querySelector('a')?.hasAttribute('href');

        return hasHref
            ? html`<a class="btn" href="${this.querySelector('a')?.getAttribute('href')}">
                    <slot></slot>
                </a>`
            : html`<div class="btn">
                    <slot></slot>
                </div>`;
    }
}

