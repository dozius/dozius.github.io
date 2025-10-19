// Website header bar
class HeaderElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    let activeNav = "";

    if (this.hasAttribute("active")) {
      activeNav = this.getAttribute("active");
    }

    const layout = document.createElement("div");
    layout.setAttribute("class", "layout-header");

    // Logo
    const logo = document.createElement("div");
    logo.setAttribute("class", "header-logo");
    layout.appendChild(logo);

    const logoImg = document.createElement("img");
    logoImg.setAttribute("src", "/assets/icon.png");
    logoImg.setAttribute("alt", "Pixel skull logo");
    logo.appendChild(logoImg);

    const logoText = document.createElement("span");
    logoText.innerHTML = "SKULLZY";
    logo.appendChild(logoText);

    // Nav
    const nav = document.createElement("nav");
    nav.setAttribute("class", "header-nav-bar");
    layout.appendChild(nav);

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", "burger-checkbox");
    nav.appendChild(checkbox);

    const checkboxLabel = document.createElement("label");
    checkboxLabel.setAttribute("for", "burger-checkbox");
    checkboxLabel.setAttribute("class", "burger");
    nav.appendChild(checkboxLabel);

    const unchecked = document.createElement("span");
    unchecked.setAttribute("class", "unchecked");
    unchecked.innerHTML = "☰";
    checkboxLabel.appendChild(unchecked);

    const checked = document.createElement("span");
    checked.setAttribute("class", "checked");
    checked.innerHTML = "✖";
    checkboxLabel.appendChild(checked);

    const navList = document.createElement("ul");
    navList.setAttribute("class", "nav-bar-list");
    nav.appendChild(navList);

    const home = document.createElement("li");
    if (activeNav == "home") {
      home.setAttribute("class", "nav-bar-active");
      home.innerHTML = "Home";
    }
    else {
      const homeLink = document.createElement("a");
      homeLink.setAttribute("href", "/");
      homeLink.innerHTML = "Home";
      home.appendChild(homeLink);
    }
    navList.appendChild(home);

    const music = document.createElement("li");
    if (activeNav == "music") {
      music.setAttribute("class", "nav-bar-active");
      music.innerHTML = "Music";
    }
    else {
      const musicLink = document.createElement("a");
      musicLink.setAttribute("href", "/music");
      musicLink.innerHTML = "Music";
      music.appendChild(musicLink);
    }
    navList.appendChild(music);

    const grave = document.createElement("li");
    if (activeNav == "grave rave") {
      grave.setAttribute("class", "nav-bar-active");
      grave.innerHTML = "Grave Rave";
    }
    else {
      const graveLink = document.createElement("a");
      graveLink.setAttribute("href", "/graverave");
      graveLink.innerHTML = "Grave Rave";
      grave.appendChild(graveLink);
    }
    navList.appendChild(grave);

    const about = document.createElement("li");
    if (activeNav == "about") {
      about.setAttribute("class", "nav-bar-active");
      about.innerHTML = "About";
    }
    else {
      const aboutLink = document.createElement("a");
      aboutLink.setAttribute("href", "/about");
      aboutLink.innerHTML = "About";
      about.appendChild(aboutLink);
    }
    navList.appendChild(about);

    const style = document.createElement("style");
    style.textContent = `
    .layout-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0px 2ch 0px;
      max-width: var(--max-width);
      margin: auto;
      height: var(--header-height);
    }

    .header-logo {
      height: calc(var(--header-height) * 2/3);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.75em;
    }

    .header-logo > img {
      height: 100%;
    }

    .header-logo > span {
      font-family: var(--glitch-font);
      font-size: 1.5rem;
      padding-top: 2px; /* alignment fix for visual center */
    }

    .header-nav-bar .nav-bar-list {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 0.5em;
      list-style-type: none;
    }

    .header-nav-bar .burger {
      display: none;
      float: right;
      color: var(--fg_color);
      cursor: pointer;
      border: solid var(--bg_color_alt) 2px;
      border-radius: 10px;
      padding: 0.25em;
      transition: .25s cubic-bezier(.08,.59,.29,.99);
      transition-property: color, background-color, border-color;
    }

    .header-nav-bar .burger:hover {
      border: solid var(--accent_color) 2px;
      background-color: var(--accent_color);
      color: var(--bg_color_alt);
    }

    .header-nav-bar #burger-checkbox {
      display: none;
    }

    .header-nav-bar .nav-bar-list > li > a {
      color: var(--fg_color);
      text-decoration: none;
      border: solid var(--bg_color_alt) 2px;
      border-radius: 10px;
      padding: 0.25em;
      transition: .25s cubic-bezier(.08,.59,.29,.99);
      transition-property: color, background-color, border-color;
    }

    .header-nav-bar .nav-bar-list > li > a:hover {
      border: solid var(--accent_color) 2px;
      background-color: var(--accent_color);
      color: var(--bg_color_alt);
    }

    .header-nav-bar .nav-bar-list .nav-bar-active {
      color: var(--accent_color);
      border-radius: 10px;
      padding: 0.25em;
      font-weight: bold;
    }

    @media (max-width: 520px) {
      .header-nav-bar .nav-bar-list {
        opacity: 0;
        visibility: collapse;
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 1.25em;
        padding: 1em;
        width: 100%;
        top: calc(var(--header-height) - 1em);
        left: 0px;
        background-color: var(--bg_color_alt);
        border-top: solid var(--accent_color) 2px;
        transition: opacity .25s;
      }

      .header-nav-bar .burger {
        display: block;
      }

      .burger .checked {
        display: none;
      }

      .header-nav-bar #burger-checkbox:checked ~ .burger .checked {
        display: inline-block;
      }

      .header-nav-bar #burger-checkbox:checked ~ .burger .unchecked {
        display: none;
      }

      .header-nav-bar #burger-checkbox:checked ~ .nav-bar-list {
        visibility: visible;
        opacity: 1;
      }
    }
    `;

    shadow.appendChild(style);
    shadow.appendChild(layout);
  }
}

customElements.define("x-header", HeaderElement);
