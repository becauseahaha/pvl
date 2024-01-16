!function(){"use strict";const e=()=>{async function e(e,s,i=100){const n=e.split(""),a=s;let c=0;for(;c<n.length;)await t(i),a.innerHTML+=n[c],c++}async function s(e){const s=e,i=s.innerHTML.split("");for(;i.length>0;)await t(100),i.pop(),s.innerText=i.join("")}document.querySelectorAll(".js-typing-text").forEach(i=>{let n=[];n[0]={text:i.dataset.typingFirst},n[1]={text:i.dataset.typingSecond},async function(i,n){for(var a=1;;)await t(2e3),await s(n),await t(500),await e(i[a].text,n),await t(2e3),++a>=i.length&&(a=0)}(n,i),i.parentElement.style.height=i.parentElement.offsetHeight+"px"})};function t(e){return new Promise(t=>setTimeout(t,e))}function s(e){let t=document.getElementById(e)?document.getElementById(e):this.closest(".popup");t.dataset.processing&&1==t.dataset.processing||(t.dataset.processing=!0,t.classList.contains("is-shown")&&(t.addEventListener("transitionend",e=>{t.style.display="none",t.dataset.processing=!1},{once:!0}),t.classList.remove("is-shown")))}const i=()=>{let e=new ymaps.Map("yamap",{center:[59.929646,30.400804],zoom:16}),t=new ymaps.Placemark(e.getCenter(),{},{iconLayout:"default#image",iconImageHref:"./../images/map-marker.png",iconImageSize:[80,80],iconImageOffset:[-19,-19]});e.geoObjects.add(t)},n=()=>{const e=document.querySelectorAll(".js-gallery");function t(e){const t=this.querySelectorAll(".js-gallery-item");let s,i=this.dataset.index;"next"==e&&(s=i,null==t[++i]&&(i=0)),"prev"==e&&(s=i,null==t[--i]&&(i=t.length-1)),t[s].classList.remove("is-active"),t[i].classList.add("is-active"),this.dataset.index=i}0!=e.length&&e.forEach(e=>{const s=e.querySelector(".js-gallery-prev"),i=e.querySelector(".js-gallery-next"),n=e.querySelector(".js-gallery-items");let a=e.querySelectorAll(".js-gallery-item");e.dataset.index=0,a[0].getBoundingClientRect().width>0&&(n.style.width=a[0].getBoundingClientRect().width+"px",n.style.height=a[0].getBoundingClientRect().height+"px"),s.addEventListener("click",function(){t.call(e,"prev")}),i.addEventListener("click",function(){t.call(e,"next")})})};document.addEventListener("DOMContentLoaded",()=>{(()=>{const e=document.getElementById("header"),t=document.getElementById("header-backdrop");document.getElementById("header-button").addEventListener("click",()=>{e.dataset.processing&&1==e.dataset.processing||(e.dataset.processing=!0,0==e.classList.contains("is-fixed")?(t.style.display="block",setTimeout(function(){t.classList.add("is-active"),e.dataset.processing=!1},1)):(t.addEventListener("transitionend",s=>{t.style.display="none",e.dataset.processing=!1},{once:!0}),t.classList.remove("is-active")),e.classList.toggle("is-fixed"))})})(),(()=>{const e=document.getElementById("projects");if(!e)return;const t=e.querySelectorAll(".project").length;let s=4;switch(!0){case window.innerWidth<767:s=1;break;case window.innerWidth<1280:s=2}for(let i=1;i<=Math.ceil(t/s);i++){const t=document.createElement("div");t.className="project__line";const s=2*i,n=s+1;t.style.gridRow=s+"/"+n,e.appendChild(t)}})(),(()=>{const e=document.getElementById("map-scroll");if(null===e)return;const t=e.querySelectorAll(".map__marker");let s,i;function n(){s=e.getBoundingClientRect(),(i=(s.height-s.y-s.height)/s.height*100)>0?t[0].classList.add("is-active"):t[0].classList.remove("is-active"),i>15?t[1].classList.add("is-active"):t[1].classList.remove("is-active"),i>30?t[2].classList.add("is-active"):t[2].classList.remove("is-active"),i>45?t[3].classList.add("is-active"):t[3].classList.remove("is-active")}new IntersectionObserver(function(e){e[0].isIntersecting?window.addEventListener("scroll",n):window.removeEventListener("scroll",n)}).observe(e)})(),e(),document.querySelectorAll(".js-accordion .btn").forEach(e=>{e.addEventListener("click",function(){e.classList.toggle("btn-plus"),e.classList.toggle("btn-minus"),e.classList.toggle("btn-light-blue"),e.classList.toggle("btn-blue"),e.closest(".accordion__item").classList.toggle("is-active")})}),(()=>{const e=document.getElementById("contact-form");e.querySelector(".js-submit").addEventListener("click",()=>{e.dataset.errors=0;const t=e.querySelector('input[name="phone"]'),s=e.querySelector('input[name="name"]'),i=e.querySelector('[name="message"]');0==t.value.length?(t.classList.add("is-error"),e.dataset.errors++):t.classList.remove("is-error"),0==s.value.length?(s.classList.add("is-error"),e.dataset.errors++):s.classList.remove("is-error"),0==i.value.length?(i.classList.add("is-error"),e.dataset.errors++):i.classList.remove("is-error"),e.dataset.errors>0||(new FormData(e),e.style.display="none",document.getElementById("contact-form-success").style.display="block")})})(),(()=>{const e=3,t=document.getElementById("services-main-slider");if(null===t)return;const s=t.querySelectorAll(".services__list-item"),i=t.querySelectorAll(".services__image"),n=t.querySelector(".services__list");let a,c=0,l=0,o=!1;function r(e){s.forEach(t=>{t.style.transitionDuration=e+"s"})}setTimeout(function t(){o?(r(0),s.forEach(e=>{e.classList.remove("is-filled"),e.classList.remove("is-active")}),i.forEach(e=>{e.classList.remove("is-active")}),o=!1,a=setTimeout(t,100)):(r(e),n.scrollTo(s[c].offsetLeft-16,0),s[c].classList.add("is-active"),i[c].classList.add("is-active"),l<c&&(s[l].classList.remove("is-active"),i[l].classList.remove("is-active"),s[l].classList.add("is-filled")),l=c,void 0==s[++c]&&(c=0,l=0,o=!0),a=setTimeout(t,1e3*e))},1)})(),(()=>{const e=document.querySelector(".js-main-bgs-container");if(null==e)return;const t=e.querySelectorAll(".js-main-bg");let s=0,i=s+1,n=t.length-1;function a(){t[n].classList.remove("is-active"),t[s].classList.add("is-active"),t[s].classList.remove("is-next"),t[i].classList.add("is-next"),n=s,++s==t.length&&(s=0),(i=s+1)==t.length&&(i=0)}a(),setInterval(a,5e3)})(),n(),"undefined"!=typeof ymaps&&ymaps.ready(i),document.querySelectorAll(".js-popup-hide").forEach(e=>{e.addEventListener("click",s.bind(e))}),document.querySelectorAll(".popup").forEach(e=>{e.addEventListener("click",function(t){t.target==e&&s(t.target.id)})}),document.querySelectorAll(".js-popup-show").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),function(e){let t=document.getElementById(e);t.dataset.processing&&1==t.dataset.processing||(t.dataset.processing=!0,0==t.classList.contains("is-shown")&&(t.style.display="flex",setTimeout(function(){t.classList.add("is-shown"),t.dataset.processing=!1},1)))}(e.dataset.target,e.dataset)})});new Swiper(".swiper-clients",{slidesPerView:"auto",spaceBetween:24,navigation:{nextEl:".swiper-clients-next",prevEl:".swiper-clients-prev"}})})}();
//# sourceMappingURL=main.js.map
