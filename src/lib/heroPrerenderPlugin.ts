import type { Plugin } from "vite";
import { HERO_PRERENDER_COPY } from "./heroPrerenderContent";

const escapeHtml = (text: string): string =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const renderLangBlock = (lang: "pl" | "en") => {
  const copy = HERO_PRERENDER_COPY[lang];
  return `<div data-hero-lang="${lang}" hidden>
  <section class="hero-prerender-section" aria-hidden="true">
    <div class="hero-prerender-container">
      <div class="hero-prerender-spacer" aria-hidden="true"></div>
      <h1 class="hero-prerender-headline">${escapeHtml(copy.headline)}</h1>
      <p class="hero-prerender-subheadline">${escapeHtml(copy.subheadline)}</p>
    </div>
  </section>
</div>`;
};

const HERO_PRERENDER_STYLES = `<style id="hero-prerender-styles">
  #hero-prerender{display:none}
  #hero-prerender.is-visible{display:block}
  .hero-prerender-section{
    padding-top:4rem;padding-bottom:3rem;
    background:hsl(60 20% 98%);color:hsl(222 47% 11%);
  }
  @media (min-width:768px){
    .hero-prerender-section{padding-top:5rem;padding-bottom:4rem}
  }
  @media (min-width:1024px){
    .hero-prerender-section{padding-top:6rem;padding-bottom:5rem}
  }
  .hero-prerender-container{
    max-width:80rem;margin:0 auto;padding-left:.75rem;padding-right:.75rem;
  }
  @media (min-width:640px){
    .hero-prerender-container{padding-left:1.5rem;padding-right:1.5rem}
  }
  @media (min-width:1024px){
    .hero-prerender-container{padding-left:2rem;padding-right:2rem}
  }
  .hero-prerender-spacer{height:4.5rem}
  .hero-prerender-headline{
    font-family:'Space Grotesk',system-ui,sans-serif;
    font-size:1.5rem;font-weight:700;line-height:1.25;
    max-width:36rem;text-wrap:balance;margin:0 0 2rem;
    color:hsl(222 47% 11%);
  }
  @media (min-width:640px){
    .hero-prerender-headline{font-size:1.875rem;max-width:42rem}
  }
  @media (min-width:768px){
    .hero-prerender-headline{font-size:2.25rem}
  }
  @media (min-width:1024px){
    .hero-prerender-headline{font-size:3rem}
  }
  .hero-prerender-subheadline{
    font-family:'Inter',system-ui,sans-serif;
    font-size:1rem;line-height:1.625;
    max-width:32rem;text-wrap:balance;margin:0;
    color:hsl(215 16% 47%);
  }
  @media (min-width:640px){
    .hero-prerender-subheadline{font-size:1.125rem;max-width:36rem}
  }
  @media (min-width:768px){
    .hero-prerender-subheadline{font-size:1.25rem}
  }
  html.react-ready #hero-prerender{display:none!important}
</style>`;

const HERO_PRERENDER_SCRIPT = `<script id="hero-prerender-init">
(function(){
  var LANG_KEY="sgweblab.lang";
  var pathname=window.location.pathname;
  function pathLang(){
    var parts=pathname.split("/").filter(Boolean);
    if(!parts.length)return null;
    var last=parts[parts.length-1];
    if(last==="pl"||last==="en")return last;
    var first=parts[0];
    if(first==="pl"||first==="en")return first;
    return null;
  }
  function isHome(){
    var parts=pathname.split("/").filter(Boolean);
    if(!parts.length)return true;
    return parts.length===1&&(parts[0]==="pl"||parts[0]==="en");
  }
  function preferredLang(){
    var fromPath=pathLang();
    if(fromPath)return fromPath;
    try{
      var stored=localStorage.getItem(LANG_KEY);
      if(stored==="pl"||stored==="en")return stored;
    }catch(e){}
    var nav=(navigator.language||"").toLowerCase();
    if(nav.indexOf("pl")===0)return "pl";
    if(nav.indexOf("en")===0)return "en";
    return "pl";
  }
  var root=document.getElementById("hero-prerender");
  if(!root||!isHome())return;
  var lang=pathLang()||preferredLang();
  document.documentElement.lang=lang;
  var block=root.querySelector('[data-hero-lang="'+lang+'"]');
  if(!block)return;
  block.hidden=false;
  root.hidden=false;
  root.classList.add("is-visible");
})();
</script>`;

export const buildHeroPrerenderMarkup = (): string =>
  [
    HERO_PRERENDER_STYLES,
    `<div id="hero-prerender" hidden>`,
    renderLangBlock("pl"),
    renderLangBlock("en"),
    `</div>`,
    HERO_PRERENDER_SCRIPT,
  ].join("\n");

/** Injects static hero copy into index.html for faster LCP on home routes. */
export function heroPrerenderPlugin(): Plugin {
  return {
    name: "hero-prerender",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        const markup = buildHeroPrerenderMarkup();
        if (html.includes("<!-- HERO_PRERENDER -->")) {
          return html.replace("<!-- HERO_PRERENDER -->", markup);
        }
        return html.replace(
          "<div id=\"root\"></div>",
          `${markup}\n    <div id="root"></div>`,
        );
      },
    },
  };
}
