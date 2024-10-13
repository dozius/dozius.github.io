// VOD section on an event page
class VODElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    let titleText = "YouTube video player";

    if (this.hasAttribute("title")) {
      titleText = this.getAttribute("title");
    }

    const container = document.createElement("div");
    container.setAttribute("class", "vod-container");

    const vod = document.createElement("div");
    vod.setAttribute("class", "vod");
    container.appendChild(vod);

    const frame = document.createElement("iframe");
    frame.setAttribute("title", "YouTube video player");
    frame.setAttribute("frameborder", "0");
    frame.setAttribute("allow", "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
    frame.setAttribute("allowfullscreen", "");
    frame.setAttribute("src", this.getAttribute("src"));
    vod.appendChild(frame);

    const style = document.createElement("style");
    style.textContent = `
      .vod-container {
          width: 100%;
          margin: auto;
      }

      .vod {
          position: relative;
          padding-bottom: 56.25%; /* maintain 16:9 aspect ratio */
          height: 0;
      }

      .vod iframe, .vod object, .vod embed {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(container)
  }
}

customElements.define("x-vod", VODElement);
