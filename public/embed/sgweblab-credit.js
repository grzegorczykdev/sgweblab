/**
 * SG WebLab — embeddable credit footer for client sites.
 *
 * Usage:
 *   <script src="https://sgweblab.com/embed/sgweblab-credit.js" defer></script>
 *   <sgweblab-credit theme="light" lang="pl"></sgweblab-credit>
 *   <sgweblab-credit theme="dark" lang="en"></sgweblab-credit>
 *
 * Attributes:
 *   theme — "light" (default) | "dark"
 *   lang  — "pl" (default) | "en"
 */
(function () {
  var UTM =
    "?utm_source=client-site&utm_medium=referral&utm_campaign=credit-footer";

  var CREDIT_URL = {
    pl: "https://sgweblab.com/pl" + UTM,
    en: "https://sgweblab.com/en" + UTM,
  };

  var COPY = {
    pl: "Projekt i wykonanie",
    en: "Design & build",
  };

  var LABEL = {
    pl: "SG WebLab - przejdź na stronę agencji",
    en: "SG WebLab - visit agency website",
  };

  var STYLES = `
    :host {
      display: block;
      width: 100%;
      font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 0.8125rem;
      line-height: 1.2;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.375rem;
      padding: 0.3125rem 1rem;
      border-top: 1px solid var(--sgwl-border);
      background: var(--sgwl-bg);
      color: var(--sgwl-fg);
    }

    .link {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      color: inherit;
      text-decoration: none;
      border-radius: 0.375rem;
      padding: 0.125rem 0.25rem;
      margin: -0.125rem -0.25rem;
      transition: color 150ms ease-out, opacity 150ms ease-out;
    }

    .link:hover {
      color: var(--sgwl-fg-hover);
    }

    .link:focus-visible {
      outline: 2px solid var(--sgwl-accent);
      outline-offset: 2px;
    }

    .label {
      color: var(--sgwl-muted);
    }

    .brand {
      font-family: "Space Grotesk", system-ui, sans-serif;
      font-weight: 600;
      letter-spacing: -0.02em;
      white-space: nowrap;
    }

    .accent {
      color: var(--sgwl-accent);
    }

    @media (prefers-reduced-motion: reduce) {
      .link {
        transition: none;
      }
    }
  `;

  function applyTheme(root, theme) {
    var isDark = theme === "dark";
    root.style.setProperty(
      "--sgwl-bg",
      isDark ? "hsl(222 47% 8%)" : "hsl(60 20% 98%)",
    );
    root.style.setProperty(
      "--sgwl-fg",
      isDark ? "hsl(60 20% 98%)" : "hsl(222 47% 11%)",
    );
    root.style.setProperty(
      "--sgwl-fg-hover",
      isDark ? "hsl(60 20% 100%)" : "hsl(222 47% 18%)",
    );
    root.style.setProperty(
      "--sgwl-muted",
      isDark ? "hsl(215 20% 65%)" : "hsl(215 16% 47%)",
    );
    root.style.setProperty("--sgwl-accent", "hsl(43 74% 49%)");
    root.style.setProperty(
      "--sgwl-border",
      isDark ? "hsl(222 30% 18% / 0.8)" : "hsl(220 13% 91% / 0.9)",
    );
  }

  class SgweblabCredit extends HTMLElement {
    static get observedAttributes() {
      return ["theme", "lang"];
    }

    connectedCallback() {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: "open" });
      }
      this.render();
    }

    attributeChangedCallback() {
      if (this.shadowRoot) {
        this.render();
      }
    }

    render() {
      var theme = this.getAttribute("theme") === "dark" ? "dark" : "light";
      var lang = this.getAttribute("lang") === "en" ? "en" : "pl";
      var label = LABEL[lang];
      var copy = COPY[lang];

      applyTheme(this, theme);

      this.shadowRoot.innerHTML =
        "<style>" +
        STYLES +
        "</style>" +
        '<div class="bar" part="bar">' +
        '<a class="link" part="link" href="' +
        CREDIT_URL[lang] +
        '" target="_blank" rel="noopener noreferrer" aria-label="' +
        label +
        '">' +
        '<span class="label" part="label">' +
        copy +
        "</span>" +
        '<span class="brand" part="brand" aria-hidden="true">' +
        '<span class="accent">SG</span>WebLab<span class="accent">.</span>' +
        "</span>" +
        "</a>" +
        "</div>";
    }
  }

  if (!customElements.get("sgweblab-credit")) {
    customElements.define("sgweblab-credit", SgweblabCredit);
  }
})();
