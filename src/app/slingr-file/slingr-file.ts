import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("slingr-file")
export class SlingrFile extends LitElement {
  static styles = css`
    a {
      cursor: pointer;
      color: var(--link-color, #00A3E0);
    }

    a:hover,
    a:focus {
      color: var(--link-hover-color, #006b93);
    }
  `;
  @property()
  entity: string = "";

  @property({ attribute: "record-id" })
  recordId: string = "";

  @property({ attribute: "file-id" })
  fileId: string = "";

  @property({ attribute: "file-action" })
  fileAction: string = "";

  manageClick() {
    const myEvent = new CustomEvent("slingr-tag-file", {
      detail: {
        fileEntity: this.entity,
        recordId: this.recordId,
        fileId: this.fileId,
        fileAction: this.fileAction,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(myEvent);
    
  }

  protected render() {
    return html`
      <a @click=${this.manageClick}>
        <slot></slot>
      </a>
    `;
  }
  
}