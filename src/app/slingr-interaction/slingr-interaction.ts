import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../slingr-button/slingr-button";
import "../slingr-icon/slingr-icon";

@customElement("slingr-interaction")
export class SlingrInteraction extends LitElement {
  static styles = css`
    a {
      cursor: pointer;
      color: var(--link-color, #00a3e0);
    }

    a:hover,
    a:focus {
      color: var(--link-hover-color, #006b93);
    }
  `;

  @property()
  label: string = "";

  @property()
  icon: string = "";

  @property()
  interaction: string = "";

  @property({
    attribute: 'defaultParams',
    converter: {
      fromAttribute: (value: string | null) => {
        if (!value) return {};
        try {
          return JSON.parse(value);
        } catch (e) {
          console.error('Error parsing defaultParams:', value, e);
          return {};
        }
      }
    }
  })
  defaultParams: { [key: string]: string } = {};

  @property({
    attribute: "__context",
    converter: {
      fromAttribute: (value: string | null) => {
        if (!value) return {};
        try {
          return JSON.parse(value);
        } catch (e) {
          console.error("Error parsing context:", value, e);
          return {};
        }
      },
    },
  })
  context: { [key: string]: string } = {};

  @property({ attribute: "display-type" })
  displayType: "button" | "link" = "button";

  @property({ attribute: "button-style" })
  buttonStyle: string = "default";

  manageClick() {
    let myEvent = new CustomEvent("slingr-tag-interaction", {
      detail: {
        interaction: this.interaction,
        context: this.context,
        defaultParams: this.defaultParams
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(myEvent);
  }

  renderAsButton() {
    return html`
      <slingr-button
        @click=${this.manageClick}
        icon=${this.icon}
        label=${this.label}
        button-style=${this.buttonStyle}
      >
      </slingr-button>
    `;
  }

  renderAsLink() {
    return html`
      <a @click=${this.manageClick}>
        ${this.icon ? html`<slingr-icon name=${this.icon}></slingr-icon>` : ""}
        ${this.label || ""}
      </a>
    `;
  }

  showError() {
    return html`interaction label must be provided`;
  }

  protected render() {
    return this.label
      ? this.displayType === "link"
        ? this.renderAsLink()
        : this.renderAsButton()
      : this.showError();
  }

  protected createRenderRoot() {
    return this;
  }
}
