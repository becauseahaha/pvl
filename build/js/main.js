!function(){"use strict";function e(e){let t=document.getElementById(e)?document.getElementById(e):this.closest(".popup");t.dataset.processing&&1==t.dataset.processing||(t.dataset.processing=!0,t.classList.contains("is-shown")&&(t.addEventListener("transitionend",e=>{t.style.display="none",t.dataset.processing=!1},{once:!0}),t.classList.remove("is-shown")))}document.addEventListener("DOMContentLoaded",()=>{(()=>{const e=document.getElementById("header"),t=document.getElementById("header-backdrop");document.getElementById("header-button").addEventListener("click",()=>{e.dataset.processing&&1==e.dataset.processing||(e.dataset.processing=!0,0==e.classList.contains("is-fixed")?(t.style.display="block",setTimeout(function(){t.classList.add("is-active"),e.dataset.processing=!1},1)):(t.addEventListener("transitionend",s=>{t.style.display="none",e.dataset.processing=!1},{once:!0}),t.classList.remove("is-active")),e.classList.toggle("is-fixed"))})})(),(()=>{const e=document.getElementById("projects");if(!e)return;const t=e.querySelectorAll(".project").length;let s=4;switch(!0){case window.innerWidth<767:s=1;break;case window.innerWidth<1280:s=2}for(let n=1;n<=Math.ceil(t/s);n++){const t=document.createElement("div");t.className="project__line";const s=2*n,o=s+1;t.style.gridRow=s+"/"+o,e.appendChild(t)}})(),(()=>{const e=document.getElementById("footer").scrollHeight;document.body.style.paddingBottom=e+"px"})(),document.querySelectorAll(".js-popup-hide").forEach(t=>{t.addEventListener("click",e.bind(t))}),document.querySelectorAll(".popup").forEach(t=>{t.addEventListener("click",function(s){s.target==t&&e(s.target.id)})}),document.querySelectorAll(".js-popup-show").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),function(e){let t=document.getElementById(e);t.dataset.processing&&1==t.dataset.processing||(t.dataset.processing=!0,0==t.classList.contains("is-shown")&&(t.style.display="flex",setTimeout(function(){t.classList.add("is-shown"),t.dataset.processing=!1},1)))}(e.dataset.target,e.dataset)})})})}();
//# sourceMappingURL=main.js.map
