// Website footer bar
class FooterElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
    a {
      color: var(--link_color);
    }

    .layout-footer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0px 2ch 0px;
      max-width: var(--max-width);
      margin: auto;
      height: var(--footer-height);
    }

    .layout-footer > * {
      font-size: 0.75em;
    }
    `;

    shadow.innerHTML = `
    <div class="layout-footer">
      <span>MADE WITH 💀</span>
      <div>
        <span>CONTACT:</span>
        <a href="https://mastodon.social/@skullzy" target="_blank">MASTODON</a>
        <span>//</span>
        <a href="https://discord.gg/Gaq4pZMjFz" target="_blank">DISCORD</a>
      </div>
    </div>
    `;

    shadow.appendChild(style);
  }
}

customElements.define("x-footer", FooterElement);
